import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import {
  WebComponentWrapper, WebComponentWrapperOptions
} from '@angular-architects/module-federation-tools';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [

  {
    path: 'load-angular-mfe1',
    loadComponent: () =>
      loadRemoteModule('mfe1', './Component').then((m) => m.AppComponent),
  },

  {
    path: 'load-angular-mfe2',
    loadComponent: () =>
      loadRemoteModule('mfe2', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'load-react-mfe3',
    component: WebComponentWrapper,
    data: {
      type: 'module',
      remoteEntry: 'http://localhost:4303/assets/remoteEntry.js',
      remoteName: 'mfe3',
      exposedModule: './App',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },
  {
    path: '**',
    component: PageNotFound
  },
];
