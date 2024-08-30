import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { tasksEvents } from "./store/task.events";

export function taskListResolver(): void {
  const store = inject(Store);
  store.dispatch(tasksEvents.loadTaskListRequested());
}
