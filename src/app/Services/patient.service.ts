import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  addPatient(data) {

    return this.http.post(`${environment.API_url}/patient/create`, data).pipe(
      map(res => true),
      catchError((err) => {
        return throwError(err.error);
      })
    )

  };

  getPatientList() {

    return this.http.get(`${environment.API_url}/patient/get`).pipe(
      map(res => res['data'])
    )
  }

  getPatient(id) {
    return this.http.get(`${environment.API_url}/patient/get/${id}`).pipe(
      map(res => res['data'])
    )
  };

  updatePatient(id, data) {

    return this.http.patch(`${environment.API_url}/patient/update/${id}`, data).pipe(
      map(res => res['message'])
    )
  };

  getAllIndication() {

    return this.http.get(`${environment.API_url}/drug/indication/get/`).pipe(
      map(res => res['data'])
    )
  };

  getDrugForEachIndication(data?) {

    return this.http.get(`${environment.API_url}/drug/indication/get`, { params: data }).pipe(
      map(res => res['data'])
    )
  };

  getBloodTest() {

    return this.http.get(`${environment.API_url}/drug/bloodTest/list`).pipe(
      map(res => res['data'])
    )
  };

}
