import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ComoFuncionaComponent } from './pages/como-funciona/como-funciona.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'como-funciona', component: ComoFuncionaComponent },
];
