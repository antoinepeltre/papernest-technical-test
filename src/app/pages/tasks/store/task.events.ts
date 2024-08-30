import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../../models/task';

// Define action groups for task management
export const tasksEvents = createActionGroup({
  source: 'Task List',
  events: {
    //Task List Events
    'Load Task List Requested': emptyProps(),
    'Load Task List Succeeded': props<{ tasks: Task[] }>(),
    'Load Task List Failed': props<{ error: Error }>(),

    // Delete Task Events
    'Delete Task Requested': props<{ taskId: string }>(),
    'Delete Task Succeeded': props<{ tasks: Task[] }>(),
    'Delete Task Failed': props<{ error: Error }>(),

    // Add Task Events
    'Add Task Requested': props<{ task: Task }>(),
    'Add Task Succeeded': props<{ tasks: Task[] }>(),
    'Add Task Failed': props<{ error: Error }>(),

    // Update Task Events
    'Update Task Requested': props<{ task: Task }>(),
    'Update Task Succeeded': props<{ tasks: Task[] }>(),
    'Update Task Failed': props<{ error: Error }>(),

    // Update Task Order
    'Update Task Order Requested': props<{ tasks: Task[] }>(),
    'Update Task Order Succeeded': props<{ tasks: Task[] }>(),
    'Update Task Order Failed': props<{ error: Error }>(),
  },
});
