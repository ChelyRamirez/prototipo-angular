import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bitacora } from 'src/app/models/bitacora';
import { User } from 'src/app/models/empleado';
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
  bit: Bitacora = {
    modulo: 'Login',
    accion: 'Cierre Sesion',
    idEmpleado: 0
  }
  log: User = JSON.parse(localStorage.getItem('usuario'));
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
  empleado: any;
  
  constructor(
    private loginService: LoginService,
    private bitacora: GlobalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
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
  }

}
