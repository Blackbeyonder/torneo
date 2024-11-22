import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  name: string = '';
  date: string = '';
  location: string = '';
  urlImg: string = '';

  isEdit: boolean = false;
  item: any = {}; // Para almacenar los datos pasados


  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) {}

  ngOnInit(): void {
    // Acceder a los datos enviados al abrir el diálogo desde `this.ref.data`
    const dialogData = this.config.data;
    console.log(dialogData);
    
    this.isEdit = dialogData.isEdit;
    this.item = dialogData.item;

    // Si es una edición, asignamos los valores del objeto `item` a las variables
    if (this.isEdit && this.item) {
      this.name = this.item.name || '';
      this.date = this.item.date || '';
      this.location = this.item.location || '';
      this.urlImg = this.item.urlImg || '';
    }
  }

  closeDialog() {
    this.ref.close(); // Cierra el diálogo
  }

  saveTournament() {
    if (this.isEdit) {
      // Lógica para editar el torneo
      console.log('Editing Tournament:', this.name, this.date, this.location, this.urlImg);
    } else {
      // Lógica para crear un nuevo torneo
      console.log('Creating Tournament:', this.name, this.date, this.location, this.urlImg);
    }
  }

}
