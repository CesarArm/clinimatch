import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-curaciones',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './curaciones.component.html',
  styleUrl: './curaciones.component.css'
})
export class CuracionesComponent {
  constructor(private modalService: ModalService) {}
  openModal() {
    this.modalService.openModal();
  }
}
