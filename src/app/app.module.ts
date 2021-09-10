import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import { FilesComponent } from './files/files.component';
import { AddFilesFormComponent } from './add-files-form/add-files-form.component';
import { AddFileFormComponent } from './add-file-form/add-file-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { FileDetailsComponent } from './file-details/file-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddAccessPermisionComponent } from './add-access-permision/add-access-permision.component';
import { AddFolderAccessComponent } from './add-folder-access/add-folder-access.component';

@NgModule({
  declarations: [
    AppComponent,
    FilesComponent,
    AddFilesFormComponent,
    AddFileFormComponent,
    FileDetailsComponent,
    DashboardComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    UserSettingsComponent,
    ManageAccountsComponent,
    ChangePasswordComponent,
    AddAccessPermisionComponent,
    AddFolderAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatMenuModule,
    MatSlideToggleModule,
    FormsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
