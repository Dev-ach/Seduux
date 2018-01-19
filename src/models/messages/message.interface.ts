import { Profile } from "../profile/profile.interface";

export interface Message {
    userFromId:string;
    
    userFromProfile:{
        nom:string;
        prenom:string;
    }
    
    userToId:string;

    userToProfile:{
        nom:string;
        prenom:string;
    }

    content:string; 
}