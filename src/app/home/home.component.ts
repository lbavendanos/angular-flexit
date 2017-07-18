import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'fi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // verifica si esta autenticado
    if (this.authService.isLoggedIn()) {
      // subcrivimos e internamente emite un evento para Nav
      this.authService.user().subscribe();
    }
  }

}
