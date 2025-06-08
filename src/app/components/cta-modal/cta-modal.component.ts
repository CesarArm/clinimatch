import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';
import { SheetsService } from '../../services/sheets.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-cta-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cta-modal.component.html',
  styleUrls: ['./cta-modal.component.css']
})
export class CtaModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  formData = {
    nombres: '',
    apellidos: '',
    edad: 0,
    tipoConsulta: '',
    descripcion: ''
  };

  // URL de tu Google Apps Script (reemplaza con tu URL real)
  private APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyCWDAwI0_jUtRfpTIRZBKusVh_cUUiT7Ba19zElFA7MTVnKEMNshY1Dat9a8jM13mv/exec';

  constructor(public modalService: ModalService, public sheetsService: SheetsService) { }

  async onSubmit() {
    // Validar que los campos requeridos estén llenos
    if (
      !this.formData.nombres ||
      !this.formData.apellidos ||
      !this.formData.edad ||
      !this.formData.tipoConsulta
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos requeridos.',
        confirmButtonColor: '#63ADF2',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Mostrar loading mientras se envían los datos
    Swal.fire({
      title: 'Enviando solicitud...',
      text: 'Por favor espera un momento',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Preparar los datos para enviar
      const datos = {
        nombres: this.formData.nombres,
        apellidos: this.formData.apellidos,
        edad: this.formData.edad,
        tipoConsulta: this.formData.tipoConsulta,
        descripcion: this.formData.descripcion || 'Sin descripción'
      };

      // Enviar datos a Google Sheets
      const responseObservable = this.sheetsService.enviarDatos(datos);
        const resultado = await lastValueFrom(responseObservable);

      // Verificar el resultado
      if (resultado.result === 'success') {
        // Éxito al guardar
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
          this.closeModal.emit();
        });
      } else {
        throw new Error(resultado.message || 'Error desconocido');
      }

    } catch (error) {
      // Error al enviar
      console.error('Error al enviar datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar',
        text: 'Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.',
        confirmButtonColor: '#63ADF2',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onCancel() {
    this.closeModal.emit();
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
