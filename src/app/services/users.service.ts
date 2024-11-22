import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly endpoint = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  // Obtener lista de usuarios
  // getlogin(): Observable<any[]> {
  //   return this.http.get<any[]>(this.endpoint);
  // }

  getlogin(username: string, password: string): Observable<Login> {
    const body = {
      name: username,
      pass: password
    };
  
    return this.http.post<Login>(environment.apiUrl + "users/login", body);
  }
  

}