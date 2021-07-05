import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commons, Cita } from '../models/commons';



@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  constructor(private http: HttpClient) { }

  obtenerVisitasPendientes(): Observable<any> {
    return this.http.get(`${Commons.BASE_URL}obtenerVisitasPendietes`,);
  }

  asignarVisita(data: Cita ): Observable<any> {
    return this.http.post(`${Commons.BASE_URL}asignarVisita`, data)
  }

  obtenerVisitasCompletas() {
    return this.http.get(`${Commons.BASE_URL}obtenerVisitasCompletadas`);
  }

}