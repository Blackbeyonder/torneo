import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../models/tournaments';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }

    // Obtener lista de usuarios
    getBanners(): Observable<any[]> {
      return this.http.get<any[]>('/assets/BannerImages.json');
    }

    getTournaments(): Observable<Events> {
      return this.http.get<Events>('/assets/Tournaments.json');
    }
}
