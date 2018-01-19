import { Component, OnDestroy, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from "firebase/app";

import { Profile } from '../../models/profile/profile.interface';
import { AuthService } from '../../providers/auth.service';
import { DataService } from '../../providers/data.service';

/**
 * Generated class for the EditProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.component.html'
})
export class EditProfileComponent implements OnInit, OnDestroy {
  
  private authenticatedUser$:Subscription;
  private authenticatedUser:User;

  @Output() saveProfileResult : EventEmitter<Boolean>;

  @Input() profile : Profile;

  constructor(private auth:AuthService, private data:DataService) {

    this.saveProfileResult = new EventEmitter<Boolean>() ;

    this.authenticatedUser$ = this.auth.getAuthUser().subscribe((user:User)=>{
      this.authenticatedUser=user;
    })
  }

  

  async saveProfile(){
    if(this.authenticatedUser){
      this.profile.email = this.authenticatedUser.email;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }

  }

  ngOnInit(): void {
    if(!this.profile){
      this.profile={} as Profile;
    }
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

}
