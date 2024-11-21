export interface tournaments {
    id: number;         
    name: string;         // Nombre del evento
    date: string;         // Fecha del evento
    ubication: string;    // Ubicación del evento
    Participantes: string[]; // Lista de participantes
    img: string;          // URL de la imagen
  }
  
  export interface Events {
    rts: tournaments[];        // Lista de eventos de tipo RTS
    pelea: tournaments[];      // Lista de eventos de tipo Pelea
  }
  