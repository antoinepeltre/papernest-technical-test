import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideStore }  from '@ngrx/store';
import { provideEffects }  from '@ngrx/effects';
import { provideStoreDevtools }  from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import {taskReducer} from "./pages/tasks/store/task.reducer";
import {TasksEffects} from "./pages/tasks/store/task.effects";




export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes) ,
     provideHttpClient() ,
     provideStore({
        taskList: taskReducer ,
     }) ,
     provideEffects( TasksEffects ) ,
     provideStoreDevtools({
        maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75,
      connectInZone: true

     })
    ]
};
