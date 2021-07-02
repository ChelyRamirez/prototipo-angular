import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commons } from '../models/commons';



@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }


  obtenerEmpleados(): Observable<any> {
    return this.http.get(`${Commons.BASE_URL}obtenerVisitadores`);
  }

}