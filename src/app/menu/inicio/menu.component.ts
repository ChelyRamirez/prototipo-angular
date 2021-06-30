import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bitacora } from '../../models/bitacora';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/empleado';
import { GlobalService } from '../../services/global.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  bit: Bitacora = {
    modulo: 'Login',
    accion: 'Cierre Sesion',
    idEmpleado: 0
  }

  log: User = JSON.parse(localStorage.getItem('usuario'));

  constructor(
    private loginService: LoginService,
    private bitacora: GlobalService,
    private router: Router
    ) { }

  ngOnInit(): void {
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
}
