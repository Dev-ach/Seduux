import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Profile } from '../../models/profile/profile.interface';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-online-users',
  templateUrl: 'online-users.component.html'
})
export class OnlineUsersComponent implements OnInit {

  userList: FirebaseListObservable<Profile[]>

  constructor(private navCtrl : NavController,private data: DataService) {
  }

  ngOnInit(){
    this.setUserOnline();
    this.getOnlineUsers();
  }

  setUserOnline(){
    //get the authenticated user 
    this.data.getAuthenticatedUserProfile().subscribe(profile=> {
      this.data.setUserOline(profile);
    })

  }

  getOnlineUsers(){
    this.userList = this.data.getOnlineUsers();
  }

  openChat(profile:Profile){
    this.navCtrl.push('MessagePage',{profile}); 
  }

}
