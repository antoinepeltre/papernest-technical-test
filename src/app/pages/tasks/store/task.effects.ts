import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, withLatestFrom, tap, switchMap, map, catchError } from 'rxjs/operators';
import { tasksEvents } from './task.events';
import { Task } from '../../../models/task';
import { Store } from '@ngrx/store';
import { tasks } from './task.selectors';

@Injectable()
export class TasksEffects {
  private readonly TASKS_KEY = 'tasks';
  constructor(
    private actions$: Actions,
    private store: Store
  ) { }

  // Effect to load the task list from the service
  readonly loadTaskList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksEvents.loadTaskListRequested),
      switchMap(() => {
        const tasksJson = localStorage.getItem(this.TASKS_KEY);

        return tasksJson
          ? of(JSON.parse(tasksJson)).pipe(
            map((tasks: Task[]) => tasksEvents.loadTaskListSucceeded({ tasks })),
            catchError((error) =>
              of(tasksEvents.loadTaskListFailed({ error: new Error('Failed to parse tasks from localStorage') }))
            )
          )
          : of(tasksEvents.loadTaskListSucceeded({ tasks: [] }));
      })
    )
  );


  // Effect to handle failed task list loading
  readonly loadTaskFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksEvents.loadTaskListFailed),
      tap(() => console.log('loadTaskListFailed'))
    ),
    { dispatch: false }
  );

  // Effect to delete a task
  readonly deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksEvents.deleteTaskRequested),
      withLatestFrom(this.store.select(tasks)),
      exhaustMap(([{ taskId }, tasks]) => {
        const finalTasks = tasks.filter(task => task.id !== taskId);
        return of(tasksEvents.deleteTaskSucceeded({ tasks: finalTasks }));
      })
    )
  );

  // Effect to handle successful task deletion
  readonly deleteTaskSucceeded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksEvents.deleteTaskSucceeded),
      tap(({ tasks }) => {
        localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
      })
    ),
    { dispatch: false }
  );

  // Effect to add a new task
  readonly addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksEvents.addTaskRequested),
      withLatestFrom(this.store.select(tasks)),
      exhaustMap(([{ task }, tasks]) => {
        const finalTasks: Task[] = [...tasks, task];
        return of(tasksEvents.addTaskSucceeded({ tasks: finalTasks }));
      })
    )
  );

  // Effect to handle successful task addition
  readonly addTaskSucceeded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksEvents.addTaskSucceeded),
      tap(({ tasks }) => {
        localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
      })
    ),
    { dispatch: false }
  );

  // Effect to update an existing task
  readonly updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksEvents.updateTaskRequested),
      withLatestFrom(this.store.select(tasks)),
      exhaustMap(([{ task }, tasks]) => {
        const finalTasks = tasks.map(t =>
          t.id === task.id ? { ...t, ...task } : t
        );
        return of(tasksEvents.updateTaskSucceeded({ tasks: finalTasks }));
      })
    )
  );

  // Effect to handle successful task update
  readonly updateTaskSucceeded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksEvents.updateTaskSucceeded),
      tap(({ tasks }) => {
        localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
      })
    ),
    { dispatch: false }
  );

  // Effect to update the order of tasks
  readonly updateTaskOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksEvents.updateTaskOrderRequested),
      exhaustMap(({ tasks }) => {
        return of(tasksEvents.updateTaskOrderSucceeded({ tasks }));
      })
    )
  );

  // Effect to handle successful task order update
  readonly updateTaskOrderSucceeded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksEvents.updateTaskOrderSucceeded),
      tap(({ tasks }) => {
        localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
      })
    ),
    { dispatch: false }
  );
}
