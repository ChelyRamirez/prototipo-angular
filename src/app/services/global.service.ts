import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commons } from '../models/commons';
import { Bitacora } from '../models/bitacora';



@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  verificarConexion(){
    return this.http.get(`${Commons.BASE_URL}verificarConexion`);
  }

  verBitacora(){
    return this.http.get(`${Commons.BASE_URL}obtenerBitacora`);
  }

  registrarBitacora(bitacora: Bitacora): Observable<any> {
    return this.http.post(`${Commons.BASE_URL}registrarBitacora`, bitacora);
  }

}
