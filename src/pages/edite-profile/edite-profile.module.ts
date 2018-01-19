import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditeProfilePage } from './edite-profile';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EditeProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditeProfilePage),
    ComponentsModule
  ],
})
export class EditeProfilePageModule {}
