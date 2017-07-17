import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Alert } from '../shared/interfaces/alert';
import { UserReset } from '../shared/interfaces/user-reset';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'fi-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

   private resetGroup: FormGroup;

   alert: Alert = {
      type: 'danger',
      title: '¡Algo salio mal!',
      message: '',
      visible: false
    };

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.resetGroup = this.formBuilder.group({
      email: ['', [Validators.required, this.validatorEmail, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    },
      { validator: this.validatorMatchPassword }
    );
  }

  onSubmit({ value, valid }: { value: UserReset, valid: boolean }) {
    this.alert.visible = false;
    if (valid) {
      this.activatedRoute.params.subscribe((params) => {
        value['token'] = params.token;
      });

      this.authService.reset(value)
                            .subscribe(
                              (response) => {
                                this.router.navigate(['/dashboard']);
                              },
                              (error) => {
                                this.alertFormat(error.json().error, true);
                                this.resetGroup.setErrors({reset: true});
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

  // Custom Validator Match Password
  validatorMatchPassword(group: FormGroup) {
    const passwordControl = group.get('password');
    const passwordConfirmationControl = group.get('password_confirmation');
    if (passwordControl.value !== passwordConfirmationControl.value) {
      return { matchPassword: true };
    }
    return null;
  }

}
