import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Account } from '../../models/account/account.interface';
import { loginResponce } from "../../models/login/login-responce.interface";
import { AuthService } from "../../providers/auth.service";


/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {

  account = {} as Account;
  @Output() loginStatus: EventEmitter<loginResponce>;

  constructor(private auth: AuthService, private navCtrl: NavController) {
    this.loginStatus = new EventEmitter<loginResponce>();
  }
    
  async login() {
    const loginResponce = await this.auth.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(loginResponce);
  }

  navigateToRegisterPage() {
    this.navCtrl.push('RegisterPage');
  }

}
