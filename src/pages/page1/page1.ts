import { Component } from '@angular/core';

import { NavController,ToastController  } from 'ionic-angular';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})

export class Page1 {

  items: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public af: AngularFire, public toastCtrl: ToastController) {

     this.items = this.af.database.list('/users');
  }

  add(){
    console.log("Click");
    this.items.push({ username: 'Jhon Doe'});
    this.presentToast("Jhon Doe Agregado");
  }

  update(item){
    console.log("item: ", item);
    console.log("key: ", item.$key);
    let newuser = " Apellido";
    let username = item.username;
    this.items.update(item.$key, { username:username+newuser } );
    this.presentToast(item.username+" Modificado");
  }
  
  remove(item){
    console.log("swipe")
    console.log("item: ", item);
    console.log("key: ", item.$key);   
    this.items.remove(item.$key); 
    this.presentToast(item.username+" Eliminado");
  }

  presentToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


}
