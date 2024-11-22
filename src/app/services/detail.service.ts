import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ApiResponse } from '../models/apiResponse';
import { Torneo } from '../models/torneo';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient) { }



  getDetail(category: string, id: number): Observable<ApiResponse<Torneo>> {
    return this.http.get<ApiResponse<Torneo>>(`${environment.apiUrl}${category}/${id}`);
  }
  
}
