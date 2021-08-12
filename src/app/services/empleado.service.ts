import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commons } from '../models/commons';
import {} from 'ngx-socket-io'


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }


  obtenerEmpleados(): Observable<any> {
    return this.http.get(`${Commons.BASE_URL}obtenerVisitadores`);
  }

  obtener(): Observable<any> {
    return this.http.get(`${Commons.BASE_URL}obtenerEmpleados`);
  }

  obtenerEmpleadoId(data): Observable<any>{
    return this.http.post(`${Commons.BASE_URL}obtenerEmpleadoPorId`, data);
  }

  editarEmpleado(data): Observable<any>{
    return this.http.post(`${Commons.BASE_URL}editarEmpleado`, data);
  }

  registrarCredito(data): Observable<any> {
    return this.http.post(`${Commons.BASE_URL}credito`, data);
  }

  registrarEmpleado(data): Observable<any> {
    return this.http.post(`${Commons.BASE_URL}agregarEmpleado`,data);
  }

  detet(): Observable<any> { 
    let s:any = window.onbeforeunload = e => {
      if(!sessionStorage.getItem('usuario')){
        console.log("se petateo");
        s = false;
        return "Alerta nativa del navegador";
      }
      console.log(e);
      s = true
      return "Alerta nativa del navegador";
    }
    return s;
  }

}