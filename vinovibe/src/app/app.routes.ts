import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { RecoveryPasswordComponent } from './components/pages/recovery-password/recovery-password.component';
import { ConfigComponent } from './components/pages/config/config.component';
import { RegisterComponent } from './components/pages/register/register.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'administrativo', component: AdminComponent},
  {path: 'recoveryPassword', component: RecoveryPasswordComponent},
  {path: 'config', component: ConfigComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];
