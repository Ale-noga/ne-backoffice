import { Injectable } from '@angular/core';
import { Firestore, setDoc } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, getDoc, getDocs, query, where} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

    constructor(private fb:Firestore){
    }

    async post(guid:string, data: any){
        await setDoc(doc(this.fb, "budgets", guid), data);
    }

    async getAllBudgets(){
      let data: any = []
        const query = collection(this.fb, "budgets")
        const budgets = await getDocs(query); 
        budgets.forEach((doc) => {
          data.push(doc.data()) 
        });
        return data;
    }

    async getAllBudgetsByName(name: any){
      const q = query(collection(this.fb, "budgets"), where("name", "==", name));
      let data: any = []
      const budgets = await getDocs(q); 
      budgets.forEach((doc) => {
          data.push(doc.data()) 
      });
      return data; 
    }

    async getBudget(email: string){
      const query = doc(this.fb, "budgets", email);
      const budget = await getDoc(query);
      return budget.data();
    }

    async delete(email: string){
      await deleteDoc(doc(this.fb, "budgets", email));
    }
      
}