import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { environment } from '../../../environments/environment';

import { UserRegister } from '../interfaces/user-register';
import { UserLogin } from '../interfaces/user-login';
import { UserRecovery } from '../interfaces/user-recovery';
import { UserReset } from '../interfaces/user-reset';

@Injectable()
export class AuthService {

  apiUrl = environment.apiUrl;

  // Instancia un objeto Subject para emitir eventos "Observables"
  authUserSubjet = new Subject<any>();

  constructor(private http: Http) { }

  register(body: UserRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, body, { headers: this.createHeaders() })
                      .map((response: Response) => {
                        return {token: response.json().token};
                      })
                      .do((data) => {
                        this.setToken(data.token);
                      });
  }

  login(body: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, body, { headers: this.createHeaders() })
                      .map((response: Response) => {
                        return {token: response.json().token};
                      })
                      .do((data) => {
                        this.setToken(data.token);
                      });
  }

  // enviar correo de restablecimiento de password
  recovery(body: UserRecovery): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/recovery`, body, { headers: this.createHeaders() })
                      .map((response: Response) => {
                        return response.json();
                      });
  }

  // restablece password
  reset(body: UserReset): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset`, body, { headers: this.createHeaders() })
                      .map((response: Response) => {
                        return {token: response.json().token};
                      })
                      .do((data) => {
                        this.setToken(data.token);
                      });
  }

  // eliminar e invalida token
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, [], { headers: this.createHeadersToken(this.getToken()) })
                      .map((response: Response) => {
                        return response.json();
                      })
                      .do(() => {
                        this.removeToken();
                      });
  }

  // obtiene datos del usuario
  user(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, { headers: this.createHeadersToken(this.getToken()) })
                      .map((response: Response) => {
                        return response.json();
                      })
                      .do((data) => {
                        // emite un evento para que lo recupere el modulo Nav
                        this.authUserSubjet.next(data);
                      });
  }

  // metodo para modulo Nav
  getUser(): Observable<any> {
    // retornamos un observable
    return this.authUserSubjet.asObservable();
  }

  // Verifica si es usuario esta logueado
  isLoggedIn(): boolean {
    if (this.getToken() !== null) {
      return true;
    }
    return false;
  }

  // almacena el token en el localStorage
  private setToken(token) {
    localStorage.setItem('token', token);
  }

  // recupera el token del localStorage
  private getToken() {
    return localStorage.getItem('token');
  }

  // elimina el token del localStorage
  private removeToken() {
    localStorage.removeItem('token');
  }

  // crea headers basicos en una peticion ajax
  private createHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
  }

  // crea headers con el token
  private createHeadersToken(token: string): Headers {
    const headers = new Headers(this.createHeaders());
    headers.append('Authorization', 'Bearer ' + token);
    return headers;
  }

}
