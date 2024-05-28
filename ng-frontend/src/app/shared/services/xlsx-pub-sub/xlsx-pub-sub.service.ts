import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  Subject,
  take,
  tap,
} from 'rxjs';
import { WebWorkerService } from '../web-worker/web-worker.service';
import { FileService } from '../file/file.service';
import { SessionStorageService } from '../session-storage/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class XlsxPubSubService {
  displayedColumns: Subject<string[]> = new BehaviorSubject<string[]>([]);
  dataSource: Subject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private webWorkerService: WebWorkerService,
    private fileService: FileService,
    private sessionStorageService: SessionStorageService
  ) {
    this.addXlsxDataListener();
    this.addSessionStorageListener();
  }

  loadXlsxFile(file: File) {
    return this.fileService.loadXlsxFileAsObservable(file).pipe(
      take(1),
      tap((arrayBuffer) => {
        this.webWorkerService.postMessage('message', {
          action: 'readXlsx',
          data: arrayBuffer,
        });
      }),
      catchError((error) => {
        console.error('Error reading XLSX file: ', error);
        return error;
      })
    );
  }

  addXlsxDataListener(): Observable<
    {
      [key: string]: string;
    }[]
  > {
    return this.webWorkerService.onMessage().pipe(
      map((message: { action: string; data: { [key: string]: string }[] }) => {
        if (message.action === 'transformedData') {
          this.displayedColumns.next(Object.keys(message.data[0]));
          this.dataSource.next(message.data);
          return message.data;
        }
        return [];
      }),
      catchError((error) => {
        console.error('Error reading XLSX data: ', error);
        return of([]);
      })
    );
  }

  addSessionStorageListener() {
    combineLatest([
      this.sessionStorageService.getCurrentCompanyData(),
      this.sessionStorageService.getCurrentColumns(),
    ])
      .pipe(
        tap(([data, columns]) => {
          if (!data || !columns) return;
          this.displayedColumns.next(columns);
          this.dataSource.next(data);
        })
      )
      .subscribe();
  }

  getDisplayedColumns() {
    return this.displayedColumns.asObservable();
  }

  getDataSource() {
    return this.dataSource.asObservable();
  }
}
