import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss'],
  providers: [MessageService]
})
export class ListadoPacientesComponent implements OnInit {
  authToken: any;
  pacientes: any[] = [];
  displayModal: boolean = false;
  selectedPaciente: any = null;
  pacienteForm: FormGroup;
  generos: any; // Opciones de género

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
    private authService: AuthService, private messageService: MessageService) {
      this.pacienteForm = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        dni: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        genero: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        grupoSanguineo: ['', Validators.required],
        peso: ['', Validators.required],
        talla: ['', Validators.required],
        alergias: ['', Validators.required],
        condicionesGenerales: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.obtenerPacientes();
    this.generos = [
      { label: 'Masculino', value: 'Masculino' },
      { label: 'Femenino', value: 'Femenino' }
    ];
  }

  obtenerPacientes() {
    this.authToken = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    this.http.get<any[]>('http://localhost:8080/api/pacientes', { headers })
      .subscribe(
        response => {
          this.pacientes = response;
        },
        error => {
          console.error('Error al obtener los pacientes:', error);
        }
      );
  }

  editarPaciente(paciente: any) {
    this.selectedPaciente = paciente;
    console.log("selectedPaciente: ", this.selectedPaciente);
    this.pacienteForm.patchValue(paciente);
    this.displayModal = true;
  }

  guardarCambios() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });

    const pacienteEditado = this.pacienteForm.value;

    this.http.put(`http://localhost:8080/api/pacientes/${this.selectedPaciente.id}`, JSON.stringify(pacienteEditado), { headers })
      .subscribe(
        response => {
          console.log('Paciente actualizado:', response);
          this.displayModal = false;
          this.obtenerPacientes();
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Paciente actualizado correctamente' });
        },
        error => {
          console.error('Error al actualizar el paciente:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el paciente' });
        }
      );
  }

  eliminarPaciente(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    this.http.delete(`http://localhost:8080/api/pacientes/${id}`, { headers })
      .subscribe(
        response => {
          console.log('Paciente eliminado:', response);
          this.obtenerPacientes();
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Paciente eliminado correctamente' });

        },
        error => {
          console.error('Error al eliminar el paciente:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el paciente' });
        }
      );
  }
}
