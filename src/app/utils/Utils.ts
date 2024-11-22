// src/app/core/utils/utils.ts
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { Torneo } from '../models/torneo';
import { HomeService } from '../services/home.service';

export class Utils {

  // Método para redirigir a una ruta específica
  static redirectTo(router: Router, route: string): void {
    router.navigate([route]);
  }

  static convertDateToDMY(dateString: string): string {
    const date = new Date(dateString);  // Convierte el string a un objeto Date
    
    // Obtenemos el día, el mes y el año
    const day = date.getDate().toString().padStart(2, '0');  // Aseguramos que tenga dos dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes es 0-indexed, así que sumamos 1
    const year = date.getFullYear().toString().slice(-2);  // Tomamos los últimos 2 dígitos del año
    
    // Formato final "día/mes/año"
    return `${day}/${month}/${year}`;
  }
  
  


}

export async function getTournaments(homeService: HomeService): Promise<{ rts: Torneo[], pelea: Torneo[] }> {
  try {
    // Usamos lastValueFrom directamente en la asignación de response
    const response: ApiResponse<{ rts: Torneo[], pelea: Torneo[] }> = await lastValueFrom(homeService.getTournaments());
    
    // Asignamos los datos recibidos y aseguramos que no estén vacíos
    return {
      rts: response.data.rts || [],  // Si `rts` no existe, se asigna un array vacío
      pelea: response.data.pelea || []  // Lo mismo para `pelea`
    };
  } catch (error) {
    console.error('Error al obtener tournaments:', error);  // Manejar el error si ocurre
    // Devuelve objetos vacíos en caso de error
    return { rts: [], pelea: [] };  
  }
}
