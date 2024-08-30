import { createReducer, on } from '@ngrx/store';
import { tasksEvents } from './task.events';
import { TaskState } from './task.state';

// Initial state for the task list
const initialTaskListState: TaskState = {
  tasks: [],
  loading: false,
  error: undefined,
};

// Reducer to handle state changes based on actions
export const taskReducer = createReducer(
  initialTaskListState,

  // Load Task List actions
  on(tasksEvents.loadTaskListRequested, (state) => ({
    ...state,
    loading: true,
  })),

  on(tasksEvents.loadTaskListSucceeded, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
  })),

  on(tasksEvents.loadTaskListFailed, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Load Task actions
  on(tasksEvents.deleteTaskSucceeded, (state, { tasks }) => ({
    ...state,
    tasks,
  })),

  on(tasksEvents.addTaskSucceeded, (state, { tasks }) => ({
    ...state,
    tasks,
  })),

  on(tasksEvents.updateTaskSucceeded, (state, { tasks }) => ({
    ...state,
    tasks,
  })),

  // Load Task Order actions
  on(tasksEvents.updateTaskOrderSucceeded, (state, { tasks }) => ({
    ...state,
    tasks,
  }))
);
