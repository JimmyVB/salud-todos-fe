import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: any;
  private apiUrl = 'http://localhost:8080/oauth/token';

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
    this.isAuthenticated = !!this.token;
  }

  login(username: string, password: string): Observable<any> {
    const credenciales = btoa('angularapp:12345');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post(this.apiUrl, body.toString(), { headers: headers })
      .pipe(
        tap((response: any) => {
          console.log('Respuesta del servidor:', response);
          this.token = response.access_token;
          this.isAuthenticated = true;
          localStorage.setItem('token', this.token);
        }),
        catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
        })
      );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string | null {
    return this.token;
  }
}
