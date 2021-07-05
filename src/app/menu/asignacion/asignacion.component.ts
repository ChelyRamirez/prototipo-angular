import { Component, OnInit,  } from '@angular/core';
import {  VisitaService } from '../../services/visita.service';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';
import { Cita } from '../../models/commons';
import { Cliente } from '../../models/cliente';
import { Bitacora } from '../../models/bitacora';
import { User } from '../../models/empleado';
import { GlobalService } from '../../services/global.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {

    public rutaIMG = environment.IMG;
  clientelist: any = [];

  empleadolist: any [];
  cliente: Cliente = {
    nombrePersona: "cliente seleccionado",
    apPaterno: "",
    apMaterno: "",
    telefono: '',
    empresa: '',
    antiguedad: '',
    pagoMax: 0
  }
  cita: Cita = {
    idEmpleado: null,
    idCliente: null,
  }
  empleadose: any = {
    nombre: "empleado seleccionado",
    app: "",
    apm: ""
  }
  bit: Bitacora = {
    modulo: 'Visita',
    accion: 'Asigno una visita',
    idEmpleado: 0
  }
  log: User = JSON.parse(localStorage.getItem('usuario'));

  constructor(
    private bitacora: GlobalService,    
    private visita: VisitaService,
    private empleado: EmpleadoService,
    private router: Router,
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

  asignarCliente(idcliente: number, nombrePersona: string, apP: string, apM: string){
    this.cita.idCliente = idcliente;
    this.cliente.nombrePersona = nombrePersona;
    this.cliente.apPaterno = apP;
    this.cliente.apMaterno = apM;
  }

  asignarVisitador(idempleado: number, nombrePersona: string, apP: string, apM: string){
    this.cita.idEmpleado = idempleado;
    this.empleadose.nombre = nombrePersona;
    this.empleadose.app = apP;
    this.empleadose.apm = apM;
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
          this.bit.idEmpleado = this.log.idEmpleado;
          this.bitacora.registrarBitacora(this.bit).subscribe(
            res => {
                this.obtenerClientes();
                this.obtenerEmpleados();
                this.cita.idCliente = null;
                this.cita.idEmpleado = null;
                return Swal.fire({
                  icon: 'success',
                  title: '¡CORRECTO!',
                  text: 'Se ha agendado la visita'
                });
            },
            err => console.log(err)
          );
          
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
