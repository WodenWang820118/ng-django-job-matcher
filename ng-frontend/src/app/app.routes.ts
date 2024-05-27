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
    path: 'portfolio-builder',
    loadChildren: () =>
      import('./modules/portfolio-builder/routes').then(
        (m) => m.PORTFOLIO_BUILDER_ROUTES
      ),
  },
];
