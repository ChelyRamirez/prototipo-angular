import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commons } from '../models/commons';
import { User } from '../models/empleado';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login( login: User ): Observable<any> {
    return this.http.post(`${Commons.BASE_URL}login`, login);
  }

  logout( logout: User ): Observable<any>{
    return this.http.post(`${Commons.BASE_URL}logout`, logout);
  }
}