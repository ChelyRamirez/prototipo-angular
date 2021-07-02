import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commons } from '../models/commons';



@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }

  reportePDF(): Observable<any> {
    const cabeceras = new HttpHeaders().set('Content-Type', 'application/pdf');

    return this.http.get(`${Commons.BASE_URL}obtenerReportePDF`, {headers: cabeceras});
    
  }

  reporteXLSX(): Observable<any>{
    return this.http.get(`${Commons.BASE_URL}obtenerReporteExcel`);
  }
}