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
} from '@ng-icons/heroicons/outline';
import {
  ionCalendarOutline,
  ionChevronDownSharp,
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCheatsheetComponent } from './features/add-cheatsheet/add-cheatsheet.component';

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
      ionChevronDownSharp
    }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
