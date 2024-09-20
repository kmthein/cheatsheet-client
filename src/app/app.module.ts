import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SiderComponent } from './shared/components/sider/sider.component';
import { HomeComponent } from './features/home/home.component';
import { CheatsheetComponent } from './features/cheatsheet/cheatsheet.component';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroMagnifyingGlass,
  heroUserCircle,
  heroCodeBracket,
  heroComputerDesktop,
  heroHome,
  heroShoppingBag,
  heroBookOpen,
  heroPlus,
} from '@ng-icons/heroicons/outline';
import {
  ionAddCircle,
  ionBackspace,
  ionCalendarOutline,
  ionChevronDownSharp,
  ionGameController,
  ionGameControllerOutline,
  ionPricetagSharp,
  ionReturnUpBack,
} from '@ng-icons/ionicons';
import { featherEdit } from '@ng-icons/feather-icons';

import { SectionListComponent } from './features/section-list/section-list.component';
import { SectionComponent } from './features/section-list/section/section.component';
import { InnerWrapComponent } from './layouts/inner-wrap/inner-wrap.component';
import { LatestCheatsheetComponent } from './features/latest-cheatsheet/latest-cheatsheet.component';
import { PopularCheatsheetComponent } from './features/popular-cheatsheet/popular-cheatsheet.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCheatsheetComponent } from './features/add-cheatsheet/add-cheatsheet.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { LoginComponent } from './features/login/login.component';
import { authInterceptor } from './core/auth.interceptor';
import { ToastComponent } from './shared/components/toast/toast.component';
import { RegisterComponent } from './features/register/register/register.component';
import { AddBlockModalComponent } from './shared/components/add-block-modal/add-block-modal.component';
import { EditCheatsheetComponent } from './features/edit-cheatsheet/edit-cheatsheet.component';
import { EditBlockModalComponent } from './shared/components/edit-block-modal/edit-block-modal.component';
import { CheatsheetDetailComponent } from './features/cheatsheet-detail/cheatsheet-detail/cheatsheet-detail.component';
import { ProfileComponent } from './features/profile/profile/profile.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    NavComponent,
    FooterComponent,
    SiderComponent,
    HomeComponent,
    CheatsheetComponent,
    SectionListComponent,
    SectionComponent,
    InnerWrapComponent,
    LatestCheatsheetComponent,
    PopularCheatsheetComponent,
    AddCheatsheetComponent,
    BreadcrumbComponent,
    LoginComponent,
    ToastComponent,
    RegisterComponent,
    AddBlockModalComponent,
    EditCheatsheetComponent,
    EditBlockModalComponent,
    CheatsheetDetailComponent,
    ProfileComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgIconsModule.withIcons({
      heroMagnifyingGlass,
      heroUserCircle,
      heroCodeBracket,
      heroComputerDesktop,
      heroHome,
      heroShoppingBag,
      heroBookOpen,
      ionGameControllerOutline,
      ionCalendarOutline,
      ionPricetagSharp,
      ionChevronDownSharp,
      heroPlus,
      ionAddCircle,
      featherEdit,
      ionReturnUpBack,
    }),
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
