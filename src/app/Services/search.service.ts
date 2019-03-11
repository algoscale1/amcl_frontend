import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  brandSearch(params?) {
    return this.http.get(`${environment.API_url}/drug/get`, { params: params }).pipe(
      map(res => res['data'])
    );
  };

  drugDetails(id) {
    return this.http.get(`${environment.API_url}/drug/get/${id}`).pipe(
      map(res => res['data'])
    );
  };

  getSubstances() {
    return this.http.get(`${environment.API_url}/drug/substance/get`).pipe(
      map(res => res['data'])
    );
  };


  sideEffects(id) {
    return this.http.get(`${environment.API_url}/drug/class/get?search=${id}`).pipe(
      map(res => res['data'])
    );
  };

}
