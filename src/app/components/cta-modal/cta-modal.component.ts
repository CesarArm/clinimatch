import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-cta-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cta-modal.component.html',
  styleUrls: ['./cta-modal.component.css']
})
export class CtaModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() dataCaptured = new EventEmitter<any>(); // Nuevo output para datos capturados

  formData = {
    nombres: '',
    apellidos: '',
    edad: 0,
    tipoConsulta: '',
    descripcion: ''
  };

  constructor(public modalService: ModalService) { }

  async onSubmit() {
    // Validar que los campos requeridos estén llenos y sean válidos
    if (!this.isFormValid()) {
      return; // Si no es válido, no continuar
    }

    // Mostrar loading mientras se procesan los datos
    Swal.fire({
      title: 'Procesando solicitud...',
      text: 'Por favor espera un momento',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Preparar los datos para capturar (limpiar espacios en blanco)
      const datos = {
        nombres: this.formData.nombres.trim(),
        apellidos: this.formData.apellidos.trim(),
        edad: this.formData.edad,
        tipoConsulta: this.formData.tipoConsulta,
        descripcion: this.formData.descripcion?.trim() || 'Sin descripción',
        fechaRegistro: new Date().toLocaleDateString('es-PE'),
        horaRegistro: new Date().toLocaleTimeString('es-PE'),
        timestamp: new Date().getTime()
      };

      console.log('✅ Datos capturados del modal:', datos);

      // Emitir los datos capturados
      this.dataCaptured.emit(datos);

      // Simular un pequeño delay para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Éxito al procesar
      Swal.fire({
        icon: 'success',
        title: '¡Solicitud registrada!',
        text: 'Tu solicitud ha sido registrada correctamente. Pronto nos pondremos en contacto contigo.',
        confirmButtonColor: '#0ea5e9',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        // Limpiar el formulario
        this.resetForm();
        // Cerrar usando el servicio
        this.modalService.closeModal();
        // También emitir el evento por compatibilidad
        this.closeModal.emit();
      });

    } catch (error) {
      // Error al procesar
      console.error('Error al procesar datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al procesar',
        text: 'Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.',
        confirmButtonColor: '#0ea5e9',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  // Validación completa del formulario
  private isFormValid(): boolean {
    // Verificar campos vacíos
    if (!this.formData.nombres.trim()) {
      this.showValidationError('El campo "Nombres" es requerido.');
      return false;
    }

    if (!this.formData.apellidos.trim()) {
      this.showValidationError('El campo "Apellidos" es requerido.');
      return false;
    }

    if (!this.formData.edad || this.formData.edad <= 0) {
      this.showValidationError('El campo "Edad" es requerido y debe ser mayor a 0.');
      return false;
    }

    if (!this.formData.tipoConsulta) {
      this.showValidationError('Debes seleccionar un "Tipo de consulta".');
      return false;
    }

    // Validaciones adicionales
    if (this.formData.nombres.trim().length < 2) {
      this.showValidationError('El nombre debe tener al menos 2 caracteres.');
      return false;
    }

    if (this.formData.apellidos.trim().length < 2) {
      this.showValidationError('El apellido debe tener al menos 2 caracteres.');
      return false;
    }

    if (this.formData.edad < 1 || this.formData.edad > 120) {
      this.showValidationError('La edad debe estar entre 1 y 120 años.');
      return false;
    }

    // Validar que solo contengan letras y espacios (nombres y apellidos)
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetras.test(this.formData.nombres.trim())) {
      this.showValidationError('El nombre solo puede contener letras y espacios.');
      return false;
    }

    if (!soloLetras.test(this.formData.apellidos.trim())) {
      this.showValidationError('El apellido solo puede contener letras y espacios.');
      return false;
    }

    return true;
  }

  // Mostrar error de validación
  private showValidationError(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos o incorrectos',
      text: message,
      confirmButtonColor: '#0ea5e9',
      confirmButtonText: 'Aceptar'
    });
  }

  onCancel() {
    // Confirmar si hay datos en el formulario
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
          this.resetForm();
          this.closeModal.emit();
          this.modalService.closeModal();
        }
      });
    } else {
      this.closeModal.emit();
      this.modalService.closeModal();
    }
  }

  // Verificar si hay datos en el formulario
  private hasFormData(): boolean {
    return !!(
      this.formData.nombres.trim() ||
      this.formData.apellidos.trim() ||
      this.formData.edad ||
      this.formData.tipoConsulta ||
      this.formData.descripcion?.trim()
    );
  }

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
