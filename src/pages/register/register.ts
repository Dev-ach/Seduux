import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { loginResponce } from '../../models/login/login-responce.interface';
import { User } from "firebase/app";
import { DataService } from "../../providers/data.service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(private data: DataService,private toast: ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  register(event:loginResponce){ 
    if(!event.error){
      this.toast.create({
        message:`Votre compte est créer ${event.result.email}`,
        duration: 3000
      }).present();
      this.data.getProfile(<User>event.result).subscribe(profile =>{
        console.log(profile);
        profile.val() ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('EditeProfilePage');
      })
    }else{
      this.toast.create({
        message:`Votre compte n'est pas créer ${event.error.message}`,
        duration: 3000
      }).present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
