import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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

  values: string = "";
  isSaved: boolean = false;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private fb: FormBuilder, private adminService: AdminService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0); // Asegurar que la fecha esté limpia

    // Si deseas establecer un valor inicial para `date`, puedes hacerlo aquí:
    this.date = this.today;

    // Acceder a los datos enviados al abrir el diálogo desde `this.ref.data`
    const dialogData = this.config.data;

    this.isEdit = dialogData.isEdit;
    this.item = dialogData.item;


    // Si es una edición, asignamos los valores del objeto `item` a las variables
    if (this.isEdit && this.item) {

      const formData = {
        name: this.item.name,
        date: Utils.convertToDate(this.item.date),
        location: this.item.ubication,
        participants: Utils.convertStringToArray(this.item.participantes),
        urlImg: this.item.img
      };

      this.myForm.setValue(formData);
    } else {
      debugger

      if (this.config.data.category == "torneorts") {

        const savedData = localStorage.getItem('formDataRTS');
        if (savedData) {
          // Convertimos los datos del string de vuelta a un objeto
          const formData = JSON.parse(savedData);

          // Convertir la fecha a un objeto Date
          if (formData.date) {
            formData.date = new Date(formData.date); // Convertimos el string de fecha a Date
          }

          // Cargar los valores en el formulario
          this.myForm.setValue(formData);
        }
      }

      if (this.config.data.category == "torneopelea") {

        const savedData = localStorage.getItem('formDataPelea');
        if (savedData) {
          // Convertimos los datos del string de vuelta a un objeto
          const formData = JSON.parse(savedData);

          // Convertir la fecha a un objeto Date
          if (formData.date) {
            formData.date = new Date(formData.date); // Convertimos el string de fecha a Date
          }

          // Cargar los valores en el formulario
          this.myForm.setValue(formData);
        }
      }

    }

    // Detectar el evento de cierre del diálogo
    this.ref.onClose.subscribe(() => {

      if (!this.isSaved) {
        // Guardar los valores del formulario en localStorage
        const formData = this.myForm.value;
        if (this.config.data.category == "torneorts") {

          localStorage.setItem('formDataRTS', JSON.stringify(formData)); // Convertimos a string
        }

        if (this.config.data.category == "torneopelea") {

          localStorage.setItem('formDataPelea', JSON.stringify(formData)); // Convertimos a string
        }

      }
    });
  }

  closeDialog() {
    this.ref.close(); // Cierra el diálogo
  }

  async saveTournament() {
    if (this.myForm.valid) {
      // Si el formulario es válido, procesamos los datos
      const formData = this.myForm.value;


      if (this.isEdit) {
        // Lógica para editar el torneo
        let typeID = this.item.idtorneoRts ? this.item.idtorneoRts : this.item.idtorneopelea
        let response: any = await lastValueFrom(this.adminService.putTorneo(
          this.config.data.category,
          {
            "name": formData.name,
            "date": Utils.convertDateToDMY(formData.date),
            "ubication": formData.location,
            "participantes": formData.participants.join(","),
            "img": formData.urlImg
          },
          typeID

        ));

        if (response.message == "success") {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Actualizado' });

          setTimeout(() => {
            window.location.reload();
          }, 500);
        }

      } else {

        let response: any = await lastValueFrom(this.adminService.postTorneo(
          this.config.data.category,
          {
            "name": formData.name,
            "date": Utils.convertDateToDMY(formData.date),
            "ubication": formData.location,
            "participantes": formData.participants.join(","),
            "img": formData.urlImg
          }

        ));

        if (response.message == "success") {

          if (this.config.data.category == "torneorts") {

            localStorage.removeItem('formDataRTS');
          } else {
            localStorage.removeItem('formDataPelea');

          }
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado' });
         
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
        // Lógica para crear un nuevo torneo
      }
      this.isSaved = true;
      // Aquí podrías llamar a un servicio para guardar los datos
      this.closeDialog(); // Cerrar el diálogo después de guardar
    } else {
      // Aquí puedes mostrar un mensaje o resaltar los errores
    }
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      // Si el formulario es válido, guardar
      this.saveTournament();
    }
  }


}
