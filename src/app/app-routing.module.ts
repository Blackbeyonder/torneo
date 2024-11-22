import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './presentation/pages/admin/admin.component';
import { DetailComponent } from './presentation/pages/detail/detail.component';
import { HomeComponent } from './presentation/pages/home/home.component';
import { LoginComponent } from './presentation/pages/login/login.component';


//Todas las rutas
const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: ':category/detalle/:id', component: DetailComponent }  ,
  { path: 'login', component: LoginComponent }  ,
  { path: 'admin', component: AdminComponent , canActivate: [AuthGuard]}  ,
  { path: '**', redirectTo: '' }  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
