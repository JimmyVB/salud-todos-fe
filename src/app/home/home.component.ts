import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {}

  registrarPaciente() {
    this.router.navigate(['/registrar-paciente']);
  }

  searchPatient() {
    // this.router.navigate(['/search-patient']);
  }

  registerMedicalHistory() {
    // this.router.navigate(['/register-medical-history']);
  }

  searchMedicalHistory() {
    // this.router.navigate(['/search-medical-history']);
  }
}
