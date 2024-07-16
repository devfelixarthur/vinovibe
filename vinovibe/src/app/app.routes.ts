import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { RecoveryPasswordComponent } from './components/pages/recovery-password/recovery-password.component';
import { ConfigComponent } from './components/pages/config/config.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'administrativo', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'recoveryPassword', component: RecoveryPasswordComponent },
  { path: 'config', component: ConfigComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
