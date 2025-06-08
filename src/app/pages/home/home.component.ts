import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.openModal();
  }

  toggleFaq(faqId: string) {
    const content = document.getElementById(`${faqId}-content`);
    const icon = document.getElementById(`${faqId}-icon`);

    if (content && icon) {
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        (icon as HTMLElement).style.transform = 'rotate(180deg)'; // Cast a HTMLElement
      } else {
        content.classList.add('hidden');
        (icon as HTMLElement).style.transform = 'rotate(0deg)'; // Cast a HTMLElement
      }
    }
  }
}
