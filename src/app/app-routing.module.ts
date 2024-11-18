import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { LoginComponent } from './components/users/login/login.component';
import { LoginGoogleComponent } from './components/auth/login-google/login-google.component';
import { LogoutGoogleComponent } from './components/auth/logout-google/logout-google.component';


const routes: Routes = [
  //
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'list',
    component:UsersListComponent
  },
  {
    path:'logout',
    component:LogoutGoogleComponent
  },
  {
    path:'addUser',
    component: AddUserComponent
  },
  {
    path:'list/users/editUser1/:idUser',
    component: AddUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
