import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../validators/MustMatch";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('inputLogin') inputLogin: ElementRef | undefined;
  @ViewChild('inputName') inputName: ElementRef | undefined;
  @ViewChild('inputLName') inputLName: ElementRef | undefined;
  @ViewChild('inputPass') inputPass: ElementRef | undefined;

  form: FormGroup | any;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private toast: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  register(){
    let user = {login: this.inputLogin?.nativeElement.value,
                firstName: this.inputName?.nativeElement.value,
                lastName:this.inputLName?.nativeElement.value,
                password:this.inputPass?.nativeElement.value};
    let url = 'http://localhost:8080/createUser';
    this.http.post(url,user).subscribe(data =>{
      let obj = data;
      // @ts-ignore
      if(obj == true){
        this.toast.open("Account has been created! ",'',{panelClass: 'toast-config-success'})
        this.router.navigateByUrl("/login");
      }
        // @ts-ignore
        if(obj == false){
          this.toast.open("Login taken choose other one!",'',{panelClass: 'toast-config-failure'})
        }
    })
  }

  buildForm(){
    this.form = this.formBuilder.group({
      inputLogin: ['',Validators.required],
      inputName: ['',Validators.required],
      inputLName: ['',Validators.required],
      inputPass: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      inputRepeatPassword: ['',Validators.required],
    },{
      validator: MustMatch('inputPass','inputRepeatPassword'),
    });
  }
}
