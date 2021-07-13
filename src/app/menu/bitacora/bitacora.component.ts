import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  filterpost = '';
  public rutaIMG = environment.RUTA_IMAGEN;
  bit: any = [];
  public registros; 
  constructor(
    private bitacora: GlobalService
  ) { }

  ngOnInit(): void {
    this.verBitacora();
  }

  verBitacora(){
    return this.bitacora.verBitacora().subscribe(
      res => {
        this.bit = res;
         this.registros = this.bit.resultado;
      },
      err => console.log(err)
    )
  }
}
