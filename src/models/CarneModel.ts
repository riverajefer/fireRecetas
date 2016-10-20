export class CarneModel{
    
    id:number;
    titulo:string;
    descripcion:string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}