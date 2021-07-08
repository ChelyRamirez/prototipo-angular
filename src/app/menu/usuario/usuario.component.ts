import { Component, OnInit } from '@angular/core';
import { Bitacora } from 'src/app/models/bitacora';
import { User } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
declare var H: any;
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public rutaIMG = environment.RUTA_IMAGEN;
  empleados: any = [];
  data: any = {
    nombrePersona: "",
    apPaterno: "",
    apMaterno: "",
    username: "",
    password: "",
    puesto: "",
    estado: "",
    ciudad: "",
    codigoPostal: "",
    colonia: "",
    calle: "",
    numExt: "",
    numInt: "",
    latitud: "",
    longitud: ""
  }
  bit: Bitacora = {
    modulo: 'Empleado',
    accion: 'Registro de Empleado',
    idEmpleado: 0
  }
  log: User = JSON.parse(localStorage.getItem('usuario'));
  constructor(
    private empleado: EmpleadoService,
    private bitacora: GlobalService
  ) { }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(){
    this.empleado.obtener().subscribe(
      res => {
        
        this.empleados = res.resultado;
      },
      err => {}
    )
  }
  guardar(){
    
      this.empleado.registrarEmpleado(this.data).subscribe(
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
                text: 'Se ha guardado el registro'
              });
              this.cargarEmpleados();
               return this.restablecer();    
            },
            err => {
              Swal.fire({
                icon: 'error',
                title: 'ERROR!',
                text: 'No se pudo registrar el movimiento'
              });
              return console.log(err)}
          )
        },    
        err => {
          Swal.fire({
            icon: 'error',
            title: 'ERROR!',
            text: 'No se pudo registrar'
          });
          return console.log(err)}
        );
    
  }
  restablecer(){
    this.data = {
      nombrePersona: "",
      apPaterno: "",
      apMaterno: "",
      username: "",
      password: "",
      puesto: "",
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
  verificar() {
    if( this.data.nombrePersona !== null ){
      if(this.data.apPaterno !== null ){
        if(this.data.usuario !== null){
          if(this.data.contrasenia !== null){
            if(this.data.sueldo !== null){
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
  }
}