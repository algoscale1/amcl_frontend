import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private http: HttpClient) { }

  interationResult(data?) {

    return this.http.get(`${environment.API_url}/drug/get/new/int`, { params: data }).pipe(
      map(res => res['data'])
    )
  }
}
