import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commons } from '../models/commons';
import { Cliente } from '../models/cliente';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  registrarCliente( cliente: Cliente ): Observable<any> {
    return this.http.post(`${Commons.BASE_URL}agregarCliente`, cliente);
  }

  obtenerClientes(): Observable<any> {
    return this.http.get(`${Commons.BASE_URL}obtenerClientes`,);
  }

}