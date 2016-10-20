import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarneModel } from '../../models/CarneModel';


@Component({
  selector: 'page-detalles-carne',
  templateUrl: 'detalles-carne.html'
})
export class DetallesCarne {

  carne:CarneModel;
  constructor(public navCtrl: NavController, public params:NavParams) {

    console.log("parametro: ", this.params.get('carne'));

    this.carne = this.params.get('carne');
    
  }

  

}
