import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-cirugia',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './cirugia.component.html',
  styleUrl: './cirugia.component.css'
})
export class CirugiaComponent {
  constructor(private modalService: ModalService) {}
    openModal() {
      this.modalService.openModal();
    }
}
