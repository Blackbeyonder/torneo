import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() messageFromParent: string = ''; // Recibe datos del padre
  @Output() messageToParent: EventEmitter<string> = new EventEmitter(); // Emite eventos al padre

  sendMessage() {
    this.messageToParent.emit('Mensaje enviado desde el hijo al padre.');
  }

}
