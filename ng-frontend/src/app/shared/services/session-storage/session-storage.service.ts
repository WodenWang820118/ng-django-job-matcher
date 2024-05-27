import { Injectable } from '@angular/core';
import { catchError, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  setCurrentPortfolioId(id: string) {
    sessionStorage.setItem('CurrentPortfolioId', id);
  }

  setCurrentResume(resume: string) {
    sessionStorage.setItem('CurrentResume', resume);
  }

  setCurrentCompanyData(companyData: { [key: string]: string }[]) {
    sessionStorage.setItem('CurrentCompanyData', JSON.stringify(companyData));
  }

  setCurrentColumns(columns: string[]) {
    sessionStorage.setItem('CurrentColumns', JSON.stringify(columns));
  }

  setSelectedColumns(columns: string[]) {
    sessionStorage.setItem('SelectedColumns', JSON.stringify(columns));
  }

  setCurrentValidation(validation: { [key: string]: string }) {
    sessionStorage.setItem('CurrentVlidation', JSON.stringify(validation));
  }

  getCurrentPortfolioId() {
    return from([sessionStorage.getItem('CurrentPortfolioId')]).pipe(
      map((id) => {
        if (id) {
          return id;
        }
        return '';
      }),
      catchError((error) => {
        return error.message as Observable<string>;
      })
    );
  }

  getCurrentResume() {
    return from([sessionStorage.getItem('CurrentResume')]).pipe(
      map((resume) => {
        if (resume) {
          return resume;
        }
        return '';
      }),
      catchError((error) => {
        return error.message as Observable<string>;
      })
    );
  }

  getCurrentCompanyData(): Observable<{ [key: string]: string }[]> {
    return from([sessionStorage.getItem('CurrentCompanyData')]).pipe(
      map((companyData) => {
        if (companyData) {
          return JSON.parse(companyData);
        }
        return [];
      }),
      catchError((error) => {
        return error.message as Observable<{ [key: string]: string }[]>;
      })
    );
  }

  getCurrentColumns() {
    return from([sessionStorage.getItem('CurrentColumns')]).pipe(
      map((columns) => {
        if (columns) {
          return JSON.parse(columns);
        }
        return [];
      }),
      catchError((error) => {
        return error.message as Observable<string[]>;
      })
    );
  }

  getSelectedColumns(): Observable<string[]> {
    return from([sessionStorage.getItem('SelectedColumns')]).pipe(
      map((columns) => {
        if (columns) {
          return JSON.parse(columns);
        }
        return [];
      }),
      catchError((error) => {
        return error.message as Observable<string[]>;
      })
    );
  }

  getCurrentValidation() {
    return from([sessionStorage.getItem('CurrentVlidation')]).pipe(
      map((validation) => {
        if (validation) {
          return JSON.parse(validation);
        }
        return {};
      }),
      catchError((error) => {
        return error.message as Observable<{ [key: string]: string }>;
      })
    );
  }
}
