import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Others Modules
import { AlertModule } from 'ngx-bootstrap';

// Own Components
import { PasswordRecoveryComponent } from './password-recovery.component';

// Own Guards
import { UnauthGuard } from '../shared/guard/unauth.guard';

const routes: Routes = [
  {
    path: '',
    component: PasswordRecoveryComponent,
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
  declarations: [PasswordRecoveryComponent]
})
export class PasswordRecoveryModule { }
