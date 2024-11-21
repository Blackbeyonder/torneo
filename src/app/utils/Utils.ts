// src/app/core/utils/utils.ts
import { Router } from '@angular/router';

export class Utils {

  // Método para redirigir a una ruta específica
  static redirectTo(router: Router, route: string): void {
    router.navigate([route]);
  }
}
