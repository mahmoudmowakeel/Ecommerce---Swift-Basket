import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router)
  isLoading: boolean = false;
  errMessage: string = ""
  successMessage: string = ""
  loginSub!: Subscription


  // Create login form group

  loginForm: FormGroup = this._FormBuilder.group({
    email: ["01e72umbm7@xkxwkud.com", [Validators.required, Validators.email]],
    password: ["102030", [Validators.required, Validators.pattern(/^\w{6,}$/)]],

  })

  // login function
  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginSub = this._AuthService.loginFunction(this.loginForm?.value).subscribe({
        next: (res) => {
          console.log(res);
          this.errMessage = ""
          this.isLoading = false
          if (res.message === 'success') {
            localStorage.setItem('userToken', res.token)

            this._AuthService.saveUserData()
            this.successMessage = "You have logged in successfully."
            setTimeout(() => {
              this._Router.navigate(['/home'])
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

}
