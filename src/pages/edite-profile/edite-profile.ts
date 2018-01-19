import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from "../../models/profile/profile.interface";

/**
 * Generated class for the EditeProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edite-profile',
  templateUrl: 'edite-profile.html',
})
export class EditeProfilePage {

  profile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profile=this.navParams.get('existingProfile'); 
  }

  saveProfileResult(event : Boolean){
    event ? this.navCtrl.setRoot('TabsPage') : console.log("non authentifier ni enregistrer")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditeProfilePage');
  }

}
