import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {

  public description: string | undefined;
  public fileName: string | undefined;
  public fileSize: bigint | undefined;
  public fileType: string | undefined;
  public id: string | undefined;
  public path: string | undefined;
  public userFileName: string | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.description = this.data.data.description;
    this.fileName = this.data.data.fileName;
    this.fileSize = this.data.data.fileSize;
    this.fileType = this.data.data.fileType;
    this.id = this.data.data.id;
    this.path = this.data.data.path;
    this.userFileName = this.data.data.userFileName;
    this.firstName = this.data.data.firstNameUser;
    this.lastName = this.data.data.lastNameUser;
  }

}
