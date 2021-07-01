import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  
  bit: any = [];
<<<<<<< HEAD
  public re;
=======
  public registros; 
>>>>>>> 4e6dd886792019351f66cb2af17fb642f0045fdd
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
<<<<<<< HEAD
        return this.re = this.bit.resultado;
=======
         this.registros = this.bit.resultado;
>>>>>>> 4e6dd886792019351f66cb2af17fb642f0045fdd
      },
      err => console.log(err)
    )
  }
}
