import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { loginResponce } from '../../models/login/login-responce.interface';
import { DataService } from "../../providers/data.service";
import { User } from "firebase/app";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private data: DataService,private Toast: ToastController, 
              private navCtrl: NavController, private navParams: NavParams) {
  }

  login(event:loginResponce){
    if(!event.error){
      this.Toast.create({
        message:   `bienvenue sur seduux, ${event.result.email}`,
        duration:3000
      }).present();
      this.data.getProfile(<User>event.result).subscribe(profile =>{
        console.log(profile);
        profile.val() ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('EditeProfilePage');
      })
    }else{
      this.Toast.create({
        message:   event.error.message,
        duration:3000
      }).present();
    }
  }

  

}
