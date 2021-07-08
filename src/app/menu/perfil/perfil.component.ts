import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bitacora } from 'src/app/models/bitacora';
import { User } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { GlobalService } from 'src/app/services/global.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  empleados: any = [];
  public rutaIMG = environment.RUTA_IMAGEN;
  public direccion: string = null;
  public latitud: number = null;
  public longitud: number = null;
  bit: Bitacora = {
    modulo: 'Login',
    accion: 'Cierre Sesion',
    idEmpleado: 0
  }
 
  log: User = JSON.parse(localStorage.getItem('usuario'));
  data: any = {
    idPersona: null,
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
    longitud: null
  }
  
  constructor(
    private loginService: LoginService,
    private bitacora: GlobalService,
    private router: Router,
    private empleado: EmpleadoService
  ) { }

  

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(){
    this.empleado.obtenerEmpleadoId(this.log).subscribe(
      res => {
        this.empleados = res.resultado;
        console.log(this.empleados);
        this.data.idPersona = this.empleados[0].idpersona;
        this.data.nombrePersona = this.empleados[0].nombrepersona;
        this.data.apPaterno = this.empleados[0].appaterno;
        this.data.apMaterno = this.empleados[0].apmaterno;
        this.data.username = this.empleados[0].username;
        this.data.password = this.empleados[0].password;
        this.data.puesto = this.empleados[0].puesto;
        this.data.estado = this.empleados[0].estado;
        this.data.ciudad = this.empleados[0].ciudad;
        this.data.colonia = this.empleados[0].colonia;
        this.data.codigoPostal = this.empleados[0].codigopostal;
        this.data.calle = this.empleados[0].calle;
        this.data.numExt = this.empleados[0].numext;
        this.data.numInt = this.empleados[0].numint;
        this.data.latitud = this.empleados[0].latitud;
        this.data.longitud = this.empleados[0].longitud;
        console.log(this.data);
      },
      err => {

        return console.log(err);
      }
    )
  }

  guardar(){
    
    this.empleado.editarEmpleado(this.data).subscribe(
      res => {
        if( !res.ok ) {
          return console.log(res);
        }
        console.log(res);
        this.obtenerDatos();
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

  logout() {
    this.loginService.logout(this.log).subscribe(
      res => {
        if(!res.ok){
          return console.log(res);
        }
        this.bit.idEmpleado = this.log.idEmpleado;
        this.bitacora.registrarBitacora(this.bit).subscribe(
          res => {
              localStorage.removeItem('usuario');
              return this.router.navigate(['/home']);
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    )
  }

  restablecer(){
    this.data = {
      nombrePersona: "",
      apPaterno: "",
      apMaterno: "",
      puesto: "",
      estado: "",
      ciudad: "",
      codigoPostal: "",
      colonia: "",
      calle: "",
      numExt: "",
      numInt: "",
      latitud: "",
      longitud: "",
      foto: "",
    }
  }
  verificar() {
    if( this.data.nombrePersona !== null ){
      if(this.data.apPaterno !== null ){
          if(this.data.puesto !== null){
            if(this.data.estado !== null){
              if(this.data.ciudad !== null){
                if(this.data.codigoPostal !== null){
                  if(this.data.colonia !== null){
                    if(this.data.calle !== null){
                      if(this.data.numExt !== null){
                        if(this.data.latitud !== null){
                          if(this.data.longitud !== null){
                            if(this.data.foto !== null){
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
  }
}