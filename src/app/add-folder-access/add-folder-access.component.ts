import { Component, OnInit } from '@angular/core';
import {AccessModel} from "../models/access.model";
import {HttpClient} from "@angular/common/http";

let ELEMENT_DATA: AccessModel[] = [

];

@Component({
  selector: 'app-add-folder-access',
  templateUrl: './add-folder-access.component.html',
  styleUrls: ['./add-folder-access.component.scss']
})
export class AddFolderAccessComponent implements OnInit {
  dataToDisplay = [...ELEMENT_DATA];
  displayedColumns: string[] = ['UserID', 'FirstName', 'LastName', 'access-privilege'];
  response: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  updateTable(response: any){
    // this.dataToDisplay = [];
    // let perm;
    // for (let i = 0; i < this.response.length; i++) {
    //   perm = false;
    //   for (let j = 0; j < this.data.data.permissionList.length; j++) {
    //     if(this.data.data.permissionList[j] == this.response[i].id)
    //       perm = true;
    //   }
    //   if (this.response[i].id != this.user.id && this.response[i].id != this.data.data.userID) {
    //     this.dataToDisplay = [...this.dataToDisplay, {
    //       userID: this.response[i].id,
    //       firstName: this.response[i].firstName,
    //       lastName: this.response[i].lastName,
    //       permission: perm
    //     }]
    //   }
    // }
  }

  getUsers(){
    let url = "http://localhost:8080/getAllUsers"
    this.http.get(url).subscribe(data =>{
      this.response = data;
      this.updateTable(this.response);
    })
  }
}
