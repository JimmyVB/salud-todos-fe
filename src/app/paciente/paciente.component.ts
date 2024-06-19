import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent {
  patientForm: FormGroup;
  selectedFile: File | null = null;
  private recordRTC: any;
  private stream: MediaStream | undefined;
  audioURL: string | null = null;
  audio: HTMLAudioElement | null = null;
  authToken: any;

  constructor(private fb: FormBuilder, private http: HttpClient,
    private sanitizer: DomSanitizer, private authService: AuthService) {
    this.patientForm = this.fb.group({
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
      condicionesGenerales: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.patientForm.patchValue({
        audio: this.selectedFile
      });
    }
  }

  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.stream = stream;
    this.recordRTC = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      recorderType: RecordRTC.StereoAudioRecorder,
      desiredSampRate: 44100,
      numberOfAudioChannels: 1 // Mono audio
    });
    this.recordRTC.startRecording();
  }

  stopRecording() {
    this.recordRTC.stopRecording(() => {
      const blob = this.recordRTC.getBlob();
      this.selectedFile = new File([blob], 'audio.wav', { type: 'audio/wav' });
      console.log(this.selectedFile);
      this.audioURL = URL.createObjectURL(blob);
      this.audio = new Audio(this.audioURL);
      this.patientForm.patchValue({ audio: this.selectedFile });
      this.stream!.getTracks().forEach(track => track.stop());
    });
  }

  downloadAudio() {
    if (this.selectedFile) {
      const a = document.createElement('a');
      const url = URL.createObjectURL(this.selectedFile);
      a.href = url;
      a.download = this.selectedFile.name;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
    }
  }

  playAudio() {
    if (this.audio) {
      this.audio.play();
    }
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0; // Reiniciar el audio
    }
  }

  // nombre: string = '';
  // apellido: string = '';
  // dni: string = '';
  // fechaNacimiento: string = '';
  // genero: string = '';
  // direccion: string = '';
  // telefono: string = '';
  // correo: string = '';
  // grupoSanguineo: string = '';
  // peso: string = '';
  // talla: string = '';
  // alergias: string = '';
  // condicionesGenerales: string = '';

  // constructor(private http: HttpClient) {
  // }

  // onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];
  //   }
  // }

  onSubmit() {

    this.authToken = this.authService.getToken();
    if (this.patientForm.invalid || !this.selectedFile) {
      alert('Todos los campos son requeridos, incluyendo el archivo de voz.');
      return;
    }

    if (this.patientForm.invalid || !this.selectedFile) {
      alert('Todos los campos son requeridos, incluyendo el archivo de voz.');
      return;
    }

    const patientData = {
      nombre: this.patientForm.get('nombre')?.value,
      apellido: this.patientForm.get('apellido')?.value,
      dni: this.patientForm.get('dni')?.value,
      fechaNacimiento: this.patientForm.get('fechaNacimiento')?.value,
      genero: this.patientForm.get('genero')?.value,
      direccion: this.patientForm.get('direccion')?.value,
      telefono: this.patientForm.get('telefono')?.value,
      correo: this.patientForm.get('correo')?.value,
      grupoSanguineo: this.patientForm.get('grupoSanguineo')?.value,
      peso: this.patientForm.get('peso')?.value,
      talla: this.patientForm.get('talla')?.value,
      alergias: this.patientForm.get('alergias')?.value,
      condicionesGenerales: this.patientForm.get('condicionesGenerales')?.value
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });

    console.log("DATA: ", patientData);
    console.log("authToken: ", this.authToken);
    console.log("headers: ", headers);

    this.http.post('http://localhost:8080/api/pacientes', JSON.stringify(patientData), { headers })
    .subscribe(
      (response: any) => {
        console.log('Paciente registrado 1:', response);
        console.log('Paciente registrado 2:', response.paciente.id);
        console.log('Paciente registrado 3:', response.paciente['id']);
        this.uploadVoiceFile(response.paciente.id);
      },
      error => {
        console.error('Error al registrar el paciente:', error);
        alert('Hubo un error al registrar el paciente');
      }
    );
  }

  uploadVoiceFile(pacienteId: number) {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('audio', this.selectedFile);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    this.http.post(`http://localhost:8080/api/biometric?pacienteId=${pacienteId}`, formData, { headers, responseType: 'text' })
      .subscribe(
        response => {
          console.log('Archivo de voz registrado:', response);
          alert('Archivo de voz registrado con éxito');
          if (this.audioURL) {
            URL.revokeObjectURL(this.audioURL);
          }
        },
        error => {
          console.error('Error al registrar el archivo de voz:', error);
          alert('Hubo un error al registrar el archivo de voz');
        }
      );
  }
}
