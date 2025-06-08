import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-implantes',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './implantes.component.html',
  styleUrl: './implantes.component.css'
})
export class ImplantesComponent {
  constructor(private modalService: ModalService) {}
  openModal() {
    this.modalService.openModal();
  }
}
