import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tasksStateName, TaskState } from './task.state';

const taskFeatureSelector = createFeatureSelector<TaskState>(tasksStateName);

export const tasks = createSelector(
  taskFeatureSelector,
  (state) => state.tasks
);

export const loading = createSelector(
  taskFeatureSelector,
  (state) => state.loading
);

export const error = createSelector(
  taskFeatureSelector,
  (state) => state.error
);
