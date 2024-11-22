export interface UserData {
    id: number;
    firstname: string;
    lastname: string;
  }
  
  export interface Login {
    data: UserData;  // Datos del usuario
    token: string;   // Token de autenticación
    success: boolean; // Si la operación fue exitosa
  }
  