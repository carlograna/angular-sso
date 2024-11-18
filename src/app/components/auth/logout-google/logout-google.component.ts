import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-logout-google',
  templateUrl: './logout-google.component.html',
  styleUrls: ['./logout-google.component.css']
})
export class LogoutGoogleComponent implements OnInit {

  constructor(
    private  router:Router,
    private service:UsersService,
    private _ngZone:NgZone
  ){}
  ngOnInit(): void {

  }
  public logout(){
    this.service.signOutExternal();
    this._ngZone.run(()=> {
      this.router.navigate(['/']).then(() => window.location.reload)
    })
  }
}
