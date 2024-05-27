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
    path: 'build-portfolio',
    loadChildren: () => import('../home/routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: '',
    loadComponent: () =>
      import('./views/portfolio-view/portfolio-view.component').then(
        (m) => m.PortfolioViewComponent
      ),
  },
];
