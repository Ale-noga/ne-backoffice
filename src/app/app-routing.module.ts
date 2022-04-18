import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  {path: '', redirectTo: 'authentication/login', pathMatch: 'full'},
  {path: 'principal', component:PrincipalComponent},
  {path: 'authentication', component:AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
