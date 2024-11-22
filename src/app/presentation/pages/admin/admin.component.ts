import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Events } from 'src/app/models/tournaments';
import { HomeService } from 'src/app/services/home.service';
import { Table } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {



  tournaments: Events = { rts: [], pelea: [] };
  @ViewChild('dt1') dt1!: Table;
  // Valor del filtro que se muestra en el input
  searchText: string = '';

  constructor(private homeService: HomeService, private dialogService: DialogService){}

  ngOnInit(): void {
    this.getTournaments();
   
   
   
  }

  ngAfterViewInit(): void {
    // Aplica el filtro al inicializar la vista
    if (this.dt1) {
      this.dt1.filterGlobal(this.searchText, 'contains');
    }
  }

  async getTournaments(): Promise<void> {
    try {
      // Usamos lastValueFrom directamente en la asignación de this.users
      let response: Events = await lastValueFrom(this.homeService.getTournaments());
      // Asignamos los datos recibidos a `tournaments`
      this.tournaments = {
        rts: response.rts || [], // Si `rts` no existe, se asigna un array vacío
        pelea: response.pelea || [] // Lo mismo para `Pelea`
      };
    
    } catch (error) {
      this.tournaments = { rts: [], pelea: [] }; // Estructura válida
      console.error('Error al obtener tournaments:', error);  // Manejar el error si ocurre
    } 
  }

  onFilterGlobal(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt1.filterGlobal(input.value, 'contains');
  }

  showDialog(isEdit: boolean, item:any={}) {
    this.dialogService.open(DialogComponent, {
      header: isEdit ? 'Editar Torneo' : 'Crear Torneo',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        isEdit,   
        item:item  
      }
    });
  }

}
