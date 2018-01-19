import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { Account } from '../models/account/account.interface';
import { loginResponce } from '../models/login/login-responce.interface';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

  constructor(private auth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  getAuthUser(){
    return this.auth.authState;
  }

  async createUserWithEmailAndPassword(account){
    try{
      return <loginResponce>{
        result: await this.auth.auth.createUserWithEmailAndPassword(account.email, account.password)
      }
    }catch(e){
      return <loginResponce>{
        error : e
      }
    }
  }

  async signInWithEmailAndPassword(account:Account){
    try{
      return <loginResponce>{
         result: await this.auth.auth.signInWithEmailAndPassword(account.email, account.password)
      }

    }catch(e){
      return <loginResponce>{
        error : e
      }
    }
  }

  signOut(){
    this.auth.auth.signOut();
  }

}
