import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  users: any[] = []; // Lista de usuarios
  myForm: FormGroup;

  // Variables que estarán enlazadas con ngModel
  firstName: string = '';
  lastName: string = '';
  userEmail: string = '';

  messageToChild: string = 'Hola desde el padre!';
  messageFromChild: string = '';

  constructor(private userService: UserService, private fb: FormBuilder) { //Inyeccion siempre en privado
     this.myForm = this.fb.group({
      name: ['', Validators.required],  // Campo 'name' obligatorio
      email: ['', [Validators.required, Validators.email]]  // Campo 'email' obligatorio y formato válido
    });
  } 

  ngOnInit(): void {
    this.getUsers(); // Cargar usuarios al iniciar
   
  }

// Método para obtener usuarios usando lastValueFrom en una sola línea
async getUsers(): Promise<void> {
  try {
    // Usamos lastValueFrom directamente en la asignación de this.users
    this.users = await lastValueFrom(this.userService.getUsers()); // Convertimos Observable a Promesa y esperamos
    console.log('Usuarios:', this.users);  // Mostrar los usuarios en consola
  } catch (error) {
    console.error('Error al obtener usuarios:', error);  // Manejar el error si ocurre
  } 
}

  // Función para manejar el envío del formulario
  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Formulario válido:', this.myForm.value);
    } else {
      console.log('Formulario no válido');
      this.myForm.markAllAsTouched();  // Marca todos los campos como tocados para mostrar los errores
    }
  }

   // Método para manejar el envío del formulario
  onSubmit2() {
    if (this.firstName && this.lastName && this.userEmail) {
      console.log('Formulario enviado correctamente:', { firstName: this.firstName, lastName: this.lastName, userEmail: this.userEmail });
    } else {
      console.log('Formulario con errores');
    }
  }

  handleChildMessage(message: string) {
    this.messageFromChild = message;
  }


}
