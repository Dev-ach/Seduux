import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from "../../models/post/post.interface";
import { ChatService } from "../../providers/chat.service";
import { FirebaseListObservable } from "angularfire2/database";
import { PostMessage } from "../../models/post/post-message.interface";



@IonicPage()
@Component({
  selector: 'page-post-chat',
  templateUrl: 'post-chat.html',
})
export class PostChatPage {

  post: Post;
  postMessages: FirebaseListObservable<PostMessage[]>

  constructor(private chat: ChatService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.post = this.navParams.get('post');
    this.postMessages = this.chat.getPostChatRef(this.post.$key);
  } 

  sendMessage(content : string){
    let postMessage : PostMessage={
      content
    }

    this.chat.sendPostChatMessage(this.post.$key, postMessage)
  }

}
