import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'/home/dashboard',pathMatch:"full"},
  {
    path:'home',canActivate:[AuthGuardGuard],component:HomeComponent,children:
  [
    {path:'dashboard',component:DashboardComponent},
    {path:'add-new-task',component:AddNewTaskComponent},
    {path:'update-task/:id',component:AddNewTaskComponent}
  ]
},
{
  path:'login',component:LoginComponent
},
{path:'sign-up',component:SignUpComponent},
{path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
