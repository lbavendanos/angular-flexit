import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Others Modules
import { AlertModule } from 'ngx-bootstrap';

// Own Components
import { PasswordRecoveryComponent } from './password-recovery.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordRecoveryComponent
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
