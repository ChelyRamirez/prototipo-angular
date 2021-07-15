import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  public rutaIMG = environment.RUTA_IMAGEN;
  
  filterpost = '';

  clientes: any = [];

  data: any = {
    query: null
  }

  constructor(
    private cliente: ClienteService
  ) { }

  ngOnInit(): void {
    this.verClientes();
  }

  verClientes(){
    this.cliente.obtenerClientes().subscribe(
      res => {
        this.clientes = res.resultado;
        console.log(this.clientes);
        
      },
      err => {

        return console.log(err)
      }
    )
 }

//  buscar(data){
//    this.data.query = data;
//   this.cliente.buscarCliente(this.data).subscribe(
//     res => {  
//       this.clientes = res.resultado;
//       for (var i = 0; i < res.resultado.length; i++){
//         this.clientes.push(res.resultado[i].buscarclientes);
//         console.log(this.clientes);
//       }
//       this.clientes = res.resultado;
//       return console.log(this.clientes[0].buscarclientes);
//       }, 
//     err => {

//       return console.log(err)
//     }
//   )
//  }
}
