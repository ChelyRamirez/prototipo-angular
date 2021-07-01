import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { GlobalService } from '../services/global.service';
import { User } from '../models/empleado';
import { Bitacora } from '../models/bitacora';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  log: User = {
    username: '',
    password: '',
    idEmpleado: 0
  };

  bit: Bitacora = {
    modulo: 'Login',
    accion: 'Inicio Sesion',
    idEmpleado: 0
  }

  constructor(
    private loginService: LoginService,
    private bitacora: GlobalService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.log).subscribe(
      res => {
        if( !res.ok ){
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Usuario y contraseña invalidos'
          });
          return console.log(res);
        }
        if( res.idEmpleado !== 0 ){
          this.log.idEmpleado = res.idEmpleado;
          this.bit.idEmpleado = res.idEmpleado;
          this.log.password = "";
          this.bitacora.registrarBitacora(this.bit).subscribe(
            res => {
              localStorage.setItem('usuario', JSON.stringify(this.log));
              return this.router.navigate(['/menu']);
            },
            err => {
              Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: 'Ha ocurrio un error en el servidor'
              });
              return console.log(err);
            }
          )
        }
       },
      err => {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'Ha ocurrio un error en el servidor'
        });
        return console.log(err);
      }
    )
  }

}
