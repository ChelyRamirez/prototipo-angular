import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Bitacora } from '../../models/bitacora';
import { User } from '../../models/empleado';

import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  public rutaIMG = environment.RUTA_IMAGEN;
  data: Cliente = {
    nombrePersona: "",
    apPaterno: "",
    apMaterno: "",
    fotoINE: "",
    telefono: "",
    sueldo: null,
    empresa: "",
    antiguedad: "",
    pagoMax: null,
    estado: "",
    ciudad: "",
    codigoPostal: "",
    colonia: "",
    calle: "",
    numExt: "",
    numInt: "",
    latitud: null,
    longitud: null,
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
    if(this.verificar() === 1){
      this.cliente.registrarCliente(this.data).subscribe(
        res => {
          if( !res.ok ) {
            return console.log(res);
          }
          this.bit.idEmpleado = this.log.idEmpleado;
          this.bitacora.registrarBitacora(this.bit).subscribe(
            res => {
              Swal.fire({
                icon: 'success',
                title: '¡CORRECTO!',
                text: 'Se ha guardado la solicitud'
              });
              return this.restablecer();     
            },
            err => console.log(err)
          )
        },    
        err => console.log(err)
        );
    }
    return Swal.fire({
      icon: 'error',
      title: '¡ERROR!',
      text: 'Debe llenar todos los campos'
    });
  }

  restablecer(){
    this.data = {
      nombrePersona: "",
      apPaterno: "",
      apMaterno: "",
      fotoINE: "",
      telefono: "",
      sueldo: null,
      empresa: "",
      antiguedad: "",
      pagoMax: null,
      estado: "",
      ciudad: "",
      codigoPostal: "",
      colonia: "",
      calle: "",
      numExt: "",
      numInt: "",
      latitud: null,
      longitud: null,
    }
  }

  verificar(){
    if( this.data.nombrePersona !== null ){
      if(this.data.apPaterno !== null ){
        if(this.data.telefono !== null){
          if(this.data.sueldo !== null){
            if(this.data.empresa !== null){
              if(this.data.antiguedad !== null){
                if(this.data.pagoMax !== null){
                  if(this.data.estado !== null){
                    if(this.data.ciudad !== null){
                      if(this.data.codigoPostal !== null){
                        if(this.data.colonia !== null){
                          if(this.data.calle !== null){
                            if(this.data.numExt !== null){
                              return 1;
                            } else {
                              Swal.fire({
                                icon: 'error',
                                title: '¡ERROR!',
                                text: 'Debe llenar todos los campos'
                              });
                              return 0;
                            }
                          } else {
                             Swal.fire({
                              icon: 'error',
                              title: '¡ERROR!',
                              text: 'Debe llenar todos los campos'
                            });
                            return 0;
                          }
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: '¡ERROR!',
                            text: 'Debe llenar todos los campos'
                          });
                          return 0;
                        }
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: '¡ERROR!',
                          text: 'Debe llenar todos los campos'
                        });
                        return 0;
                      }
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: '¡ERROR!',
                        text: 'Debe llenar todos los campos'
                      });
                      return 0;
                    }
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: '¡ERROR!',
                      text: 'Debe llenar todos los campos'
                    });
                    return 0;
                  }
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: '¡ERROR!',
                    text: 'Debe llenar todos los campos'
                  });
                  return 0;
                }
              } else {
                Swal.fire({
                  icon: 'error',
                  title: '¡ERROR!',
                  text: 'Debe llenar todos los campos'
                });
                return 0;
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: 'Debe llenar todos los campos'
              });
              return 0;
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: '¡ERROR!',
              text: 'Debe llenar todos los campos'
            });
            return 0;
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Debe llenar todos los campos'
          });
          return 0;
        }
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Debe llenar todos los campos'
          });
          return 0;
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'Debe llenar todos los campos'
        });
        return 0;
      }
  }
}
