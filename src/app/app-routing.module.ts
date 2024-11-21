import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './presentation/pages/detail/detail.component';
import { HomeComponent } from './presentation/pages/home/home.component';


//Todas las rutas
const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: ':category/detalle/:id', component: DetailComponent }  ,
  { path: '**', redirectTo: '' }  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
