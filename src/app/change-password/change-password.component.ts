import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../validators/MustMatch";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('oldPassword') oldPass: ElementRef | undefined;
  @ViewChild('newPassword') newPass: ElementRef | undefined;
  form: FormGroup | any;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private auth: AuthService,
              private toast: MatSnackBar) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      actualPassword:['',Validators.required],
      newPassword:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      repeatPassword:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]]
    },{
      validator: MustMatch('newPassword','repeatPassword')
    });
  }

  changePassword(){
    let url = "http://localhost:8080/changePassword?id=" + this.auth.credentialsData.id +
      "&oldPassword=" + this.oldPass?.nativeElement.value +
      "&newPassword=" + this.newPass?.nativeElement.value;
    this.http.put(url,null).subscribe(data =>{
      if(data){
        this.auth.setCredentials(JSON.parse(JSON.stringify(data)));
        this.toast.open("Password changed!",'',{panelClass: 'toast-config-success'})
      }
      else{
        this.toast.open("Bad password!",'',{panelClass: 'toast-config-failure'})
      }
      }
    )
  }
}
