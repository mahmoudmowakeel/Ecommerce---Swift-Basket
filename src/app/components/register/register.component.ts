import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router)
  isLoading: boolean = false;
  errMessage: string = ""
  successMessage: string = ""
  registerSub!: Subscription


  // Create register form group

  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.pattern(/^01[0125][0-9]{8}$/)]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null],

  }, { validators: [this.confirmPassword] })


  // register function
  register(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.registerSub = this._AuthService.registerFunction(this.registerForm?.value).subscribe({
        next: (res) => {
          console.log(res);
          this.errMessage = ""
          this.isLoading = false
          if (res.message === 'success') {
            this.successMessage = "You have registered successfully."
            setTimeout(() => {
              this._Router.navigate(['/login'])
            }, 2000)
          }
        },
        error: (err) => {
          console.log(err.error.message)
          this.successMessage = '';
          this.errMessage = err.error.message
          this.isLoading = false;
        }
      })
    }
  }

  // custom validation for password macth
  confirmPassword(g: AbstractControl) {
    return g.get('password')?.value === g.get('rePassword')?.value ? null : { missMatch: true }
  }

}
