import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-add-files-form',
  templateUrl: './add-files-form.component.html',
  styleUrls: ['./add-files-form.component.scss']
})
export class AddFilesFormComponent implements OnInit {

  @ViewChild('file') file: ElementRef | undefined;
  @ViewChild('path') path: ElementRef | undefined;
  @ViewChild('desc') desc: ElementRef | undefined;

  form: FormGroup | any;

  constructor(private formBuilder: FormBuilder,
  private toast: MatSnackBar,
  private http: HttpClient,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  sendForm(){
    let formData = new FormData();
    for(let i = 0; i<this.file?.nativeElement.files.length; i++){
      formData.append("files",this.file?.nativeElement.files[i])
    }
    formData.append("description",this.desc?.nativeElement.value);
    formData.append("additionalPath",this.path?.nativeElement.value);
    formData.append("firstName",this.auth.credentialsData.firstName)
    formData.append("lastName",this.auth.credentialsData.lastName)
    formData.append("userID",this.auth.credentialsData.id)
    this.http.post('http://localhost:8080/createFiles',formData).subscribe(Data =>{
      // @ts-ignore
      if(Data.additionalInformationForClient == null){
        this.toast.open("Files has been successfully uploaded!",'',{panelClass: 'toast-config-success'})
      }
      else{
        this.toast.open("Files hasn't been uploaded!",'',{panelClass: 'toast-config-failure'})
      }
    })
  }

  buildForm(){
    this.form = this.formBuilder.group({
      additionalPath: [''],
      fileDescription: [''],
      file: ['',Validators.required]
    })
  }
}
