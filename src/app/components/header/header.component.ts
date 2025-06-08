// header.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CtaModalComponent } from '../../components/cta-modal/cta-modal.component';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CtaModalComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isModalOpen = false;
  private modalSubscription: Subscription = new Subscription();

  constructor(public modalService: ModalService) { }

  ngOnInit() {
    // Escuchar cuando se debe abrir el modal
    this.modalSubscription.add(
      this.modalService.openModal$.subscribe(() => {
        this.isModalOpen = true;
      })
    );

    // Escuchar cuando se debe cerrar el modal
    this.modalSubscription.add(
      this.modalService.closeModal$.subscribe(() => {
        this.isModalOpen = false;
      })
    );
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
