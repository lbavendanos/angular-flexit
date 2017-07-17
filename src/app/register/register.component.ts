import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserRegister } from '../shared/interfaces/user-register';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'fi-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, this.validatorEmail, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    },
      { validator: this.validatorMatchPassword }
    );
  }

  onSubmit({ value, valid }: { value: UserRegister, valid: boolean }) {
    if (valid) {
      this.authService.register(value)
                            .subscribe(
                              (response) => {
                                this.router.navigate(['/dashboard']);
                              },
                              (error) => {
                                this.registerGroup.get('email').setErrors({unique: true})
                              }
                          );
    }
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
