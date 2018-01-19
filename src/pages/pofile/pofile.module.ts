import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PofilePage } from './pofile';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    PofilePage,
  ],
  imports: [
    IonicPageModule.forChild(PofilePage),
    ComponentsModule
  ],
})
export class PofilePageModule {}
