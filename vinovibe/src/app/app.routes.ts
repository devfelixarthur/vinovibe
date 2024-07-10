import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { RecoveryPasswordComponent } from './components/pages/recovery-password/recovery-password.component';
import { ConfigComponent } from './components/pages/config/config.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'administrativo', component: AdminComponent},
  {path: 'recoveryPassword', component: RecoveryPasswordComponent},
  {path: 'config', component: ConfigComponent},
];
