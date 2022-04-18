import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { provideFirebaseApp } from "@angular/fire/app";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: 'authentication',
        component: AuthComponent,
        children: [
            {path: '', redirectTo: 'authentication/login', pathMatch: 'full'},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent}
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
        LoginComponent,
        RegisterComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class AuthRoutingModule{}