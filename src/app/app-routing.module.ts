import { ImportantComponent } from './important/important.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LogoutComponent } from './logout/logout.component';
import{AuthGuardGuard} from'./auth-guard.guard'
import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';
import { SerachComponent } from './serach/serach.component';



const routes: Routes = [
  {path:'' , redirectTo:'login', pathMatch:'full'},
  {path:'dashboard', component: DashboardComponent ,  canActivate:[AuthGuardGuard],
  children: [
    // {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'create', component: CreateComponent },
    {path:'delete', component: DeleteComponent},
    {path:'important' ,component:ImportantComponent},
    {path:'search', component: SerachComponent},
    {path:'logout', component: LogoutComponent},
  ]},
  
  {path:'login', component: LoginComponent},
  {path:'**',component:ErrorPageComponent }
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
