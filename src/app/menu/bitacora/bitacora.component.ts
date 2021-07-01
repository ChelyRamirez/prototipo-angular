import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Bitacora } from '../../models/bitacora';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  
  bit: any = [];
  public re;
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
        return this.re = this.bit.resultado;
      },
      err => console.log(err)
    )
  }
}
