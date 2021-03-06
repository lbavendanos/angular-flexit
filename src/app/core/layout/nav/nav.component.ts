import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'fi-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  name = '';
  isAuth = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
      // se subscribe a los eventos emitidos en los modulos Dashboard y Home
      // para recuperar los datos del usuario e utilizarlos en el nav
      // ejmplo: el nombre de usuario.
      this.authService.getUser()
                        .subscribe(
                          (response) => {
                            this.name = response.name;
                            this.isAuth = true;
                          },
                          (error) => {
                            console.error(error);
                          }
                      );
  }

  // cerrar sessión
  logout() {
    this.authService.logout()
                        .subscribe(
                          (response) => {
                            this.isAuth = false;
                            this.router.navigate(['/']);
                          },
                          (error) => {
                            console.error(error);
                          }
                      );
  }

}
