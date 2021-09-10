import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FileDetailsComponent} from "../file-details/file-details.component";
import {tableFiles} from "../models/fileTable.model";
import {AuthService} from "../services/auth.service";
import {Credentials} from "../models/credentials.model";
import {AddAccessPermisionComponent} from "../add-access-permision/add-access-permision.component";


let ELEMENT_DATA: tableFiles[] = [
];


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @ViewChild('fileID') fileID: ElementRef | undefined;
  @ViewChild('fileName') fileName: ElementRef | undefined;
  @ViewChild('fileFormat') fileFormat: ElementRef | undefined;
  @ViewChild('directory') fileDir: ElementRef | undefined;
  @ViewChild('AdminFileID') adminFileID: ElementRef | undefined;

  dataToDisplay = [...ELEMENT_DATA];
  displayedColumns: string[] = ['FileName', 'FileType', 'id', 'preview','Details','download','Access','Delete'];
  response: any;
  // @ts-ignore
  user: Credentials;

  constructor(private http: HttpClient,
              private toast: MatSnackBar,
              private dialog: MatDialog,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.getRepository();
    this.user = this.auth.credentialsData;
  }

  openAccessPrivilege(element:any){
    this.dialog.open(AddAccessPermisionComponent,{
      data:{
        data: element.object
      }
    });
  }

  getIdFile(){
    let url = 'http://localhost:8080/adminGetIdFile/' + this.adminFileID?.nativeElement.value;
    if(this.adminFileID?.nativeElement.value != ""){
      this.http.get(url).subscribe(data =>{
        console.log(data);
        this.response = data;
        if(data){
          this.updateTable(this.response);
        }
        else{
          this.toast.open("No such file!", '', {panelClass: 'toast-config-failure'})
        }
      })
    }
    else{
      this.toast.open("Input ID!", '', {panelClass: 'toast-config-failure'})
    }
  }

  getAllFiles(){
    let url = 'http://localhost:8080/adminAllFiles';
    this.http.get(url).subscribe(data =>{
      this.response = data;
      if(data){
        this.updateTable(this.response.list);
      }
    })
  }

  updateTable(response: any){
    this.dataToDisplay = [];
    for(let i =0;i<this.response.length;i++){
      this.dataToDisplay = [...this.dataToDisplay,{
        FileName:this.response[i].fileName,
        FileType:this.response[i].fileType,
        id:this.response[i].id,
        preview:this.response[i].path,
        details:'',
        download:this.response[i].id,
        object: this.response[i]
      }]
    }
  }

  getRepository(){
    let url = 'http://localhost:8080/file/' + this.auth.credentialsData.id;
    this.http.get<any>(url).subscribe(data => {
      this.response = data;
      if (data) {
        this.updateTable(this.response);
      }
    });
  }

  goToLink(url: any){
    let newUrl = "http://127.0.0.1:8887/";
    if(url.startsWith("file://")){
      newUrl = newUrl + url.substr(18);
    }
    else{
      newUrl = newUrl + url.substr(10);
    }
    window.open(newUrl);
  }

  deleteFile(id: string){
    let url = 'http://localhost:8080/deleteFile/' + id;
    this.http.delete(url).subscribe(data =>{
      this.response = data;
      if(data){
        this.toast.open("File " + this.response.fileName + " has been deleted!",'',{panelClass: 'toast-config-success'});
      }
      else{
        this.toast.open("File hasn't been deleted! Some error occurred",'',{panelClass: 'toast-config-failure'})
      }
    })
  }

  downloadFile(id: string): void{
    window.open('http://localhost:8080/downloadFile/' + id);
  }

  openDetails(element: any){
    this.dialog.open(FileDetailsComponent,{
      data:{
        data: element.object
      }
    });
  }

  searchFile(){
    let url = "http://localhost:8080/searchFile?";
    let inputElements = 0;
    if(this.fileID?.nativeElement.value != ''){
        url = url + "fileID=" + this.fileID?.nativeElement.value;
        inputElements++;
    }
    if(this.fileDir?.nativeElement.value != ''){
      if(inputElements == 0){
        inputElements++;
        url = url + "dir=" + this.fileDir?.nativeElement.value;
      }
      else
        url = url + "&dir=" + this.fileDir?.nativeElement.value;
    }
    if(this.fileName?.nativeElement.value != ''){
      if(inputElements == 0){
        inputElements++;
        url = url + "fileName=" + this.fileName?.nativeElement.value;
      }
      else
        url = url + "&fileName=" + this.fileName?.nativeElement.value;
    }
    if(this.fileFormat?.nativeElement.value != ''){
      if(inputElements == 0){
        inputElements++;
        url = url + "format=" + this.fileFormat?.nativeElement.value;
      }
      else
        url = url + "&format=" + this.fileFormat?.nativeElement.value;
    }
    url = url + "&userID=" + this.auth.credentialsData.id;
    this.http.get(url).subscribe(data =>{
      this.response = data;
      if(data){
        this.updateTable(this.response);
      }
      else{
        this.toast.open("File not found!",'',{panelClass: 'toast-config-failure'})
      }
    })
  }

}
