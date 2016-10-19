import { Component } from '@angular/core';
import { NavController, ViewController, NavParams  } from 'ionic-angular';
import { CarneModel } from '../../models/CarneModel';

@Component({
  selector: 'page-modal-add',
  templateUrl: 'modal-add.html'
})

export class ModalAdd {

  newCarne: CarneModel = new CarneModel();
  type:string;
  titulo:string;

  constructor(public navCtrl: NavController, public viewCtrl:ViewController, params: NavParams) {
     console.log('paremtro type', params.get('type'));
     console.log('paremtro carne', params.get('carne'));
     this.type = params.get('type');


     if(this.type=='add'){
      
      this.titulo = 'Agregar';
      this.newCarne = {
        id:null,
        titulo: 'Pollo',
        descripcion: 'lorem impsu'
      }

     }else{
       this.titulo = 'Modificar';
       this.newCarne = params.get('carne');
     }

  }

  dismiss() {
    this.viewCtrl.dismiss({carne:null, type:null});
  }

  onSubmit(){
    this.viewCtrl.dismiss({carne:this.newCarne, type:this.type});
  }

}
