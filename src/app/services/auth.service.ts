import { Injectable } from '@angular/core';
import {Credentials} from "../models/credentials.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  private credentials: Credentials;

  constructor(private http: HttpClient,
              private router: Router,
              private toast: MatSnackBar) { }

  login(login:string,password:string): boolean{
    let obj = {login:login,password:password}
    let url = 'http://localhost:8080/signIn';
    let result = false
    this.http.post(url,obj).subscribe(data =>{
      if(data){
        this.credentials = JSON.parse(JSON.stringify(data));
        this.router.navigateByUrl("/dashboard");
        result = true;
      }
      else{
        this.toast.open("Login or password is incorrect!",'',{panelClass: 'toast-config-failure'})
      }
    })
    return result;
  }

  logout(){
    window.location.reload();
  }

  isLoggedIn(){
    return !!this.credentials;
  }

  get credentialsData(){
    return this.credentials;
  }

  // @ts-ignore
  setCredentials(user: Credentials){
    this.credentials = user;
  }
}
