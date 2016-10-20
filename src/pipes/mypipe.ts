import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'mypipe'
})

@Injectable()
export class Mypipe implements PipeTransform {
    transform(value: any, args: string[]): any {

      if(value!=null){
        return value;
        //return value.filter((carne) => carne.titulo.startsWitch('P'));
      }
      /*
        console.log("arg: ", args);
        console.log("arg value: ", value);
        
        //return value;
        if(value!=null){
          let filter = args[0].toLocaleLowerCase();
          return filter ? value.filter(carnes=> carnes.titulo.toLocaleLowerCase().indexOf(filter) != -1) : value;
        }
        return value;
        */
    }
}