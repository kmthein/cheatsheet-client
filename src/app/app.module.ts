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
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputNumberModule } from 'primeng/inputnumber';
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
} from '@ng-icons/heroicons/outline';
import {
  ionCalendarOutline,
  ionGameController,
  ionGameControllerOutline,
  ionPricetagSharp,
} from '@ng-icons/ionicons';
import { SectionListComponent } from './features/section-list/section-list.component';
import { SectionComponent } from './features/section-list/section/section.component';
import { InnerWrapComponent } from './layouts/inner-wrap/inner-wrap.component';
import { LatestCheatsheetComponent } from './features/latest-cheatsheet/latest-cheatsheet.component';
import { PopularCheatsheetComponent } from './features/popular-cheatsheet/popular-cheatsheet.component';
import { provideHttpClient } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    ToggleButtonModule,
    InputNumberModule,
    DropdownModule,
    BrowserAnimationsModule,
    MenuModule,
    MenubarModule,
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
    }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
