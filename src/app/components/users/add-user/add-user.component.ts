import { Component, OnInit} from '@angular/core';

import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/models/user_model';
import { UsersService } from 'src/app/services/users.service';
import { formatDate } from "@angular/common";
import { HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']

 })

export class AddUserComponent implements OnInit {
  myForm!: FormGroup;
  public idUser!:any;
  editMode: boolean = false;
  ignoreExistPendingChanges: boolean = false;

  subRef$?: Subscription;

   newuser: User = {
    idUser:0,
    id_Card:'',
    username:'',
    password:'',
    role:'',
    names:'',
    phone:'',
    email:'',
    city:'',
    registration_date: '',
   };

  // date = new FormControl(new Date());


   format = 'MM/dd/yyyy HH:mm:ss';
   locale = 'en-US';
   formattedDate = formatDate(new Date(), this.format, this.locale);




  constructor(private userService: UsersService, private router:Router, private activatedRoute: ActivatedRoute){

  }

existenCambiosPendientes(): boolean {
  if (this.ignoreExistPendingChanges) { return false; };
  return !this.myForm.pristine;
}

  ngOnInit(): void {
this.newuser.registration_date= this.formattedDate;
this.myForm = new FormGroup({
  id_Card: new FormControl('', Validators.required ),
  username: new FormControl('', Validators.required ),
  password: new FormControl('', Validators.required ),
  role: new FormControl('', Validators.required ),
  names: new FormControl('', Validators.required ),
  phone: new FormControl('', Validators.required ),
  email: new FormControl('', Validators.required ),
  city: new FormControl('', Validators.required ),
  registration_date: new FormControl('', Validators.required )
});

this.idUser=this.activatedRoute.snapshot.paramMap.get('idUser');

  if (this.idUser == undefined) {
    return;
  }
  this.editMode = true;
  this.userService.getUserId(this.idUser).subscribe(data => {
    console.log("getuserid"+data);
    this.newuser=data;

  });
  }

 addUser(){
    this.ignoreExistPendingChanges = true;
if (this.editMode) {
  var updateuser= {
    idUser:this.newuser.idUser,
    id_Card:this.newuser.id_Card,
    username:this.newuser.username,
    password:this.newuser.password,
    role:this.newuser.role,
    names:this.newuser.names,
    phone:this.newuser.phone,
    email:this.newuser.email,
    city:this.newuser.city,
    registration_date:this.newuser.registration_date
  };
  let httpHeaders: HttpHeaders=new HttpHeaders();
  var token =sessionStorage.getItem('token');
  httpHeaders = httpHeaders.append('Authorization','Bearer'+token);
  this.subRef$ = this.userService.updatetUser(this.idUser,updateuser)
      .subscribe({
        next:(user) => {
          console.log('get token', token, "id "+this.idUser);
        this.router.navigate(['list']);

      },
      error:(response) =>{
        console.log(response);
      },});
}else{
  let httpHeaders: HttpHeaders=new HttpHeaders();
  var token =sessionStorage.getItem('token');
  console.log('get token', token);
  httpHeaders = httpHeaders.append('Authorization','Bearer'+token);
  console.log('get http', httpHeaders);
  console.log(this.newuser);
  this.userService.insertUser(this.newuser)
.subscribe({
  next: (user) => {
    console.log(user);
    this.router.navigate(['list'])
  },
  error:(response) =>{
    console.log(response);
  },

})}

  }

  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }
}



