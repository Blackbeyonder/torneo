import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { PasswordModule } from 'primeng/password';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog'; // Asegúrate de importar DialogService
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
@NgModule({
  imports: [
    ButtonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    GalleriaModule,
    PasswordModule,
    DialogModule,
    DynamicDialogModule,
    CalendarModule,
    ChipsModule,
    ConfirmPopupModule,
    ToastModule,
    ImageModule
  ],
  exports: [
    ButtonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    GalleriaModule,
    PasswordModule,
    DialogModule,
    DynamicDialogModule,
    CalendarModule,
    ChipsModule,
    ConfirmPopupModule,
    ToastModule,
    ImageModule
  ],
  providers: [DialogService, ConfirmationService, MessageService],  // Agrega DialogService aquí
})
export class PrimeNgModule {}
