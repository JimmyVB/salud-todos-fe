import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss'],
  providers: [MessageService]
})
export class HistoriaClinicaComponent implements OnInit {
  historiaClinicaForm: FormGroup;
  authToken: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private messageService: MessageService, private authService: AuthService) {
    this.historiaClinicaForm = this.fb.group({
      pacienteId: ['', Validators.required],
      peso: ['', Validators.required],
      talla: ['', Validators.required],
      alergias: ['', Validators.required],
      condicionesGenerales: ['', Validators.required],
      fechaConsulta: ['', Validators.required],
      diagnostico: ['', Validators.required],
      tratamiento: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    this.authToken = this.authService.getToken();
  }

  onSubmit() {
    if (this.historiaClinicaForm.invalid) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });

    const historiaClinica = {
      paciente: { id: this.historiaClinicaForm.value.pacienteId },
      ...this.historiaClinicaForm.value
    };

    this.http.post('http://localhost:8080/api/historias', JSON.stringify(historiaClinica), { headers })
      .subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Historia clínica registrada correctamente' });
          this.historiaClinicaForm.reset();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar la historia clínica' });
        }
      );
  }
}
