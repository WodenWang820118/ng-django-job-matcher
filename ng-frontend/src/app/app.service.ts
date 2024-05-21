import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
	private url = 'http://localhost:8000/api/blogposts';
  constructor(private http: HttpClient) {}

  getBlogPosts() {
    return this.http.get(this.url).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }
}
