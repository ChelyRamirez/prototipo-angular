import { Component, OnInit } from '@angular/core';
import {  VisitaService } from '../../services/visita.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {

  clientelist: any = [];
  public registros;

  empleadolist: any [];
  public registrose;

  constructor(
    private cliente: ClienteService,
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
        this.clientelist = res;
        this.registros = this.clientelist.resultado;
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
        this.empleadolist = res;
        this.registrose = this.empleadolist.resultado;
        console.log(this.registrose);
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

}
