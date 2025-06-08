import { Component, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiante-login',
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './estudiante-login.component.html',
  styleUrl: './estudiante-login.component.css'
})
export class EstudianteLoginComponent {
  email = '';
  password = '';

  onLogin() {
    if (this.email && this.password) {
      // Simulación de login exitoso
      Swal.fire({
        title: '¡Advertencia!',
        text: 'Debes registrarte para acceder a esta sección.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      // Redirigir o cargar datos de pacientes aquí
    } else {
      // Mostrar mensaje de Información si no se ha registrado
      Swal.fire({
        title: '¡Información!',
        text: 'Debes ingresar tus datos previamente.',
        icon: 'info',
        confirmButtonText: 'Entendido'
      });
    }
  }
}
