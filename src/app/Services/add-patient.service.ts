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

    return this.http.post(`${environment.API_url}/patient/create`, data).pipe(
      map(res => true),
      catchError((err) => {
        return throwError(err.error);
      })
    )

  };
}
