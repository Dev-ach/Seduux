import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatService } from "../../providers/chat.service";
import { Post } from "../../models/post/post.interface";
import { FirebaseListObservable } from "angularfire2/database";


@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {

  postList : FirebaseListObservable<Post[]> 
  

  constructor(private chat:ChatService,
    private alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  showAddPostDialog(){
    this.alertCtrl.create({
      title:'Create Post',
      inputs:[{
        name:"post"
      }],
      buttons:[
        {
          text:'Annuler',
          role:'cancel'
        },
        {
          text:'Ajouter',
          handler:data => {
            this.chat.addpost(data.post)
          }
        }
      ]
    }).present();
  }

  ionViewWillLoad() {
    this.getposts();
  }

  selectPost(post : Post){
    this.navCtrl.push('PostChatPage',{ post });
  }

  getposts(){
    this.postList = this.chat.getpostListRefListRef();
  }

}
