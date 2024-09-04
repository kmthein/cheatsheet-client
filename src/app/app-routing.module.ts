import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';
import { CheatsheetComponent } from './features/cheatsheet/cheatsheet.component';
import { AddCheatsheetComponent } from './features/add-cheatsheet/add-cheatsheet.component';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'cheatsheets', component: CheatsheetComponent },
      { path: 'create', component: AddCheatsheetComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
