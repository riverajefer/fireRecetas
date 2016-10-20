import { Component  } from '@angular/core';
import { NavController, ToastController, ModalController, LoadingController, AlertController  } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ModalAdd } from '../modal-add/modal-add';
import { CarneModel } from '../../models/CarneModel';
import { DetallesCarne} from '../detalles-carne/detalles-carne';

@Component({
  selector: 'page-carnes',
  templateUrl: 'carnes.html',
})

export class Carnes {

  carnes: FirebaseListObservable<CarneModel[]>;

  constructor(
      public navCtrl: NavController, 
      public af: AngularFire, 
      public toastCtrl: ToastController, 
      public modalCrtl: ModalController,
      public loadingCtrl: LoadingController,
      public alerCtrl:AlertController
    ){

     let loading = this.loadingCtrl.create({
        content: "Please wait...",
     });
     loading.present();
     
     this.carnes = this.af.database.list('/carnes',   {
      query: {
        orderByChild: 'titulo',
        equalTo: null
      }
    });

     if(this.carnes!=undefined){
        loading.dismiss();
     }
  }

  add(){
    this.openModal('add',null);
  }

  openModal(type:string, carne:any){

    let modal = this.modalCrtl.create(ModalAdd, {type:type, carne:carne} );

    modal.onDidDismiss(data =>{

      if(data.type=='add'){
        console.log(data.carne)
        this.carnes.push(data.carne);
        this.presentToast(data.carne.titulo + " Agregado", data.carne);        

      }else if(data.type=='edit'){
        //this.carnes.update(data.carne.$key, data.carne);
        this.carnes.update(data.carne.$key, {titulo: data.carne.titulo, descripcion:data.carne.descripcion });
        this.presentToast(data.carne.titulo + " Modificado", carne);           
      }
      else{
        console.log("No haga nada")
      }

    });

    modal.present();

  }

  update(item:CarneModel){
    this.openModal('edit', item);
  }
  
  remove(item){

    let confirm = this.alerCtrl.create({
      title: 'Seguro que desea eliminar este registro ?',
      message: item.titulo,
      buttons: [
        {
          text: 'Si',
          handler: () => {
            console.log('Disagree clicked');
            this.carnes.remove(item.$key); 
            this.presentToast(item.titulo+" Eliminado", item);            
          }
        },
       {
          text: 'No',
       }        
      ]
    });
    confirm.present()


  }


doConfirm() {
    let confirm = this.alerCtrl.create({
      title: 'Desea eliminar este registro',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
      ]
    });
    confirm.present()
  }



  presentToast(mensaje: string, carne:any) {
    console.log("pa:", carne)
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: 'middle',
      showCloseButton: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast: ', carne);
    });

    toast.present();
  }

  detalles(carne: CarneModel){
    this.navCtrl.push(DetallesCarne, {carne:carne});
  }

}
