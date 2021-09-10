import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from '@angular/material/table';

const MAT_SNACK_BAR_GLOBAL_CONFIG: MatSnackBarConfig = {
  duration: 3000,
  verticalPosition: 'bottom',
  horizontalPosition: 'center'
}

const MAT_DIALOG_GLOBAL_CONFIG: MatDialogConfig = {
  width: "900px",
  disableClose: true,
  hasBackdrop: true
}

@NgModule({
  declarations: [],
  exports: [
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MAT_DIALOG_GLOBAL_CONFIG},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACK_BAR_GLOBAL_CONFIG}
  ]
})
export class MaterialModule { }
