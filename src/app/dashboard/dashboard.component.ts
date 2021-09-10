import { Component, OnInit } from '@angular/core';
import {AddFileFormComponent} from "../add-file-form/add-file-form.component";
import {AddFilesFormComponent} from "../add-files-form/add-files-form.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../services/auth.service";
import {Credentials} from "../models/credentials.model";
import {Router} from "@angular/router";
import {AddFolderAccessComponent} from "../add-folder-access/add-folder-access.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // @ts-ignore
  user: Credentials;

  constructor(private matDialog: MatDialog,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.credentialsData;
  }

  logout(){
    this.auth.logout();
  }

  openNewFileComponent(){
    this.matDialog.open(AddFileFormComponent);
  }

  openNewFilesComponent(){
    this.matDialog.open(AddFilesFormComponent);
  }

  openAddFolderAccess(){
    this.matDialog.open(AddFolderAccessComponent);
  }
}
