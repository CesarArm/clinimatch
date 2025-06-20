import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel y formularios de plantilla
import Swal from 'sweetalert2'; // Para las alertas de SweetAlert2
import { ModalService } from '../../services/modal.service'; // Asegúrate de que esta ruta sea correcta

// Importa tu servicio de datos de Firebase y la interfaz de datos
import { FirebaseDataService, ConsultaData } from '../../services/firebase-data.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-cta-modal',
  standalone: true, // Indica que este es un componente standalone
  imports: [CommonModule, FormsModule], // Importa los módulos necesarios
  templateUrl: './cta-modal.component.html',
  styleUrls: ['./cta-modal.component.css']
})
export class CtaModalComponent {
  // Propiedad de entrada para controlar la visibilidad del modal
  @Input() isOpen = false;
  // Evento de salida para notificar el cierre del modal
  @Output() closeModal = new EventEmitter<void>();
  // El output dataCaptured ya no es estrictamente necesario si los datos se guardan directamente en Firebase.
  // @Output() dataCaptured = new EventEmitter<any>();

  // Objeto que almacena los datos del formulario usando ngModel
  formData = {
    nombres: '',
    apellidos: '',
    edad: 0,
    tipoConsulta: '',
    descripcion: ''
  };

  // Constructor para inyectar servicios
  constructor(
    public modalService: ModalService, // Servicio para controlar el modal
    private firebaseDataService: FirebaseDataService // Servicio para interactuar con Firebase
  ) { }

  /**
   * Maneja el envío del formulario. Valida los datos y los guarda en Firestore.
   */
  async onSubmit() {
    // 1. Validar el formulario
    if (!this.isFormValid()) {
      return; // Si no es válido, detiene el proceso
    }

    // 2. Mostrar un indicador de carga con SweetAlert2
    Swal.fire({
      title: 'Procesando solicitud...',
      text: 'Por favor espera un momento',
      allowOutsideClick: false, // No permitir cerrar haciendo clic fuera
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de carga
      }
    });

    try {
      // 3. Preparar los datos para enviar a Firestore
      // Se utiliza la interfaz ConsultaData para asegurar el tipado correcto
      const datos: ConsultaData = {
        nombres: this.formData.nombres.trim(), // Elimina espacios en blanco al inicio/final
        apellidos: this.formData.apellidos.trim(),
        edad: this.formData.edad,
        tipoConsulta: this.formData.tipoConsulta,
        // Si la descripción está vacía, guarda 'Sin descripción'
        descripcion: this.formData.descripcion?.trim() || 'Sin descripción',
        fechaRegistro: new Date().toLocaleDateString('es-PE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }), // Formato de fecha local (ej. 19/06/2025)
        horaRegistro: new Date().toLocaleTimeString('es-PE', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false // Formato 24 horas
        }), // Formato de hora local (ej. 23:04:22)
        timestamp: new Date().getTime() // Timestamp numérico para facilitar ordenación
      };

      console.log('✅ Datos a enviar a Firebase:', datos);

      // 4. Llamar al servicio para guardar los datos en Firestore
      await this.firebaseDataService.saveConsulta(datos);

      // 5. Simular un pequeño delay para mejorar la experiencia de usuario (opcional)
      await new Promise(resolve => setTimeout(resolve, 500)); // Espera 0.5 segundos

      // 6. Mostrar mensaje de éxito con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: '¡Solicitud registrada!',
        text: 'Tu solicitud ha sido registrada correctamente. Pronto nos pondremos en contacto contigo.',
        confirmButtonColor: '#0ea5e9',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        // 7. Limpiar el formulario y cerrar el modal después del éxito
        this.resetForm();
        this.modalService.closeModal(); // Cierra el modal usando el servicio
        this.closeModal.emit(); // Emite el evento para componentes padres (por si acaso)
      });

    } catch (error) {
      // 8. Manejo de errores en caso de que falle el guardado en Firebase
      console.error('Error al guardar datos en Firebase:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al procesar',
        text: 'Hubo un problema al guardar tu solicitud. Por favor, inténtalo de nuevo.',
        confirmButtonColor: '#0ea5e9',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  /**
   * Realiza validaciones en los campos del formulario.
   * @returns `true` si el formulario es válido, `false` en caso contrario.
   */
  private isFormValid(): boolean {
    // Validación de campos requeridos y de longitud
    if (!this.formData.nombres.trim()) {
      this.showValidationError('El campo "Nombres" es requerido.');
      return false;
    }
    if (this.formData.nombres.trim().length < 2) {
      this.showValidationError('El nombre debe tener al menos 2 caracteres.');
      return false;
    }

    if (!this.formData.apellidos.trim()) {
      this.showValidationError('El campo "Apellidos" es requerido.');
      return false;
    }
    if (this.formData.apellidos.trim().length < 2) {
      this.showValidationError('El apellido debe tener al menos 2 caracteres.');
      return false;
    }

    if (!this.formData.edad || this.formData.edad <= 0) {
      this.showValidationError('El campo "Edad" es requerido y debe ser mayor a 0.');
      return false;
    }
    if (this.formData.edad < 1 || this.formData.edad > 120) {
      this.showValidationError('La edad debe estar entre 1 y 120 años.');
      return false;
    }

    if (!this.formData.tipoConsulta) {
      this.showValidationError('Debes seleccionar un "Tipo de consulta".');
      return false;
    }

    // Validación de que solo contengan letras y espacios (nombres y apellidos)
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetras.test(this.formData.nombres.trim())) {
      this.showValidationError('El nombre solo puede contener letras y espacios.');
      return false;
    }
    if (!soloLetras.test(this.formData.apellidos.trim())) {
      this.showValidationError('El apellido solo puede contener letras y espacios.');
      return false;
    }

    return true; // Si todas las validaciones pasan, el formulario es válido
  }

  /**
   * Muestra una alerta de SweetAlert2 para errores de validación.
   * @param message El mensaje de error a mostrar.
   */
  private showValidationError(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos o incorrectos',
      text: message,
      confirmButtonColor: '#0ea5e9',
      confirmButtonText: 'Aceptar'
    });
  }

  /**
   * Maneja el evento de cancelar el formulario.
   * Pregunta al usuario si desea perder los datos si ya ha ingresado alguno.
   */
  onCancel() {
    if (this.hasFormData()) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se perderán los datos ingresados',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0ea5e9',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sí, cerrar',
        cancelButtonText: 'Continuar editando'
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetForm(); // Limpia el formulario
          this.closeModal.emit(); // Emite el evento de cierre
          this.modalService.closeModal(); // Cierra el modal usando el servicio
        }
      });
    } else {
      // Si no hay datos, simplemente cierra el modal
      this.closeModal.emit();
      this.modalService.closeModal();
    }
  }

  /**
   * Verifica si hay algún dato ingresado en el formulario.
   * @returns `true` si hay datos, `false` en caso contrario.
   */
  private hasFormData(): boolean {
    return !!(
      this.formData.nombres.trim() ||
      this.formData.apellidos.trim() ||
      this.formData.edad ||
      this.formData.tipoConsulta ||
      this.formData.descripcion?.trim()
    );
  }

  /**
   * Reinicia el formulario a sus valores iniciales.
   */
  private resetForm() {
    this.formData = {
      nombres: '',
      apellidos: '',
      edad: 0,
      tipoConsulta: '',
      descripcion: ''
    };
  }
}
