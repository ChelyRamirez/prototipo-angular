import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commons } from '../models/commons';
import { Cliente } from '../models/cliente';



@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  constructor(private http: HttpClient) { }

  obtenerVisitasPendientes(): Observable<any> {
    return this.http.get(`${Commons.BASE_URL}obtenerVisitasPendietes`,);
  }

}