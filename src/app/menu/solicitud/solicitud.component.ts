import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Bitacora } from '../../models/bitacora';
import { User } from '../../models/empleado';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  data: Cliente = {
    nombrePersona: "",
    apPaterno: "",
    apMaterno: "",
    fotoINE: "",
    telefono: "",
    sueldo: 0,
    empresa: "",
    antiguedad: "",
    pagoMax: 0,
    estado: "",
    ciudad: "",
    codigoPostal: "",
    colonia: "",
    calle: "",
    numExt: "",
    numInt: "",
    latitud: 0.0,
    longitud: 0.0,
  }

  bit: Bitacora = {
    modulo: 'Cliente',
    accion: 'Registro de Cliente',
    idEmpleado: 0
  }

  log: User = JSON.parse(localStorage.getItem('usuario'));

  constructor(
    private cliente: ClienteService,
    private bitacora: GlobalService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  registrar(){
    this.cliente.registrarCliente(this.data).subscribe(
      res => {
        if( !res.ok ) {
          return console.log(res);
        }
        this.bit.idEmpleado = this.log.idEmpleado;
        this.bitacora.registrarBitacora(this.bit).subscribe(
          res => {

            return this.restablecer();     
          },
          err => console.log(err)
        )
      },    
      err => console.log(err)
      );
  }

  restablecer(){
    this.data = {
      nombrePersona: "",
      apPaterno: "",
      apMaterno: "",
      fotoINE: "",
      telefono: "",
      sueldo: 0,
      empresa: "",
      antiguedad: "",
      pagoMax: 0,
      estado: "",
      ciudad: "",
      codigoPostal: "",
      colonia: "",
      calle: "",
      numExt: "",
      numInt: "",
      latitud: 0.0,
      longitud: 0.0,
    }
  }

  verificar(){
      
  }
}
