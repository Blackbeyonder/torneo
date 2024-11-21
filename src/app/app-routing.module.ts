import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './presentation/pages/detail/detail.component';
import { HomeComponent } from './presentation/pages/home/home.component';
import { LoginComponent } from './presentation/pages/login/login.component';


//Todas las rutas
const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: ':category/detalle/:id', component: DetailComponent }  ,
  { path: 'login', component: LoginComponent }  ,
  { path: '**', redirectTo: '' }  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
