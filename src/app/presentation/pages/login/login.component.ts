import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Login } from 'src/app/models/login';
import { UserService } from 'src/app/services/users.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService :UserService, private router: Router) {
    // Crear formulario con validadores estándar
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      let raw= this.loginForm.getRawValue();
      
     let response: Login = await lastValueFrom(this.userService.getlogin(raw.user,raw.password)); // Convertimos Observable a Promesa y esperamos
     if(response.success && response.success==true){
      localStorage.setItem('user', JSON.stringify(response.data)); // Guarda los datos del usuario como JSON
      localStorage.setItem('token', response.token); // Guarda el token
      Utils.redirectTo(this.router,"admin");
     }
    } else {
      console.log('Formulario inválido');
    }
  }

}
