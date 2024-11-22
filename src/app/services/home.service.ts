import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ApiResponse } from '../models/apiResponse';
import { Events } from '../models/tournaments';
@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }

    // Obtener lista de usuarios
    getBanners(): Observable<string[]> {
      return this.http.get<string[]>('/assets/BannerImages.json');
    }

    getTournaments(): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(environment.apiUrl+"all");
    }
}
