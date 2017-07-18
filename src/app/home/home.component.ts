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
    if (this.authService.isLoggedIn()) {
      this.authService.user().subscribe();
    }
  }

}
