import { Component } from '@angular/core';
import { NavController, ToastController, ModalController  } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ModalAdd } from '../modal-add/modal-add';
import { CarneModel } from '../../models/CarneModel';

@Component({
  selector: 'page-carnes',
  templateUrl: 'carnes.html'
})

export class Carnes {

  carnes: FirebaseListObservable<CarneModel[]>;

  constructor(public navCtrl: NavController, public af: AngularFire, public toastCtrl: ToastController, public modalCrtl: ModalController) {

     this.carnes = this.af.database.list('/carnes');
  }

  add(){
    this.openModal('add',null);
  }

  openModal(type:string, carne:any){

    console.log("type: ", type);

    let modal = this.modalCrtl.create(ModalAdd, {type:type, carne:carne} );

    modal.onDidDismiss(data =>{

      if(data.type=='add'){
        this.carnes.push(data.carne);
        this.presentToast(data.carne.titulo + " Agregado");        

      }else if(data.type=='edit'){
        //this.carnes.update(data.carne.$key, data.carne);
        this.carnes.update(data.carne.$key, {titulo: data.carne.titulo, descripcion:data.carne.descripcion });
        this.presentToast(data.carne.titulo + " Modificado");           
      }
      else{
        console.log("No haga nada")
      }

    });

    modal.present();

  }

  update(item){
    this.openModal('edit', item);
  }
  
  remove(item){
    this.carnes.remove(item.$key); 
    this.presentToast(item.titulo+" Eliminado");
  }

  presentToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: 'middle',
      showCloseButton: true
    });
    toast.present();
  }

}
