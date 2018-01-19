import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";
import { User } from "firebase/app";
import { Profile } from "../models/profile/profile.interface";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import { database} from "firebase";
import { AuthService } from "./auth.service";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataService {

  ProfileObject: FirebaseObjectObservable <Profile>;

  ProfileList: FirebaseListObservable <Profile>;

  constructor(private authService: AuthService,private database : AngularFireDatabase) {
  }

  searchUser(prenom: string){
    const query = this.database.list('/profiles',{
      query: {
        orderByChild:'prenom',
        equalTo: prenom

      }
    })
    return query.take(1);
  }

  getAuthenticatedUserProfile(){
    return this.authService.getAuthUser()
    .map(user => user.uid)
    .mergeMap(authId => this.database.object(`profiles/${authId}`))
    .take(1)  
  }

  getProfile(user:User){
    this.ProfileObject = this.database.object(`/profiles/${user.uid}`, {preserveSnapshot : true});
    return this.ProfileObject.take(1);
  }

  async saveProfile(user : User, profile : Profile){
    this.ProfileObject = this.database.object(`/profiles/${user.uid}`);

    try{
      await this.ProfileObject.set(profile);
      return true;
    }catch(e){
      console.error(e);
      return false;
    }
  }

  setUserOline(profile:Profile){
    const ref = database().ref(`online-users/${profile.$key}`)

    try{
      ref.update({...profile});
      ref.onDisconnect().remove();
    }catch(e){
      console.error(e);
    }
  }

  getOnlineUsers() : FirebaseListObservable<Profile[]>{
    return this.database.list(`online-users`);
  }

}
