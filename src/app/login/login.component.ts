import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Alert } from '../shared/interfaces/alert';
import { UserLogin } from '../shared/interfaces/user-login';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'fi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginGroup: FormGroup;

  alert: Alert = {
      type: 'danger',
      title: '¡Algo salio mal!',
      message: '',
      visible: false
    };

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginGroup = this.formBuilder.group({
      email: ['', [Validators.required, this.validatorEmail, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: ['', []]
    });
  }

  onSubmit({ value, valid }: { value: UserLogin, valid: boolean }) {
    this.alert.visible = false;
    if (valid) {
      this.authService.login(value)
                            .subscribe(
                              (response) => {
                                this.router.navigate(['/dashboard']);
                              },
                              (error) => {
                                this.alertFormat(error.json().error, true);
                                this.loginGroup.setErrors({login: true})
                              }
                          );
    }
  }

  alertFormat(message: string, visible: boolean): void {
    this.alert.message = message;
    this.alert.visible = visible;
  }

  // Custom Validator Email
  validatorEmail(control: FormControl) {
    // tslint:disable-next-line:max-line-length
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(control.value)) {
      return { email: true };
    }
    return null;
  }

}
