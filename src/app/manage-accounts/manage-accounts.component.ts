import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Credentials} from "../models/credentials.model";
import {UserTableModel} from "../models/userTable.model";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

let DATA_ELEMENTS: UserTableModel[] = [];

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss']
})
export class ManageAccountsComponent implements OnInit {
  @ViewChild('userID') userID: ElementRef | undefined;
  @ViewChild('userLogin') userLogin: ElementRef | undefined;
  @ViewChild('userFirstName') userFirstName: ElementRef | undefined;
  @ViewChild('userLastName') userLastName: ElementRef | undefined;
  @ViewChild('userAdmin') userAdmin: ElementRef | undefined;
  dataToDisplay = [...DATA_ELEMENTS];
  displayedColumns: string[] = ['id','Login', 'FirstName', 'LastName', 'AdminPrivilege','Delete'];
  // @ts-ignore
  user: Credentials;
  admin = false;
  response: any;

  constructor(private auth: AuthService,
              private http: HttpClient,
              private toast: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.auth.credentialsData;
    this.getUsers();
  }

  changePrivilege(admin: boolean,id: string){
    console.log("make user " + id + " admin " + admin);
    let url = "http://localhost:8080/upOrDegUser/" + id + "/" + admin;
    this.http.put(url,null).subscribe(data =>{
      this.response = data;
      if(this.response.admin){
        this.toast.open("User " + this.response.firstName + " " + this.response.lastName + " is admin!",'',{panelClass: 'toast-config-success'})
      }
      else{
        this.toast.open("User " + this.response.firstName + " " + this.response.lastName + " is no longer admin!",'',{panelClass: 'toast-config-success'})
      }
    })
  }

  updateTable(response: any){
    this.dataToDisplay = [];
    for(let i =0;i<this.response.length;i++){
      if(this.response[i].id != this.user.id){
        this.dataToDisplay = [...this.dataToDisplay,{
          id:this.response[i].id,
          login:this.response[i].login,
          firstName:this.response[i].firstName,
          lastName:this.response[i].lastName,
          admin:this.response[i].admin
        }]
      }
    }
  }

  getUsers(){
    let url = "http://localhost:8080/getAllUsers"
    this.http.get(url).subscribe(data =>{
      this.response = data;
      this.updateTable(this.response);
    })
  }

  deleteAccount(id: string){
    let url = "http://localhost:8080/deleteUser/" + id;
    this.http.delete(url).subscribe(data =>{
      console.log(data)
      this.getUsers();
      this.toast.open("User " + this.response.firstName + " " + this.response.lastName + " has been deleted!",'',{panelClass: 'toast-config-success'})
    });
  }

  search(){
    let url = "http://localhost:8080/searchUsers?";
    let counterElements = 0;
    if(this.userID?.nativeElement.value){
        url = url + "id=" + this.userID.nativeElement.value;
        counterElements++;
    }
    if(this.userLogin?.nativeElement.value){
      if(counterElements == 0){
        url = url + "login=" + this.userLogin.nativeElement.value;
        counterElements++;
      }
      else
        url = url +"&login=" + this.userLogin.nativeElement.value;
    }
    if(this.userFirstName?.nativeElement.value){
      if(counterElements == 0){
        url = url + "firstName=" + this.userFirstName.nativeElement.value;
        counterElements++;
      }
      else
        url = url + "&firstName=" + this.userFirstName.nativeElement.value;
    }
    if(this.userLastName?.nativeElement.value){
      if(counterElements == 0){
        url = url +"lastName=" + this.userLastName.nativeElement.value;
        counterElements++;
      }
      else
        url = url + "&lastName=" + this.userLastName.nativeElement.value;
    }
    if(this.admin){
      if(counterElements == 0){
        url = url + "admin=" + this.admin;
        counterElements++;
      }
      else
        url = url + "&admin=" + this.admin;
    }
    this.http.get(url).subscribe(data =>{
      if(data){
        this.response = data;
        this.updateTable(this.response);
      }
      else
        this.toast.open("User not found!",'',{panelClass: 'toast-config-failure'})
    })
  }

  logout(){
    this.auth.logout();
  }

}
