import { Routes } from '@angular/router';
import { HomeComponent } from './compnents/pages/home/home.component';
import { LoginComponent } from './compnents/pages/login/login.component';
import { AboutComponent } from './compnents/pages/about/about.component';
import { AdminComponent } from './compnents/pages/admin/admin.component';
import { RecoveryPasswordComponent } from './compnents/pages/recovery-password/recovery-password.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'recoveryPassword', component: RecoveryPasswordComponent},
];
