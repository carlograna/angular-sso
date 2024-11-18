import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsersService } from './services/users.service';
import { Router } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontedAppAngular';
  public isUserLoggedIn:boolean=false;

  constructor(private authService: UsersService, private router:Router) {
    if (this.authService.isLoggedInUser()) {
      this.isUserLoggedIn=this.authService.isLoggedInUser();
      console.log("isUserLoggedIn "+ this.isUserLoggedIn);
    }
  }

  public setIsUserLoggedIn(IsUserLoggedIn:boolean){
  this.isUserLoggedIn=IsUserLoggedIn;
  }
ngOnInit(): void {
if (this.authService.isLoggedInUser()) {
  this.isUserLoggedIn=this.authService.isLoggedInUser();
  console.log("isUserLoggedIn "+ this.isUserLoggedIn);
}

}
login(){}

logout() {
    this.authService.logout();
    this.router.navigate(['']);
    this.isUserLoggedIn=false;
  }

  ngAfterViewInit() {
    this.isUserLoggedIn=this.authService.isLoggedInUser();
  }
}
