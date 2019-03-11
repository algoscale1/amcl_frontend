import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddPatientService {

  constructor(private http: HttpClient) { }

  addPatient(data) {

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.http.post(`${environment.API_url}/patient/create`, data, httpOption).pipe(
      map(res => true),
      catchError((err) => {
        return throwError(err.error);
      })
    )

  };
}
