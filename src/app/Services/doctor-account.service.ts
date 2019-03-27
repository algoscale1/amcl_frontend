import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorAccountService {

  constructor(private http: HttpClient) { }

  getAccountDetails() {
    return this.http.get(`${environment.API_url}/doctor/get`).pipe(
      map(res => res['data'])
    )
  };

  changePassword(data) {

    return this.http.patch(`${environment.API_url}`, data).pipe(
      map(res => res)
    )

  };

  editAccount(data, id) {

    return this.http.patch(`${environment.API_url}/doctor/update/${id}`, data).pipe(
      map(res => res['data'])
    )

  };

}
