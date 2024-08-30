import { Routes } from "@angular/router";
import { TaskComponent } from "./task.component";
import { taskListResolver } from "./task.resolver";

export const taskRoutes: Routes = [
  {
    path: '',
    component: TaskComponent,
    resolve: {
      tasks: taskListResolver,
    },
  }
];