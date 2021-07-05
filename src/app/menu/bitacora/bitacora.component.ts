import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  
  public rutaIMG = environment.IMG;
  
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
