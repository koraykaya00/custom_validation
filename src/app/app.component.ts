import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userform: FormGroup;
  existingUserNames = ['Osman', 'Halil', 'İbrahim'];
  phoneRegex = /^(\d{2}\s)?\(?\d{3}\)?[\s]\d{3}[\s]\d{2}[\s]\d{2}$/g;
  passRegex = '^([a-zA-Z0-9@*#.-]{8,15})$';

  constructor() {}

  ngOnInit() {
    this.userform = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(this.phoneRegex),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passRegex),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passRegex),
        ]),
      },
      {
        validators: this.controlValuesAreEqual('password', 'confirmPassword'),
      }
    );
  }

  save() {
    this.userform.markAllAsTouched();
    setTimeout(() => {
      if (this.userform.valid) {
        alert('Kayıt başarılı...');
      } else {
        alert(
          'Lüften Zorunlu alanları doğru bir şekilde girdiğinizden emin olun.'
        );
      }
    }, 100);
  }


  private controlValuesAreEqual(
    controlNameA: string,
    controlNameB: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueOfControlA = formGroup.get(controlNameA)?.value;
      const valueOfControlB = formGroup.get(controlNameB)?.value;

      if (valueOfControlA === valueOfControlB) {
        return null;
      } else {
        return { valuesDoNotMatch: true };
      }
    };
  }
}
