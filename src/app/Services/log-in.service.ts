import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  userName = '';
  group: number;

  constructor(private http: HttpClient) { }

  logIn(data) {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(`${environment.API_url}/user/login`, data, httpOption).pipe(
      map((res) => {
        // console.log(res);
        this.userName = res['data'].name;
        this.group = res['data'].group;
        localStorage.setItem('token', res['data'].token);
        return true;
      }),
      catchError((err) => {
        return throwError(err.error.status);
      })
    )
  };
}