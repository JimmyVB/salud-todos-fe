import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { AuthGuard } from './auth.guard';
import { AuthService } from './service/auth.service';
import { PacienteComponent } from './paciente/paciente.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { ListadoPacientesComponent } from './listado-pacientes/listado-pacientes.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PacienteComponent,
    HeaderComponent,
    AuthenticatedLayoutComponent,
    LoginLayoutComponent,
    ListadoPacientesComponent,
    HistoriaClinicaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule,
    DropdownModule,
    ToastModule,
    InputTextareaModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
