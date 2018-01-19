export interface loginResponce{
    result?:{
        email?:string;
        uid?:string;
    }
    error?: {
        code?: string;
        message?: string;
    }
}