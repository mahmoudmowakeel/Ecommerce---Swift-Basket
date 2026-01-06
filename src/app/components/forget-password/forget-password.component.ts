import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  step: number = 1;

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)


  // send OTP to the email

  emailVerfiyGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email])
  })

  // verfiy OTP
  OTPVerifyGroup: FormGroup = new FormGroup({
    resetCode: new FormControl(null)
  })

  // Set New Password

  newPasswordGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email]),
    newPassword: new FormControl(null)
  })


  submitVerifyEmail(): void {
    this.newPasswordGroup.get('email')?.setValue(this.emailVerfiyGroup.get('email')?.value
    ); this._AuthService.verifyEmail(this.emailVerfiyGroup.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.step = 2
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  submitVerifyOtp(): void {
    this._AuthService.verifyOtp(this.OTPVerifyGroup.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.step = 3
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  submitNewPassowrd(): void {

    this._AuthService.verifyNewPass(this.newPasswordGroup.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData()
        this._Router.navigate(['./home'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
