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
    return this.http.get(`${Commons.BASE_URL}obtenerReportePDF`);
  }

  reporteXLSX(): Observable<any>{
    return this.http.get(`${Commons.BASE_URL}obtenerReporteExcel`);
  }
}