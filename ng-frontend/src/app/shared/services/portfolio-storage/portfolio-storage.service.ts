import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { db } from '../../../db';
import { Portfolio } from '../../interfaces/portfolio.interface';
import { XlsxPubSubService } from '../xlsx-pub-sub/xlsx-pub-sub.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioStorageService {
  currentPortfolioId: Subject<string> = new Subject<string>();
  currentPortfolioId$: Observable<string> =
    this.currentPortfolioId.asObservable();

  currentPortfolioName: Subject<string> = new Subject<string>();
  currentPortfolioName$: Observable<string> =
    this.currentPortfolioName.asObservable();

  currentPortfolioDescription: Subject<string> = new Subject<string>();
  currentPortfolioDescription$: Observable<string> =
    this.currentPortfolioDescription.asObservable();

  currentItemId: Subject<string> = new Subject<string>();
  currentItemId$: Observable<string> = this.currentItemId.asObservable();

  currentResume: Subject<string> = new Subject<string>();
  currentResume$: Observable<string> = this.currentResume.asObservable();

  currentCompanyData: Subject<{ [key: string]: string }[]> = new Subject<
    { [key: string]: string }[]
  >();
  currentCompanyData$: Observable<{ [key: string]: string }[]> =
    this.currentCompanyData.asObservable();

  currentColumns: Subject<string[]> = new Subject<string[]>();
  currentColumns$: Observable<string[]> = this.currentColumns.asObservable();

  selectedColumns: Subject<string[]> = new Subject<string[]>();
  selectedColumns$: Observable<string[]> = this.selectedColumns.asObservable();

  constructor(
    private sessionStorageService: SessionStorageService,
    private xlsxPubSubService: XlsxPubSubService
  ) {
    this.xlsxPubSubService.addXlsxDataListener().subscribe((data) => {
      if (data.length === 0) return;
      console.log(data);
      this.setCurrentColumns(Object.keys(data[0]));
      this.setCurrentCompanyData(data);
    });
  }

  setCurrentPortfolioId(id: string) {
    this.currentPortfolioId.next(id);
    this.sessionStorageService.setCurrentPortfolioId(id);
  }

  setCurrentResume(resume: string) {
    this.currentResume.next(resume);
    this.sessionStorageService.setCurrentResume(resume);
  }

  setCurrentCompanyData(companyData: { [key: string]: string }[]) {
    this.currentCompanyData.next(companyData);
    this.sessionStorageService.setCurrentCompanyData(companyData);
  }

  setCurrentColumns(columns: string[]) {
    this.currentColumns.next(columns);
    this.sessionStorageService.setCurrentColumns(columns);
  }

  setSelectedColumns(columns: string[]) {
    this.selectedColumns.next(columns);
    this.sessionStorageService.setSelectedColumns(columns);
  }

  setCurrentPortfolioName(name: string) {
    this.currentPortfolioName.next(name);
    this.sessionStorageService.setCurrentPortfolioName(name);
  }

  setCurrentPortfolioDescription(description: string) {
    this.currentPortfolioDescription.next(description);
    this.sessionStorageService.setCurrentPortfolioDescription(description);
  }

  getCurrentPortfolioId() {
    return this.sessionStorageService.getCurrentPortfolioId();
  }

  getCurrentPortfolioName() {
    return this.sessionStorageService.getCurrentPortfolioName();
  }

  getCurrentPortfolioDescription() {
    return this.sessionStorageService.getCurrentPortfolioDescription();
  }

  getCurrentResume() {
    return this.sessionStorageService.getCurrentResume();
  }

  getCurrentCompanyData() {
    return this.sessionStorageService.getCurrentCompanyData();
  }

  getCurrentColumns() {
    return this.sessionStorageService.getCurrentColumns();
  }

  getSelectedColumns() {
    return this.sessionStorageService.getSelectedColumns();
  }

  getPortfolios() {
    return db.getPortfolios();
  }

  getPortfolio(id: string) {
    return db.getPortfolio(id);
  }

  savePortfolio(portfolio: Portfolio) {
    console.log(portfolio);
    return db.addPortfolio({
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      resume: portfolio.resume,
      companyData: portfolio.companyData,
    });
  }

  clearSessionStorage() {
    this.sessionStorageService.clearStorage();
  }
}
