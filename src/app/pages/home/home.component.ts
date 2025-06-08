import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MobileMenuComponent } from '../../components/mobile-menu/mobile-menu.component';
import { CtaModalComponent } from '../../components/cta-modal/cta-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, MobileMenuComponent, CtaModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showCtaModal = false;

  openCtaModal() {
  this.showCtaModal = true;
}
closeCtaModal() {
  this.showCtaModal = false;
}
}
