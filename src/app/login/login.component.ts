import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router) {}

  onSubmit() {

  }

  login() {

    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Respuesta de prueba:', response);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error en la solicitud de prueba:', error);
      }
    );
  }
}
