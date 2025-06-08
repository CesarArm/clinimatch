import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MobileMenuComponent } from '../../components/mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-como-funciona',
  imports: [HeaderComponent, FooterComponent, MobileMenuComponent],
  templateUrl: './como-funciona.component.html',
  styleUrl: './como-funciona.component.css'
})
export class ComoFuncionaComponent {

}
