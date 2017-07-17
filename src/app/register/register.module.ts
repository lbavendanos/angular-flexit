import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Own Components
import { RegisterComponent } from './register.component';

// Own Guards
import { UnauthGuard } from '../shared/guard/unauth.guard';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    canActivate: [UnauthGuard],
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers: [
  ]
})
export class RegisterModule { }
