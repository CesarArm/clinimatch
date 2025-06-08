import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-blanqueamiento',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './blanqueamiento.component.html',
  styleUrl: './blanqueamiento.component.css'
})
export class BlanqueamientoComponent {
  constructor(private modalService: ModalService) {}
  openModal() {
    this.modalService.openModal();
  }
}
