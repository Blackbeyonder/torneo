import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly endpoint = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  // Obtener lista de usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint);
  }

}