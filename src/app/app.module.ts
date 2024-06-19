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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PacienteComponent,
    HeaderComponent,
    AuthenticatedLayoutComponent,
    LoginLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
