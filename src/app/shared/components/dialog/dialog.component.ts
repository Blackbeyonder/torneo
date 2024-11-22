import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],  // Campo obligatorio
    date: ['', Validators.required],  // Campo obligatorio
    location: ['', Validators.required],  // Campo obligatorio
    participants: ['', Validators.required],  // Campo obligatorio
    urlImg: ['', [Validators.required, Validators.pattern('https?://.+')]]  // Campo obligatorio y validación de URL
  });

  date: Date = new Date(); 
  name: string = '';
  location: string = '';
  urlImg: string = '';
  participantes: string = '';

  isEdit: boolean = false;
  item: any = {}; // Para almacenar los datos pasados

  today: Date = new Date();  

  values:string="";

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private fb: FormBuilder, private adminService:AdminService) {}

  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0); // Asegurar que la fecha esté limpia

    // Si deseas establecer un valor inicial para `date`, puedes hacerlo aquí:
    this.date = this.today;  

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
      this.participantes = this.item.participants || '';
    }
  }

  closeDialog() {
    this.ref.close(); // Cierra el diálogo
  }

  async saveTournament() {
    let newCategoty="";
    if (this.myForm.valid) {
      // Si el formulario es válido, procesamos los datos
      const formData = this.myForm.value;
      console.log("formData",formData);
      
      if (this.isEdit) {
        // Lógica para editar el torneo
        console.log('Editing Tournament:', formData);
      } else {
        if(this.config.data.category=="rts"){
          newCategoty="torneorts"
          
        }

        if(this.config.data.category=="pelea"){
          newCategoty="torneopelea"
          
        }

        let response: any = await lastValueFrom(this.adminService.postTorneo(
          newCategoty,
          {
            "name": formData.name,
            "date": Utils.convertDateToDMY(formData.date),
            "ubication": formData.location,
            "participantes": formData.participants.join(","),
            "img": formData.urlImg
          }
          
          ));

          if(response.message=="success"){

            console.log('Creating Tournament:', formData);
          }
        // Lógica para crear un nuevo torneo
      }
      // Aquí podrías llamar a un servicio para guardar los datos
      this.closeDialog(); // Cerrar el diálogo después de guardar
    } else {
      console.log('Formulario inválido');
      // Aquí puedes mostrar un mensaje o resaltar los errores
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Si el formulario es válido, guardar
      this.saveTournament();
    } else {
      // Si el formulario es inválido, resaltar los errores
      console.log('Formulario inválido');
    }
  }
}
