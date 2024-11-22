import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Events } from 'src/app/models/tournaments';
import { HomeService } from 'src/app/services/home.service';
import { Table } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Torneos } from 'src/app/models/torneos';
import { ApiResponse } from 'src/app/models/apiResponse';
import { Torneo } from 'src/app/models/torneo';
import { getTournaments, Utils } from 'src/app/utils/Utils';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {



  tournaments: Torneos = { pelea: [], rts: [] };
  @ViewChild('dt1') dt1!: Table;
  @ViewChild('dt2') dt2!: Table;
  // Valor del filtro que se muestra en el input
  searchText: string = '';
  searchText2: string = '';

  participantes:string[]=[];

  constructor(private homeService: HomeService, private dialogService: DialogService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.setTournaments();



  }

  ngAfterViewInit(): void {
    // Aplica el filtro al inicializar la vista
    if (this.dt1) {
      this.dt1.filterGlobal(this.searchText, 'contains');
    }

    if (this.dt2) {
      this.dt2.filterGlobal(this.searchText2, 'contains');
    }
  }

  async setTournaments(): Promise<void> {
    this.tournaments = await getTournaments(this.homeService);
    console.log(this.tournaments);
    
  }

  onFilterGlobal(table: number, event: Event): void {
    if (table == 1) {
      const input = event.target as HTMLInputElement;
      this.dt1.filterGlobal(input.value, 'contains');

    }

    if (table == 2) {
      const input = event.target as HTMLInputElement;
      this.dt2.filterGlobal(input.value, 'contains');

    }

  }



  showDialog(params: { isEdit: boolean, item?: any, category: string }) {
    this.dialogService.open(DialogComponent, {
      header: params.isEdit ? 'Editar Torneo' : 'Crear Torneo',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        isEdit: params.isEdit,
        item: params.item,
        category: params.category,
      }
    });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Utils.redirectTo(this.router, "/");
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Quieres borrarlo?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'error', summary: 'Confirmed', detail: 'borrado' });
        },
        reject: () => {
            this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'Lo haz rechazado' });
        }
    });
}
}
