import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { Router, RouterModule, Routes } from "@angular/router";
import { BudgetsComponent } from "./budgets/budgets.component";
import { PrincipalComponent } from "./principal.component";
import { UsersBackofficeComponent } from "./users-backoffice/users-backoffice.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
    {
        path: 'principal',
        component: PrincipalComponent,
        children: [
            {path: '', redirectTo: 'principal/budgets', pathMatch: 'full'},
            {path: 'budgets', component: BudgetsComponent},
            {path: 'users', component: UsersComponent},
            {path: 'users-backoffice', component: UsersBackofficeComponent}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        BudgetsComponent,
        UsersComponent,
        UsersBackofficeComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class PrincipalRoutingModule{}