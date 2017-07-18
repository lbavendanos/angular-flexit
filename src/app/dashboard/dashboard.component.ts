import { Component, OnInit } from '@angular/core';

import { User } from '../shared/interfaces/user';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'fi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User = {
    id: '',
    name: '',
    email: '',
    created_at: '',
    updated_at: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // subcrivimos e internamente emite un evento para Nav
    this.authService.user().subscribe((response) => {
      this.user = response;
    });
  }

}
