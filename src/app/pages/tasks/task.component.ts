import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { error, loading, tasks } from "./store/task.selectors";
import { tasksEvents } from "./store/task.events";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  // Forms for adding and editing tasks
  public form = new FormGroup({
    title: new FormControl<string | undefined>(undefined),
  });

  public editForm = new FormGroup({
    newTitle: new FormControl<string | undefined>(undefined),
    deadline: new FormControl<string | undefined>(undefined),
    completed: new FormControl<boolean | undefined>(undefined),
  });

  // Injecting dependencies
  private store = inject(Store);
  private router = inject(Router);

  // Observables for state management
  private _isEditTaskId$ = new BehaviorSubject<string | undefined>(undefined);
  private _tasks$ = this.store.select(tasks).pipe(
    map(tasks => tasks.map(task => ({
      ...task,
      isExpired: task.deadline ? new Date(task.deadline) < new Date() : false
    })))
  );

  public searchQuery: FormControl = new FormControl('');
  public showExpiredOnly: boolean = false;
  public showCompletedOnly: boolean = false;

  public vm$: Observable<TaskListViewModel> = combineLatest({
    tasks: this._tasks$,
    loading: this.store.select(loading),
    error: this.store.select(error),
    isEditTaskId: this._isEditTaskId$
  }).pipe(
    map(({ tasks, loading, error, isEditTaskId }) => ({
      tasks: this.filteredTasks(tasks),
      loading,
      error,
      isEditTaskId
    }))
  );

  // Task Management
  public deleteTask(taskId: string): void {
    this.store.dispatch(tasksEvents.deleteTaskRequested({ taskId }));
  }

  public addTask(tasks: Task[]): void {
    if (this.form.value.title) {
      const newTask: Task = {
        id: Date.now().toString(36),
        title: this.form.value.title,
        completed: false,
        deadline: '',
        position: tasks.length + 1
      };
      this.store.dispatch(tasksEvents.addTaskRequested({ task: newTask }));
      this.form.reset();
    }
  }

  public editTask(task: Task): void {
    this._isEditTaskId$.next(task.id);
    this.editForm.setValue({
      newTitle: task.title,
      deadline: task.deadline,
      completed: task.completed,
    });
  }

  public saveTask(task: Task): void {
    const updatedTask = {
      ...task,
      title: this.editForm.value.newTitle ?? '',
      deadline: this.editForm.value.deadline ?? '',
      completed: this.editForm.value.completed ?? false,
    };
    this.store.dispatch(tasksEvents.updateTaskRequested({ task: updatedTask }));
    this.editForm.reset();
    this._isEditTaskId$.next(undefined);
  }

  public toggleComplete(task: Task): void {
    const updatedTask = {
      ...task,
      completed: !task.completed
    };
    this.store.dispatch(tasksEvents.updateTaskRequested({ task: updatedTask }));
  }

  public drop(tasks: Task[], event: CdkDragDrop<Task[]>): void {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (previousIndex === currentIndex) {
      return;
    }

    const [movedTask] = tasks.splice(previousIndex, 1);
    tasks.splice(currentIndex, 0, movedTask);

    tasks.forEach((task, index) => {
      task.position = index + 1;
    });

    this.store.dispatch(tasksEvents.updateTaskOrderRequested({ tasks }));
  }

  // Filtering and View Model
  public filteredTasks(tasks: Task[]): Task[] {
    const searchTerm = this.searchQuery.value?.toLowerCase() || '';
    return tasks
      .filter(task => task.title.toLowerCase().includes(searchTerm))
      .filter(task => this.showExpiredOnly ? task.isExpired : true)
      .filter(task => this.showCompletedOnly ? task.completed : true);
  }

  public onShowExpiredOnlyChange(event: Event): void {
    this.showExpiredOnly = (event.target as HTMLInputElement).checked;
    this.updateViewModel();
  }

  public onShowCompletedOnlyChange(event: Event): void {
    this.showCompletedOnly = (event.target as HTMLInputElement).checked;
    this.updateViewModel();
  }

  private updateViewModel(): void {
    this.vm$ = combineLatest({
      tasks: this._tasks$,
      loading: this.store.select(loading),
      error: this.store.select(error),
      isEditTaskId: this._isEditTaskId$
    }).pipe(
      map(({ tasks, loading, error, isEditTaskId }) => ({
        tasks: this.filteredTasks(tasks),
        loading,
        error,
        isEditTaskId
      }))
    );
  }

  public navigateBack(): void {
    this.router.navigate(['/homepage']);
  }
}

export interface TaskListViewModel {
  tasks: Task[];
  loading: boolean;
  error: Error | undefined;
  isEditTaskId: string | undefined;
}
