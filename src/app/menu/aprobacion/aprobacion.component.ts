import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { GlobalService } from 'src/app/services/global.service';
import { VisitaService } from 'src/app/services/visita.service';
import { User } from '../../models/empleado';
import { Bitacora } from '../../models/bitacora';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-aprobacion',
  templateUrl: './aprobacion.component.html',
  styleUrls: ['./aprobacion.component.css']
})
export class AprobacionComponent implements OnInit {
  
  public direccion: string = null;
  public latitud: number = null;
  public longitud: number = null;
  public foto: string = null;
  public comen: string = null;
  public firma: string = null;
  public fotoine: string = null;
  clientelist: any = [];
  private clientes: any;
  data = {
    credito: null,
    idCliente: null
  }

  clientesel: any = {
    nombre: "",
    app: "",
    apm: "",
  }

  bit: Bitacora = {
    modulo: 'Credito',
    accion: '',
    idEmpleado: 0
  }

  log: User = JSON.parse(localStorage.getItem('usuario'));

  constructor(
    private visita: VisitaService,
    private empleado: EmpleadoService,
    private bitacora: GlobalService,
  ) { }
  public rutaIMG = environment.RUTA_IMAGEN;

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(){
    this.visita.obtenerVisitasCompletas().subscribe(
      res => {
        this.clientes  = res;
        if( !this.clientes.ok ){

          return console.log(res);
        }
        return this.clientelist = this.clientes.resultado;
      },
      err => {

        return console.log(err);
      }
    );
  }

  llenarcampos(nombre: string, app: string, apm: string, idc: number){
    this.data.idCliente = idc;
    this.clientesel.nombre = nombre;
    this.clientesel.app = app;
    this.clientesel.apm = apm;
  }

  domicilio(calle: string,numext: string,numint: string,colonia: string,codigopostal: string,ciudad: string,estado: string){
    if( numint === null){
      return this.direccion = `${calle} #${numext},int: ${numint}, ${colonia}, ${codigopostal},${ciudad},${estado}`;
    }
    return this.direccion = `${calle} #${numext}, ${colonia}, ${codigopostal},${ciudad},${estado}`;
  }

  resto(latitud: number, longitud: number, foto: string, comen: string, firma: string, fotoine: string){
    this.latitud = latitud;
    this.longitud = longitud;
    this.foto = `data:image/jpg;base64,${foto}`;
    this.firma = `data:image/jpg;base64,${firma}`;
    this.comen = comen;
    this.fotoine = `data:image/jpeg;base64,${fotoine}`;;
  }

  credito(i: number){
    if( i !== 0){
      this.data.credito = 1;
    } else {
      this.data.credito = 2;
    }
  }

  regCredito() {
    this.bit.idEmpleado = this.log.idEmpleado;
    if( this.data.credito === 1){
      this.empleado.registrarCredito(this.data).subscribe(
        res => {
          if( !res.ok ){
            return console.log(res);
          }
          this.bit.accion = "Aprobo el credito";
          this.bitacora.registrarBitacora(this.bit).subscribe(
            res => {
              Swal.fire({
                icon: 'success',
                title: '¡CORRECTO!',
                text: 'Se ha aprobado el credito'
              });
              this.limpiar();
              return this.obtenerClientes();
            },
            err => {
              return Swal.fire({
                icon: 'error',
                title: '¡ALGO SALIO MAL!',
                text: 'Algo salio mal'
              });
            }
          )
          return console.log(res);
        },
        err => {
          return Swal.fire({
            icon: 'error',
            title: '¡ALGO SALIO MAL!',
            text: 'Algo salio mal'
          });
        }
      );
    } else if(this.data.credito === 2){
      this.empleado.registrarCredito(this.data).subscribe(
        res => {
          if( !res.ok ){
            return console.log(res);
          }
          this.bit.accion = "Rechazo el credito"
          this.bitacora.registrarBitacora(this.bit).subscribe(
            res => {
              Swal.fire({
                icon: 'error',
                title: '¡Accion Realizada!',
                text: 'Se ha rechazado el credito'
              });
              this.limpiar();
              return this.obtenerClientes();
            },
            err => {
              Swal.fire({
                icon: 'error',
                title: '¡ALGO SALIO MAL!',
                text: 'Algo salio mal'
              });
              
              return console.log(err);
            }
          )
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: '¡ALGO SALIO MAL!',
            text: 'Algo salio mal'
          });
          return console.log(err);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: '¡ALGO SALIO MAL!',
        text: 'Debe seleccionar una opcion'
      });
    }
    
  }

  limpiar(){
    this.direccion = null;
    this.latitud = null;
    this.longitud = null;
    this.foto = null;
    this.comen = null;
    this.firma = null;
    this.fotoine = null;
    this.data.credito = null;
    this.data.idCliente = null;
    this.clientesel.nombre = "";
    this.clientesel.app = "";
    this.clientesel.apm = "";
  }

}
