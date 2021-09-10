import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('inputLogin') inputLogin: ElementRef | undefined;
  @ViewChild('inputPassword') inputPassword: ElementRef | undefined;

  form: FormGroup | any;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private toast: MatSnackBar,
              private auth:AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  login(){
    this.auth.login(this.inputLogin?.nativeElement.value,this.inputPassword?.nativeElement.value);
  }

  buildForm(){
    this.form = this.formBuilder.group({
      inputLogin: ['',Validators.required],
      inputPassword: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]]
    });
  }
}
