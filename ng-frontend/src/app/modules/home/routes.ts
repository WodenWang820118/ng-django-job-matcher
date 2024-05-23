import { Route } from '@angular/router';

export const HOME_ROUTES: Route[] = [
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
        path: 'table',
        loadComponent: () =>
          import('./views/xlsx-table-view/xlsx-table-view.component').then(
            (m) => m.XlsxTableViewComponent
          ),
      },
      {
        path: 'score-board',
        loadComponent: () =>
          import('./views/score-board-view/score-board-view.component').then(
            (m) => m.ScoreBoardViewComponent
          ),
      },
    ],
  },
];
