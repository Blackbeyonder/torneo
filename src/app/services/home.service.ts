import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }

    // Obtener lista de usuarios
    getBanners(): Observable<any[]> {
      return this.http.get<any[]>("https://monou.gg/assets/json/banners.json");
    }
}
