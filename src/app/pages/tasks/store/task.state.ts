import { Task } from '../../../models/task';

export interface TaskState {
  readonly tasks: readonly Task[];
  readonly error: Error | undefined;
  readonly loading: boolean;
}

export const tasksStateName = 'taskList';
