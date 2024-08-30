// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { TaskComponent } from './task.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Store, StoreModule } from '@ngrx/store';
// import { taskReducer } from './store/task.reducer';
// import { of } from 'rxjs';
// import { Task } from '../../models/task';
// import { tasksEvents } from './store/task.events';

// describe('TaskComponent', () => {
//   let component: TaskComponent;
//   let fixture: ComponentFixture<TaskComponent>;
//   let store: jest.Mocked<Store>;

//   beforeEach(async () => {
//     store = {
//       dispatch: jest.fn(),
//       select: jest.fn().mockReturnValue(of({
//         tasks: [],
//         loading: false,
//         error: undefined,
//         isEditTaskId: undefined
//       })),
//     } as any;

//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, StoreModule.forRoot({ tasks: taskReducer })],
//       declarations: [TaskComponent],
//       providers: [{ provide: Store, useValue: store }]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TaskComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should dispatch addTaskRequested on addTask call', () => {
//     component.form.setValue({ title: 'New Task' });
//     component.addTask();
//     expect(store.dispatch).toHaveBeenCalledWith(
//       tasksEvents.addTaskRequested({
//         task: { id: expect.any(String), title: 'New Task', completed: false, deadline: '' }
//       })
//     );
//   });

//   it('should set editForm value on editTask call', () => {
//     const task: Task = { id: '1', title: 'Task 1', completed: false, deadline: '' };
//     component.editTask(task);
//     expect(component.editForm.value).toEqual({
//       newTitle: 'Task 1',
//       deadline: '',
//       completed: false
//     });
//     expect(component._isEditTaskId$.value).toBe('1');
//   });
// });
