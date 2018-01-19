import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { Account } from '../../models/account/account.interface';
import { AuthService } from '../../providers/auth.service';
import { loginResponce } from '../../models/login/login-responce.interface';

/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {

  account = {} as Account;

  @Output() registerStatus : EventEmitter<loginResponce>;

  constructor(private auth: AuthService) {
    this.registerStatus = new EventEmitter<loginResponce>();
  }

  async register(){
    try{
      const result= await this.auth.createUserWithEmailAndPassword(this.account);
      this.registerStatus.emit(result);
    }
    catch(e){
      console.error(e);
      this.registerStatus.emit(e);
    }
 
  }

}
