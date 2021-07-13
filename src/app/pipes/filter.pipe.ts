import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const clientes = [];
    for(const cliente of value){
      if(cliente.nombrepersona.indexOf(arg) > -1){
         clientes.push(cliente);
      };
    };
    return clientes;
  }

}

@Pipe({
  name: 'filterB'
})
export class FilterPipeB implements PipeTransform {

  transform(value: any, arg: any): any {
    const bit = [];
    for(const bitacora of value){
      if(bitacora.modulo.indexOf(arg) > -1){
         bit.push(bitacora);
      };
    };
    return bit;
  }

}
