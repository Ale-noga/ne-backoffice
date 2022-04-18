import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
})

export class UserService{

    constructor(private fb:Firestore){
    }

    async set_user(data: any){
        await setDoc(doc(this.fb, "users-backoffice", data.uid), data);
    }

    async get_user_by_id(uid: any): Promise<any>{
        return (await getDoc(doc(this.fb, "users-backoffice", uid))).data();
    }

}