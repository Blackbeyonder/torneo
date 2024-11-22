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
