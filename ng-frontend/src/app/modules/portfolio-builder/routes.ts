import { Route } from '@angular/router';

export const PORTFOLIO_BUILDER_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./views/home-view/home-view.component').then(
        (m) => m.HomeViewComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./views/resume-view/resume-view.component').then(
            (m) => m.ResumeViewComponent
          ),
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('./views/upload-view/upload-view.component').then(
            (m) => m.UploadViewComponent
          ),
      },
      {
        path: 'xlsx-table',
        loadComponent: () =>
          import('./views/xlsx-table-view/xlsx-table-view.component').then(
            (m) => m.XlsxTableViewComponent
          ),
      },
      {
        path: 'validation',
        loadComponent: () =>
          import('./views/validation-view/validation-view.component').then(
            (m) => m.ValidationViewComponent
          ),
      },
    ],
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      import('../portfolio/routes').then((m) => m.PORTFOLIO_ROUTES),
  },
];
