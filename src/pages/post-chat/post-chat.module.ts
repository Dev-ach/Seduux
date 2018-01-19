import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostChatPage } from './post-chat';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PostChatPage,
  ],
  imports: [
    IonicPageModule.forChild(PostChatPage),
    ComponentsModule
  ],
})
export class PostChatPageModule {}
