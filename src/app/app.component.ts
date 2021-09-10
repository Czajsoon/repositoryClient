import { Component } from '@angular/core';
import {AddFileFormComponent} from "./add-file-form/add-file-form.component";
import {AddFilesFormComponent} from "./add-files-form/add-files-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'repository-application';

  constructor() {
  }


}
