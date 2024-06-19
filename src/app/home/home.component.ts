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
    this.router.navigate(['/listado-pacientes']);
  }

  registerMedicalHistory() {
    this.router.navigate(['/historia-clinica']);
  }

  searchMedicalHistory() {
    // this.router.navigate(['/search-medical-history']);
  }
}
