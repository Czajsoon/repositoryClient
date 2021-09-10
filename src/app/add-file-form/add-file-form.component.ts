import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-add-file-form',
  templateUrl: './add-file-form.component.html',
  styleUrls: ['./add-file-form.component.scss']
})
export class AddFileFormComponent implements OnInit {

  // @ts-ignore
  @ViewChild('file') file: ElementRef;
  @ViewChild('fileName') fileName: ElementRef | undefined;
  @ViewChild('fileDescription') fileDescription: ElementRef | undefined;
  @ViewChild('fileFormat') fileFormat: ElementRef | undefined;
  @ViewChild('additionalPath') additionalPath: ElementRef | undefined;

  form: FormGroup | any;

  constructor(private formBuilder: FormBuilder,
              private toast: MatSnackBar,
              private http: HttpClient,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  sendForm() {
    let formData = new FormData();
    formData.append("fileName",this.fileName?.nativeElement.value);
    formData.append("description",this.fileDescription?.nativeElement.value);
    formData.append("format",this.fileFormat?.nativeElement.value);
    formData.append("file",this.file.nativeElement.files[0]);
    formData.append("additionalPath",this.additionalPath?.nativeElement.value);
    formData.append("firstName",this.auth.credentialsData.firstName)
    formData.append("lastName",this.auth.credentialsData.lastName)
    formData.append("userID",this.auth.credentialsData.id)
    this.http.post('http://localhost:8080/createFile',formData).subscribe(data =>{
      if(data != null){
        // @ts-ignore
        if(data.additionalInformationForClient)
          { // @ts-ignore
            this.toast.open("File has been successfully uploaded! " + data.additionalInformationForClient,'',{panelClass: 'toast-config-success'})
          }
        else{
          this.toast.open("File has been successfully uploaded! ",'',{panelClass: 'toast-config-success'})
        }
      }
      else{
        this.toast.open("File hasn't been uploaded!",'',{panelClass: 'toast-config-failure'})
      }
    });
  }


  buildForm(){
    this.form = this.formBuilder.group({
      fileName: ['',Validators.required],
      fileDescription: [''],
      fileFormat: [''],
      file: ['',Validators.required],
      additionalPath: ['']
    })
  }

}
