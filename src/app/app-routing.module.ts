import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./services/auth.guard";
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {ManageAccountsComponent} from "./manage-accounts/manage-accounts.component";

const routes: Routes = [
  {path: '',pathMatch: "full",redirectTo: "/login"},
  {path: "dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
  {path: "user-settings",component:UserSettingsComponent,canActivate:[AuthGuard]},
  {path: "manage-accounts",component:ManageAccountsComponent,canActivate:[AuthGuard]},
  {path: "login",component:LoginComponent},
  {path: "register",component:RegisterComponent},
  {path: "**",component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
