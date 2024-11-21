import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Events } from 'src/app/models/tournaments';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {



  tournaments: Events = { rts: [], pelea: [] };

  constructor(private homeService: HomeService){}

  ngOnInit(): void {
    this.getTournaments();
   
   
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

}
