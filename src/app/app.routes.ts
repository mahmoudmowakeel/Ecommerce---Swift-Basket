import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { loggedGuard } from './core/gaurds/logged.guard';
import { authGuard } from './core/gaurds/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import path from 'node:path';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AllordersComponent } from './components/allorders/allorders.component';

export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, canActivate: [loggedGuard], children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login', component: LoginComponent
      },
      { path: 'register', component: RegisterComponent },
      {
        path: 'forgetPassword', component: ForgetPasswordComponent
      },
    ]
  },
  {
    path: '', component: BlankLayoutComponent, canActivate: [authGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'allorders', component: AllordersComponent },
      { path: 'details/:id', component: DetailsComponent },
    ]
  },

  { path: '**', component: NotFoundComponent }
];
