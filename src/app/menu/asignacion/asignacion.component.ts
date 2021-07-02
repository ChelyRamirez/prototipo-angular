import { Component, OnInit } from '@angular/core';
import {  VisitaService } from '../../services/visita.service';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';
import { Cita } from '../../models/commons';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {

  clientelist: any = [];

  empleadolist: any [];

  cita: Cita = {
    idEmpleado: null,
    idCliente: null
  }

  constructor(
    private visita: VisitaService,
    private empleado: EmpleadoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerEmpleados();
  }

  obtenerClientes(){
    this.visita.obtenerVisitasPendientes().subscribe(
      res => {
        if( !res.ok ){
          return Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Ha ocurrido un error'
          });
        }
        return this.clientelist = res.resultado;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'Ha ocurrio un error en el servidor'
        });
        return console.error(err);
      }
    )
  }

  obtenerEmpleados(){
    this.empleado.obtenerEmpleados().subscribe(
      res => {
        if( !res.ok ){
          return Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Ha ocurrido un error'
          });
        }
        return this.empleadolist = res.resultado;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'Ha ocurrio un error en el servidor'
        });
        return console.error(err);
      }
    )
  }

  asignarCliente(idcliente: number){
    this.cita.idCliente = idcliente;
  }

  asignarVisitador(idempleado: number){
    this.cita.idEmpleado = idempleado;
  }

  asignarVisita() { 
    if( this.verificar() !== 0){
      this.visita.asignarVisita(this.cita).subscribe(
        res => {
          if( !res.ok ){
            return Swal.fire({
              icon: 'error',
              title: '¡ERROR!',
              text: 'Ha ocurrio un error con los datos'
            });
          }
          this.obtenerClientes();
            this.obtenerEmpleados();
            this.cita.idCliente = null;
            this.cita.idEmpleado = null;
            console.log(this.cita);
            return Swal.fire({
              icon: 'success',
              title: '¡CORRECTO!',
              text: 'Se ha agendado la visita'
            });
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Ha ocurrio un error en el servidor'
          });
          return console.log(err)
        }
      );
    }
  }

  verificar(){
    if(this.cita.idCliente !== null){
      if(this.cita.idEmpleado !== null){
        return 1;
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'Debe seleccionar un empleado'
        });
        return 0;
      }
    } else{
      Swal.fire({
        icon: 'error',
        title: '¡ERROR!',
        text: 'Debe seleccionar un cliente'
      });
      return 0;
    }
  }
}
