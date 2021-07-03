import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  constructor(
    private global: GlobalService,
    private router: Router
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.verificarConexion().subscribe(
        res => {
         return this.router.navigate(['/login']);
        },
         err => {
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'No hubo respuesta del servidor'
          });  
          return console.log(err);
        }
      );
    }, 3600);
  }
}
