import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
// import {MomentDateModule} from '@angular/material-moment-adapter';

import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { AddUserComponent } from './components/users/add-user/add-user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

import {MatDividerModule} from '@angular/material/divider';


import * as _moment from 'moment';


import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
import { InteractionType } from '@azure/msal-browser';
import { UsersService } from './services/users.service';
import { LogoutGoogleComponent } from './components/auth/logout-google/logout-google.component';
import { RouterModule } from '@angular/router';
import { LoginGoogleComponent } from './components/auth/login-google/login-google.component';
import { LoginComponent } from './components/users/login/login.component';

const isIE=window.navigator.userAgent.indexOf('MSIE')>-1
||window.navigator.userAgent.indexOf('Trident/')>-1
@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    AddUserComponent,
    LoginComponent,
    LoginGoogleComponent,
    LogoutGoogleComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    RouterModule.forRoot([
      {path: "", component:LoginGoogleComponent, pathMatch:"full"},
      {path: 'logout',component:LogoutGoogleComponent}
    ]),
    //agregue eesto
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth:{
            clientId:'',
            redirectUri:'https://www.apiappnet.somee.com/api/User/GetUser',
            authority:'https://login.microsoftonline.com/tenantId'
          },
          cache:
          {
            cacheLocation:'localStorage',
            storeAuthStateInCookie:isIE
          }
        }
      ),
      {
        interactionType:InteractionType.Redirect,
        authRequest:{
          scopes:['user.read']
        }
      },
      {
        interactionType:InteractionType.Redirect,
        protectedResourceMap:new Map(
          [
            ['https://graph.microsoft.com/v1.0/me',['user.Read']],
            ['localhost',['api://apiUri/api.scope']]
          ]
        )
      }
      )
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true
  },MsalGuard,UsersService],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
