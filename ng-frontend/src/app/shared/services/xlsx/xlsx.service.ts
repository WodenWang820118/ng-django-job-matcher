import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, take, tap } from 'rxjs';
import { WebWorkerService } from '../../services/web-worker/web-worker.service';
import { FileService } from '../file/file.service';

@Injectable({
  providedIn: 'root',
})
export class XlsxService {
  displayedColumns: Subject<string[]> = new BehaviorSubject<string[]>([]);
  dataSource: Subject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private webWorkerService: WebWorkerService,
    private fileService: FileService
  ) {
    this.addXlsxDataListener();
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

  getDisplayedColumns() {
    return this.displayedColumns.asObservable();
  }

  getDataSource() {
    return this.dataSource.asObservable();
  }

  addXlsxDataListener() {
    this.webWorkerService
      .onMessage()
      .pipe(
        tap(
          (message: { action: string; data: { [key: string]: string }[] }) => {
            if (message.action === 'transformedData') {
              this.displayedColumns.next(Object.keys(message.data[0]));
              this.dataSource.next(message.data);
            }
          }
        )
      )
      .subscribe();
  }
}
