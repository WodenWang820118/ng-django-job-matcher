import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  loadJsonFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  loadJsonFileAsObservable(file: File): Observable<ArrayBuffer> {
    return from(this.loadJsonFile(file));
  }

  loadXlsxFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  loadXlsxFileAsObservable(file: File): Observable<ArrayBuffer> {
    return from(this.loadXlsxFile(file));
  }
}
