import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Bitacora } from '../../models/bitacora';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  
  bit: Bitacora = {
    fecha: '',
    modulo: 'Login',
    accion: 'Inicio Sesion',
    idEmpleado: 0
  }
  
  constructor(
    private bitacora: GlobalService
  ) { }

  ngOnInit(): void {
    this.verBitacora();
  }

  verBitacora(){
    return this.bitacora.verBitacora().subscribe(
      res => {
        
      },
      err => console.log(err)
    )
  }
}
