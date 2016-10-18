import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';


export const firebaseConfig  = { 
    apiKey: "AIzaSyDXgY4iCDn2Oz-gIuuHQ8a_siK9pZLXpS8",
    authDomain: "demo1-2032c.firebaseapp.com",
    databaseURL: "https://demo1-2032c.firebaseio.com",
    storageBucket: "demo1-2032c.appspot.com",
};

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2
  ],
  providers: []
})
export class AppModule {}
