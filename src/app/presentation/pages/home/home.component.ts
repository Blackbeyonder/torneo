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
import { Torneo } from 'src/app/models/torneo';
import { getTournaments } from 'src/app/utils/Utils';

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
  rtsTorneos: Torneo[] = [];
  peleaTorneos: Torneo[] = [];


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
    this.setTournaments();
   
   
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

async setTournaments(): Promise<void> {
  this.tournaments = await getTournaments(this.homeService); 
}



goToDetail(category: string ,id: number): void {
  this.router.navigate([category+'/detalle', id]);  // Navegar pasando el parámetro `id`
}


 

}
