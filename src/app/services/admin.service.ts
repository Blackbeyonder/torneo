import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}


  postTorneo(category:string , params:any): Observable<any> {
  
  
    return this.http.post<any>(environment.apiUrl + "torneo/"+category, params);
  }
  
}
