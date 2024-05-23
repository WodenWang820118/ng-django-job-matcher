import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/routes').then((m) => m.HOME_ROUTES),
  },
];
