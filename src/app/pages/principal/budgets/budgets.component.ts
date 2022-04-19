import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { SelectItem } from 'src/shared/selectItem.model';
import { BudgetService } from './budget.service';
import { StatesService } from '../../../../shared/states';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  budgets: any;
  budget: any
  dialogMessage: any;
  dialogTitle: any;
  optionsOrigin?: SelectItem[]

  optionsDestiny?: SelectItem[]

  optionsDeadline: SelectItem[] = [
    {
        label: "12h",
        value: "12",
    },
    {
        label: "24h",
        value: "24",
    },
    {
        label: "48h",
        value: "48",
    },
    {
      label: "72h",
      value: "72",
  },
  ];

  cubageTax: number = 0
  deadlineTax: number = 0
  distancePrice: number = 0
  finalPrice: number = 0
  form!: FormGroup;
  regiao?: number;
  optionsStates?: SelectItem[];

  constructor(private statesService: StatesService, private router: Router, private budgetService: BudgetService,
    private fb: FormBuilder) { 
    this.form = this.fb.group({
      id: new FormControl(""),
      name: new FormControl("",[
        Validators.required,
      ]),
      email: new FormControl("",[
        Validators.required,
      ]),
      phoneNumber: new FormControl("",[
        Validators.required,
      ]),
      origin: new FormControl("",[
        Validators.required,
        Validators.minLength(2)
            ]),
      destiny: new FormControl("",[
        Validators.required,
        Validators.minLength(2)
      ]),
      deadline: new FormControl("",[
        Validators.required,
      ]),
      height: new FormControl("",[
        Validators.required
      ]),
      width: new FormControl("",[
        Validators.required
      ]),
      depth: new FormControl("",[
        Validators.required,
      ]),
      cubage: new FormControl("",[
        Validators.required,
      ]),
      statusBudget: new FormControl("")
    })
  }

  async ngOnInit(): Promise<void> {
    this.budgets = await this.budgetService.getAllBudgets();
    this.getStates();
  }

  goToDetail(id:any){
    this.router.navigateByUrl('/principal/budget-detail?id='+id);
  }

  getCubage(){
    let altura = this.form.get("height")?.value;
    let largura = this.form.get("width")?.value;
    let profundidade = this.form.get("depth")?.value;
    this.form.get("cubage")?.setValue(altura*largura*profundidade*300)
  }

  async sendBudget(){
    this.form.get("statusBudget")?.setValue("EM ANDAMENTO")
    console.log(this.form.getRawValue())
    this.budgetService.post(this.form.get("email")?.value, this.form.getRawValue());
    this.dialogMessage = "Cotação incluída com sucesso"
    this.dialogTitle = "Cotação Incluída!";
    this.refresh(); 
  }

  async showDeleteModal(email: any){
    this.budget = await this.budgetService.getBudget(email);
  }

  delete(email: any){
    this.budgetService.delete(email);
    this.dialogMessage = "Essa cotação foi deletada com sucesso";
    this.dialogTitle = "Cotação deletada com sucesso!";
  }

  async refresh(){
    this.budgets = await this.budgetService.getAllBudgets();
  }

  gerarPDF() {
    let documento = new jsPDF();
    documento.setFontSize(20);
    documento.text("Cotações", 90, 15);
    documento.setFontSize(15);
    documento.text("Nome", 15, 30);
    documento.text("Status", 60, 30);
    documento.text("Origem", 105, 30);
    documento.text("Destino", 150, 30);
    documento.setFontSize(10);
    for (let i = 0; i < this.budgets.length; i++) {
      let linha
      if(i == 0){
        linha = 45
      } else {
        linha = 45 + (10*i)
      }
      documento.text(this.budgets[i].name, 15, linha);
      documento.text(this.budgets[i].statusBudget, 60, linha);
      documento.text(this.budgets[i].origin, 105, linha);
      documento.text(this.budgets[i].destiny, 150, linha);
    }
    documento.output("dataurlnewwindow");
  }

  getDistancePrice(){
    let origem = this.form.get("origin")?.value;
    let destino = this.form.get("destiny")?.value;
    if (origem == destino){
      this.distancePrice = 2380
    }
    else if (origem != destino){
      this.distancePrice = 6987
    }
  }

  getCubageTax(){
    
    if (this.form.get("cubage")?.value < 100){
      this.cubageTax = 1
    }
    else if (this.form.get("cubage")?.value < 200){
      this.cubageTax = 26
    }else{
      this.cubageTax = 67
    }
  }

  getDeadlineTax(){
    
    if(this.form.get("deadline")?.value == 12){
      this.deadlineTax = 25
      if (this.form.get("cubage")?.value > 200)
      {this.deadlineTax = 58}
    }
    else if(this.form.get("deadline")?.value == 24){
      this.deadlineTax = 20
      if (this.form.get("cubage")?.value > 200)
      {this.deadlineTax = 35}
    }
    else if(this.form.get("deadline")?.value == 48){
      this.deadlineTax = 15
    }
    else if(this.form.get("deadline")?.value == 72){
      this.deadlineTax = 10
    }
  }

  getStates(){
    this.optionsOrigin = this.statesService.getAllStates();
    this.optionsDestiny = this.statesService.getAllStates();
  }

}
