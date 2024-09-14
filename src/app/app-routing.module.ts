import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';
import { CheatsheetComponent } from './features/cheatsheet/cheatsheet.component';
import { AddCheatsheetComponent } from './features/add-cheatsheet/add-cheatsheet.component';
import { LoginComponent } from './features/login/login.component';
import { LoginGuard } from './core/guard/login.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { RegisterComponent } from './features/register/register/register.component';
import { EditCheatsheetComponent } from './features/edit-cheatsheet/edit-cheatsheet.component';
import { CheatsheetDetailComponent } from './features/cheatsheet-detail/cheatsheet-detail/cheatsheet-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'cheatsheets', component: CheatsheetComponent },
      { path: 'cheatsheets/:id', component: CheatsheetDetailComponent },
      {
        path: 'cheatsheets/section/:sectionName',
        component: CheatsheetComponent,
      },
      {
        path: 'cheatsheets/tag/:tagName',
        component: CheatsheetComponent,
      },
      {
        path: 'cheatsheets/edit/:id',
        component: EditCheatsheetComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        component: AddCheatsheetComponent,
        canActivate: [AuthGuard],
      },

      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
