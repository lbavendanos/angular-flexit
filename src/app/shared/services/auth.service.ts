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

  recovery(body: UserRecovery): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/recovery`, body, { headers: this.createHeaders() })
                      .map((response: Response) => {
                        return response.json();
                      });
  }

  reset(body: UserReset): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset`, body, { headers: this.createHeaders() })
                      .map((response: Response) => {
                        return {token: response.json().token};
                      })
                      .do((data) => {
                        this.setToken(data.token);
                      });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, [], { headers: this.createHeadersToken(this.getToken()) })
                      .map((response: Response) => {
                        return response.json();
                      })
                      .do(() => {
                        this.removeToken();
                      });
  }

  user(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, { headers: this.createHeadersToken(this.getToken()) })
                      .map((response: Response) => {
                        return response.json();
                      })
                      .do((data) => {
                        this.authUserSubjet.next(data);
                      });
  }

  getUser(): Observable<any> {
    return this.authUserSubjet.asObservable();
  }


  isLoggedIn(): boolean {
    if (this.getToken() !== null) {
      return true;
    }
    return false;
  }


  private setToken(token) {
    localStorage.setItem('token', token);
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  private removeToken() {
    localStorage.removeItem('token');
  }

  private createHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
  }

  private createHeadersToken(token: string): Headers {
    const headers = new Headers(this.createHeaders());
    headers.append('Authorization', 'Bearer ' + token);
    return headers;
  }

}
