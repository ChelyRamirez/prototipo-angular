import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commons } from '../models/commons';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  /*login( cliente: Cliente ): Observable<any> {
    return this.http.post(`${Commons.BASE_URL}login`, cliente);
  }*/

}