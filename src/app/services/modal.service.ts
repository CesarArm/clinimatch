// modal.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private openModalSubject = new Subject<void>();
  openModal$ = this.openModalSubject.asObservable();

  private closeModalSubject = new Subject<void>();
  closeModal$ = this.closeModalSubject.asObservable();

  openModal() {
    this.openModalSubject.next();
  }

  closeModal() {
    this.closeModalSubject.next();
  }
}
