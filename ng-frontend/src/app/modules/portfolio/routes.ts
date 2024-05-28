import { Route } from '@angular/router';

export const PORTFOLIO_ROUTES: Route[] = [
  {
    path: 'portfolio-detail/:id',
    loadComponent: () =>
      import(
        './views/portfolio-detail-view/portfolio-detail-view.component'
      ).then((m) => m.PortfolioDetailViewComponent),
  },
  {
    path: 'portfolio-builder',
    loadChildren: () =>
      import('../portfolio-builder/routes').then(
        (m) => m.PORTFOLIO_BUILDER_ROUTES
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./views/portfolio-view/portfolio-view.component').then(
        (m) => m.PortfolioViewComponent
      ),
  },
];
