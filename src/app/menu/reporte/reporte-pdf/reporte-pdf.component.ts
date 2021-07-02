import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte-pdf',
  templateUrl: './reporte-pdf.component.html',
  styleUrls: ['./reporte-pdf.component.css']
})
export class ReportePDFComponent implements OnInit {

  constructor(
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.verificarConexion().subscribe(
        res => {
         return this.router.navigate(['/documentoPDF']);
        },
         err => console.log(err)
      );
    }, 2800);
  }

}
