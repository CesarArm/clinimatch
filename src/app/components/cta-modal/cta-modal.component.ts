import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() close = new EventEmitter<void>();

  nombres = '';
  apellidos = '';
  edad = '';
  tipoConsulta = '';
  descripcion = '';

  constructor(public modalService: ModalService) { }

  onSubmit() {
    // Validar que los campos requeridos estén llenos
    if (!this.nombres || !this.apellidos || !this.edad || !this.tipoConsulta) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos requeridos.',
        confirmButtonColor: '#63ADF2',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Solicitud enviada!',
      text: 'Tu solicitud ha sido registrada correctamente. Pronto nos pondremos en contacto contigo.',
      confirmButtonColor: '#63ADF2',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      // Limpiar el formulario
      this.resetForm();
      // Cerrar usando el servicio
      this.modalService.closeModal();
      // También emitir el evento por compatibilidad
      this.close.emit();
    });
  }

  onCancel() {
    this.modalService.closeModal();
    this.close.emit();
  }

  private resetForm() {
    this.nombres = '';
    this.apellidos = '';
    this.edad = '';
    this.tipoConsulta = '';
    this.descripcion = '';
  }
}
