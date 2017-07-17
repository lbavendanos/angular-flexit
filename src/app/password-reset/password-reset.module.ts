import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Others Modules
import { AlertModule } from 'ngx-bootstrap';

// Own Components
import { PasswordResetComponent } from './password-reset.component';

// Own Guards
import { UnauthGuard } from '../shared/guard/unauth.guard';

const routes: Routes = [
  {
    path: '',
    component: PasswordResetComponent,
    canActivate: [UnauthGuard],
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  declarations: [PasswordResetComponent]
})
export class PasswordResetModule { }
