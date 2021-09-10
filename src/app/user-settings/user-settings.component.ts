import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Credentials} from "../models/credentials.model";
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../change-password/change-password.component";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  @ViewChild("login") login: ElementRef | undefined;
  @ViewChild("firstName") firstName: ElementRef | undefined;
  @ViewChild("lastName") lastName: ElementRef | undefined;

  // @ts-ignore
  credentials: Credentials;

  constructor(private auth: AuthService,
              private http: HttpClient,
              private toast: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.credentials = this.auth.credentialsData;
  }

  logout(){
    this.auth.logout();
  }

  submitChanges(){
    if(this.login?.nativeElement.value != this.auth.credentialsData.login ||
    this.firstName?.nativeElement.value != this.auth.credentialsData.firstName ||
    this.lastName?.nativeElement.value != this.auth.credentialsData.lastName){
      let userBody = {id:this.credentials.id,login:this.login?.nativeElement.value,firstName:this.firstName?.nativeElement.value,lastName:this.lastName?.nativeElement.value}
      this.http.put("http://localhost:8080/editUser",userBody).subscribe(data =>{
        if(data){
          this.auth.setCredentials(JSON.parse(JSON.stringify(data)));
          this.credentials = this.auth.credentialsData;
          this.toast.open("Changes saved!",'',{panelClass: 'toast-config-success'})
        }
        else{
          this.toast.open("Choose different login!",'',{panelClass: 'toast-config-failure'})
        }
      })
    }
    else{
      this.toast.open("Put some changes first!",'',{panelClass: 'toast-config-failure'})
    }
  }

  changePassword(){
    this.dialog.open(ChangePasswordComponent);
  }

}
