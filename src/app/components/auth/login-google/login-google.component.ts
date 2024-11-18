import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

declare var window:any;
declare var google:any;
declare var document:any;

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit{

  private clientId=environment.clientId;

constructor(
  private router:Router,
  private service:UsersService,
  private _ngZone:NgZone
){}
ngOnInit(): void {
  window.onGoogleLibraryLoad = () => {
    google.accounts.id.initialize({
      client_id:this.clientId,
      callback:this.handlerCredentialResponse.bind(this),
      auto_select:false,
      cancel_on_tap_outside:true
    });
    google.accounts.id.renderButton(
    document.getElementById("buttonGoogle"),
    {theme:"outline", size:"large", width:300}
    );
    google.accounts.id.prompt((notification:PromptMomentNotification) => {});
  };
}

async handlerCredentialResponse(response:CredentialResponse){
  await this.service.LoginWithGoogle(response.credential).subscribe(
    (x:any) => {
      if (x.isSuccess) {
        localStorage.setItem('token', x.token);
        console.log("token log "+localStorage.getItem('token'));
        this._ngZone.run(()=> {
          this.router.navigate(['/logout']);
        })
      }
   },
    (error:any) => {
      console.log(error);
    }
  )

}
}
