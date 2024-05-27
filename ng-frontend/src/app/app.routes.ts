import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'portfolio',
    pathMatch: 'full',
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      import('./modules/portfolio/routes').then((m) => m.PORTFOLIO_ROUTES),
  },
  {
    path: 'build-portfolio',
    loadChildren: () =>
      import('./modules/home/routes').then((m) => m.HOME_ROUTES),
  },
];
