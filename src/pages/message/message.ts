import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from "../../models/profile/profile.interface";
import { Message } from "../../models/messages/message.interface";
import { AuthService } from '../../providers/auth.service';
import { DataService } from '../../providers/data.service';
import { ChatService } from '../../providers/chat.service';
import { Observable } from 'rxjs/Observable';



@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {      
  
  userProfile: Profile;

  userId: string;

  selectedProfile:Profile;

  messageList: Observable<Message[]>

  constructor(private chat: ChatService,
    private auth:AuthService,private data:DataService,
    public navCtrl: NavController, public navParams: NavParams) {}

  ionViewWillLoad() {
    this.selectedProfile=this.navParams.get('profile');
    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.userProfile =profile
      this.userId=profile.$key
    });     
    
    this.messageList = this.chat.getChats(this.selectedProfile.$key);
  }

  async sendMessage(content:string){
    try{
      const message:Message={
        userToId:this.selectedProfile.$key,
        userToProfile:{
          prenom: this.selectedProfile.prenom,
          nom:this.selectedProfile.nom
        },
        userFromProfile: {
          prenom:this.userProfile.prenom,
          nom:this.userProfile.nom
        },
        userFromId:this.userId,

        content:content
      }

      await this.chat.sendChat(message);

    }catch(e){

      console.error(e);

    }
  }

}
