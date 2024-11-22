import { Component, Input } from '@angular/core';
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
  displayErrorDialog: boolean = false;

  constructor(private fb: FormBuilder, private userService :UserService, private router: Router) {
    // Crear formulario con validadores estándar
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      let raw = this.loginForm.getRawValue();
      
      try {
        // Convertimos Observable a Promesa y esperamos
        let response: Login = await lastValueFrom(this.userService.getlogin(raw.user, raw.password));
        
        if (response.success && response.success === true) {
          // Guarda los datos del usuario como JSON
          localStorage.setItem('user', JSON.stringify(response.data));
          // Guarda el token
          localStorage.setItem('token', response.token);
          // Redirige al panel de admin
          Utils.redirectTo(this.router, "admin");
        } else {
          // Si no es exitoso, muestra el modal de error
          this.displayErrorDialog = true;
        }
      } catch (error) {
        // Si ocurre un error, muestra el modal de error
        this.displayErrorDialog = true;
        console.error('Error al iniciar sesión:', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

}
