import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { PacienteComponent } from './paciente/paciente.component';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { ListadoPacientesComponent } from './listado-pacientes/listado-pacientes.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },

 {
    path: '',
    component: AuthenticatedLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'registrar-paciente', component: PacienteComponent, canActivate: [AuthGuard] },
      { path: 'listado-pacientes', component: ListadoPacientesComponent, canActivate: [AuthGuard] },
      { path: 'historia-clinica', component: HistoriaClinicaComponent, canActivate: [AuthGuard] }

    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
