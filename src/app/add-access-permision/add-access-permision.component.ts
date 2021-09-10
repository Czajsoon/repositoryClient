import {Component, Inject, OnInit} from '@angular/core';
import {AccessModel} from "../models/access.model";
import {HttpClient} from "@angular/common/http";
import {Credentials} from "../models/credentials.model";
import {AuthService} from "../services/auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


let ELEMENT_DATA: AccessModel[] = [

];

@Component({
  selector: 'app-add-access-permision',
  templateUrl: './add-access-permision.component.html',
  styleUrls: ['./add-access-permision.component.scss']
})
export class AddAccessPermisionComponent implements OnInit {

  dataToDisplay = [...ELEMENT_DATA];
  displayedColumns: string[] = ['UserID', 'FirstName', 'LastName', 'access-privilege'];
  response:any;
  // @ts-ignore
  element: AccessModel;
  // @ts-ignore
  user: Credentials;
  constructor(private http: HttpClient,
              private auth: AuthService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.user = this.auth.credentialsData;
    this.getUsers();
  }

  giveOrTakePermission(userID:string){
    let url = "http://localhost:8080/giveOrRemovePermission?fileID=" + this.data.data.id + "&userID=" + userID;
    this.http.put(url,null).subscribe(data => {
    })
  }

  updateTable(response: any){
    this.dataToDisplay = [];
    let perm;
    for (let i = 0; i < this.response.length; i++) {
      perm = false;
      for (let j = 0; j < this.data.data.permissionList.length; j++) {
        if(this.data.data.permissionList[j] == this.response[i].id)
          perm = true;
      }
      if (this.response[i].id != this.user.id && this.response[i].id != this.data.data.userID) {
        this.dataToDisplay = [...this.dataToDisplay, {
          userID: this.response[i].id,
          firstName: this.response[i].firstName,
          lastName: this.response[i].lastName,
          permission: perm
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

}
