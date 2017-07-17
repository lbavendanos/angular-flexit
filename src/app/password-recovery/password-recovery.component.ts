import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Alert } from '../shared/interfaces/alert';
import { UserRecovery } from '../shared/interfaces/user-recovery';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'fi-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  private recoveryGroup: FormGroup;

  alert: Alert = {
      type: '',
      title: '¡Bien hecho!',
      message: 'Solicitud de restablecer password enviado!. Revise su correo electrónico',
      visible: false
    };

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.recoveryGroup = this.formBuilder.group({
      email: ['', [Validators.required, this.validatorEmail, Validators.maxLength(255)]]
    });
  }

  onSubmit({ value, valid }: { value: UserRecovery, valid: boolean }) {
    this.alert.visible = false;
    if (valid) {
      this.authService.recovery(value)
                            .subscribe(
                              (response) => {
                                if (response.ok) {
                                  this.alertFormat('success',
                                                  'Solicitud de restablecer password enviado!. Revise su correo electrónico',
                                                  true);
                                  this.recoveryGroup.reset();
                                }
                              },
                              (error) => {
                                this.alertFormat('danger', error.json().error, true);
                                this.recoveryGroup.setErrors({recovery: true});
                              }
                          );
    }
  }

  alertFormat(type: string, message: string, visible: boolean): void {
    switch (type) {
      case 'success': {
        this.alert.type = type;
        this.alert.title = '¡Bien hecho!';
        this.alert.message = message;
        break;
      }
      case 'danger': {
        this.alert.type = type;
        this.alert.title = '¡Algo salio mal!';
        this.alert.message = message;
        break;
      }
    }
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
