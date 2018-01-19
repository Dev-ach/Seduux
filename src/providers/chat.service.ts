import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Post } from "../models/post/post.interface";
import { PostMessage } from '../models/post/post-message.interface';
import { Message } from '../models/messages/message.interface';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';




@Injectable()
export class ChatService {

  constructor(private auth:AuthService,private database : AngularFireDatabase) {
  }

  addpost(postName:string){
    this.database.list(`post-names`).push({name : postName});
  }

  getpostListRefListRef(): FirebaseListObservable<Post[]> {
    return this.database.list(`post-names`);
  }

  getPostChatRef(postKey : string){
    return this.database.list(`posts/${postKey}`);
  }

  async sendPostChatMessage(postKey:string,message:PostMessage){
    await this.database.list(`/posts/${postKey}`).push(message);
  }

  async sendChat(message:Message){
    await this.database.list(`/messages`).push(message);
  }

  getChats(userTwoId:string){
    return this.auth.getAuthUser()
    .map(auth => auth.uid)
    .mergeMap(uid=>this.database.list(`/user-messages/${uid}/${userTwoId}`))
    .mergeMap(chats => {
      return Observable.forkJoin(
        chats.map(chat => this.database.object(`/messages/${chat.$key}`)
      .first()),
      (...vals: Message[])=>{
        return vals;
      }
      )
    })
  }

}
