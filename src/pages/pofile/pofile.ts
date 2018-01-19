import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from "../../models/profile/profile.interface";
import { AuthService } from "../../providers/auth.service";

/**
 * Generated class for the PofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pofile',
  templateUrl: 'pofile.html',
})
export class PofilePage {

  existingProfile = {} as Profile;

  constructor(private auth:AuthService ,private navCtrl: NavController, private navParams: NavParams) {
    
  }

  getExistingProfile(profile : Profile){
    this.existingProfile=profile;
  }

  navigateToEditProfilePage(){
    this.navCtrl.push('EditeProfilePage',{existingProfile:this.existingProfile});
  }

  signOut(){
    this.auth.signOut();
    this.navCtrl.setRoot("LoginPage"); 
  }

}
