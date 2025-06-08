import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ComoFuncionaComponent } from './pages/como-funciona/como-funciona.component';
import { CuracionesComponent } from './pages/curaciones/curaciones.component';
import { BlanqueamientoComponent } from './pages/blanqueamiento/blanqueamiento.component';
import { ImplantesComponent } from './pages/implantes/implantes.component';
import { CirugiaComponent } from './pages/cirugia/cirugia.component';
import { EstudianteLoginComponent } from './pages/estudiante-login/estudiante-login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'como-funciona', component: ComoFuncionaComponent },
  { path: 'curaciones', component: CuracionesComponent },
  { path: 'blanqueamiento', component: BlanqueamientoComponent },
  { path: 'implantes', component: ImplantesComponent },
  { path: 'cirugia', component: CirugiaComponent },
  { path: 'soy-estudiante', component: EstudianteLoginComponent },
  // Ruta comodín para cualquier ruta no encontrada
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
