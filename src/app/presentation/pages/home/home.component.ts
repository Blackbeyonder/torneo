import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../../services/users.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from 'src/app/services/home.service';
import { Events } from 'src/app/models/tournaments';
import { Router } from '@angular/router';
import { Torneos } from 'src/app/models/torneos';
import { ApiResponse } from 'src/app/models/apiResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  users: any[] = []; // Lista de usuarios
  myForm: FormGroup;

  images: string[] =[];


  tournaments: Torneos ={pelea:[],rts:[]}; 
  apiResponse: ApiResponse = {data:{pelea:[],rts:[]},message:"" };


    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 1
        },
        940: {
          items: 1
        }
      },
      items:1,
      autoplay:true
    }

    customOptions2: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 3
        }
      },
      autoplay:false
    }



  constructor(private userService: UserService, private fb: FormBuilder, private homeService: HomeService, private router: Router ) { //Inyeccion siempre en privado
     this.myForm = this.fb.group({
      name: ['', Validators.required],  // Campo 'name' obligatorio
      email: ['', [Validators.required, Validators.email]]  // Campo 'email' obligatorio y formato válido
    });
  } 

  ngOnInit(): void {
    // this.getUsers(); // Cargar usuarios al iniciar
    this.getBanners();
    this.getTournaments();
   
   
  }

// Método para obtener usuarios usando lastValueFrom en una sola línea
async getUsers(): Promise<void> {
  try {
    // Usamos lastValueFrom directamente en la asignación de this.users
    this.users = await lastValueFrom(this.userService.getUsers()); // Convertimos Observable a Promesa y esperamos
    
  } catch (error) {
    this.users=[];
    console.error('Error al obtener usuarios:', error);  // Manejar el error si ocurre
  } 
}

async getBanners(): Promise<void> {
  try {
    // Usamos lastValueFrom directamente en la asignación de this.users
    this.images = await lastValueFrom(this.homeService.getBanners()); // Convertimos Observable a Promesa y esperamos
    
  } catch (error) {
    this.images=[];
    console.error('Error al obtener images:', error);  // Manejar el error si ocurre
  } 
}

async getTournaments(): Promise<void> {
  try {
    // Usamos lastValueFrom directamente en la asignación de this.users
    let response: ApiResponse = await lastValueFrom(this.homeService.getTournaments());
    // Asignamos los datos recibidos a `tournaments`
    this.tournaments = {
      rts: response.data.rts || [], // Si `rts` no existe, se asigna un array vacío
      pelea: response.data.pelea || [] // Lo mismo para `Pelea`
    };
  
  } catch (error) {
    this.tournaments = { rts: [], pelea: [] }; // Estructura válida
    console.error('Error al obtener tournaments:', error);  // Manejar el error si ocurre
  } 
}



goToDetail(category: string ,id: number): void {
  this.router.navigate([category+'/detalle', id]);  // Navegar pasando el parámetro `id`
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

 

}
