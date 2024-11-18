import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user_model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { endpoint } from 'src/shared/api/endpoint';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private enviroment:string=environment.apiUrl;
  private apiURL:string=this.enviroment+"/api/User/";
  private apiURL1:string=this.enviroment;
  private isLoggedIn = false;


  constructor(private http:HttpClient) { }


  //Get User
  GetAllUser() : Observable<User[]> {
    const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.get<User[]>(`${this.apiURL}GetUser`,{ headers: httpHeaders

    });
  }

  getUserId(id:number):Observable<any>{
    return this.http.get<User[]>(`${this.apiURL}GetUser`+id);
  }

  //Post User
  insertUser(user:User ):Observable<any>{
    user.idUser=0;
     const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.post(`${this.apiURL}insertUser`, user, {headers: httpHeaders})
  }

  //Update User
  updatetUser(id:number, user:User):Observable<any>{
    const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.put(`${this.apiURL}UpdateUser`+id,user,
    {
      headers: httpHeaders,
      responseType: 'text'
    })
  }

  //Delete User
  delete<T>(id: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.delete<T>(`${this.apiURL}DeleteUser`+id,
      {
        headers: httpHeaders,
        observe: 'response'
      });
  }
  //Login
login<T>(data: any): Observable<HttpResponse<T>> {
  const httpHeaders: HttpHeaders = this.getHeaders();
  this.isLoggedIn = true;

   return this.http.post<T>(`${this.apiURL}loginJWT`, data,
    {
      headers: httpHeaders,
      params:data,
      observe: 'response'
    });


}
getHeaders(): HttpHeaders {
  let httpHeaders: HttpHeaders = new HttpHeaders();
  var token =sessionStorage.getItem('token');;
  if (token) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

  return httpHeaders;
}

logout() {
  sessionStorage.removeItem('token');
  this.isLoggedIn = false;
}
isLoggedInUser(): boolean {
  return this.isLoggedIn;
}

public signOutExternal = () => {
  localStorage.removeItem('token');
  console.log("token deleted")
}

LoginWithGoogle<T>(credentials: any):Observable<any> {
  const url= `${this.apiURL1}${endpoint.LOGIN_GOOGLE}`
  const header =new HttpHeaders().set('Content-Type', 'application/json');
  //return this.http.post(`${this.apiURL1}LoginWithGoogle`, JSON.stringify(credentials), {headers: header}).pipe(
    return this.http.post(`${this.apiURL1}LoginWithGoogle`, JSON.stringify(credentials), {headers: header}).pipe(
      map((resp:any) => {
        if (resp.isSuccess) {
          localStorage.setItem("token",JSON.stringify(resp.data));
          console.log(localStorage.getItem("token"));
        }
        return resp;
      }))
}



}
