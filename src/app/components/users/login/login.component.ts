import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login_model';
import { Response } from 'src/app/models/reponse_model';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';
import { UsersService } from 'src/app/services/users.service';
import { ErrorStateMatcher1 } from 'src/app/error-state-matcher1';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {
  formLogin: FormGroup;
  subRef$?: Subscription;
  matcher = new ErrorStateMatcher1();
  scrHeight: any;
  scrWidth: any;


  // HostListener: https://angular.io/api/core/HostListener
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private dataService: UsersService,
    private securityService: SecurityService
  ) {
    this.getScreenSize();
    this.securityService.LogOff();

    this.formLogin = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


Login() {
    const userLogin: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

    console.log(userLogin);
    this.subRef$ = this.dataService.login<Response>(userLogin)
      .subscribe({
        next: (res) => {

          const token = res.body!.response;
          console.log('token', token);
          //this.securityService.SetAuthData(token);
          sessionStorage.setItem('token', token);

          console.log("islogging "+this.dataService.isLoggedInUser());
           this.router.navigate(['list']);
        },
        error:(response) =>{
          console.log(response);
        },
});
  }

  hasError(nombreControl: string, validacion: string) {
    const control = this.formLogin.get(nombreControl);
    return control?.hasError(validacion);
  }

  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }


}
