import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  name: string = '';
  date: string = '';
  location: string = '';


  constructor(private ref: DynamicDialogRef) {}

  closeDialog() {
    this.ref.close(); // Cierra el diálogo
  }

}
