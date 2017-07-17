import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

// Others Modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Own Components
import { LayoutComponent } from './layout/layout.component';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentComponent } from './layout/content/content.component';

// Own Services
import { AuthService } from '../shared/services/auth.service';

// Own Guards
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './../home/home.module#HomeModule',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './../login/login.module#LoginModule',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: './../register/register.module#RegisterModule',
    pathMatch: 'full'
  },
  {
    path: 'password/reset',
    loadChildren: './../password-recovery/password-recovery.module#PasswordRecoveryModule',
    pathMatch: 'full'
  },
  {
    path: 'password/reset/:token',
    loadChildren: './../password-reset/password-reset.module#PasswordResetModule',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './../dashboard/dashboard.module#DashboardModule',
    pathMatch: 'full',
    canLoad: [AuthGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot()
  ],
  declarations: [
    LayoutComponent,
    NavComponent,
    FooterComponent,
    ContentComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  exports: [
    LayoutComponent
  ]
})
export class CoreModule { }
