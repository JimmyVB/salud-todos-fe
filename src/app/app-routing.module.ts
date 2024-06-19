import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { PacienteComponent } from './paciente/paciente.component';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'paciente', component: PacienteComponent }

    ] },

  { path: 'home', component: HomeComponent,  canActivate: [AuthGuard] },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'registrar-paciente', component: PacienteComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
