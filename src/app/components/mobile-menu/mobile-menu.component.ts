import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent {
  @Input() isOpen: boolean = false;
  @Output() menuToggle = new EventEmitter<boolean>();

  activeSubmenu: string | null = null;

  constructor() { }

  openMenu() {
    this.isOpen = true;
    this.menuToggle.emit(this.isOpen);
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.isOpen = false;
    this.activeSubmenu = null;
    this.menuToggle.emit(this.isOpen);
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
  }

  toggleSubmenu(submenu: string) {
    if (this.activeSubmenu === submenu) {
      this.activeSubmenu = null;
    } else {
      this.activeSubmenu = submenu;
    }
  }

  // Cerrar menú al presionar Escape
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isOpen) {
      this.closeMenu();
    }
  }

  // Método público para abrir desde el componente padre
  toggle() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
}
