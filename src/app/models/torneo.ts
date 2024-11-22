// src/app/models/torneo.model.ts

export class Torneo {
    idtorneoRts: number;
    idtorneopelea:number;
    name: string;
    date: string;
    ubication: string;
    participantes: string;
    img: string;
  
    constructor(
        idtorneoRts: number = 0,           // Valor por defecto 0
        idtorneopelea: number = 0,  
        name: string = '',                 // Valor por defecto vacío
        date: string = '',                 // Valor por defecto vacío
        ubication: string = '',            // Valor por defecto vacío
        participantes: string = '',       // Valor por defecto vacío
        img: string = ''
    ) {
      this.idtorneoRts = idtorneoRts;
      this.idtorneopelea = idtorneopelea;
      this.name = name;
      this.date = date;
      this.ubication = ubication;
      this.participantes = participantes;
      this.img = img;
    }
  }
  