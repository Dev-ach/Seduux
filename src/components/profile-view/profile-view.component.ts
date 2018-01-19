import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "../../providers/data.service";
import { AuthService } from "../../providers/auth.service";
import { User } from "firebase/app";
import { Profile } from "../../models/profile/profile.interface";
import { LoadingController ,Loading } from "ionic-angular";

@Component({
    selector:'app-profile-view',
    templateUrl:'profile-view.component.html'
})

export class ProfileViewComponent implements OnInit {

    public userProfile:Profile;
    private authUser:User;
    private loader:Loading;

    @Output() existingProfile : EventEmitter<Profile>;

    constructor (private Loading:LoadingController ,private data:DataService, private auth: AuthService ){

        this.existingProfile = new EventEmitter<Profile>();
        this.loader = this.Loading.create({
            content: "chargement du profil..."
        })
    }

    ngOnInit(): void {
        this.loader.present();

        this.data.getAuthenticatedUserProfile().subscribe(profile => {
            this.userProfile=profile;
            this.existingProfile.emit(this.userProfile);
            this.loader.dismiss();
        })
    }

    

}