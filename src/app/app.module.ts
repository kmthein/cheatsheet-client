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
} from '@ng-icons/heroicons/outline';
import { SectionListComponent } from './features/section-list/section-list.component';
import { SectionComponent } from './features/section-list/section/section.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    ToggleButtonModule,
    InputNumberModule,
    NgIconsModule.withIcons({
      heroMagnifyingGlass,
      heroUserCircle,
      heroCodeBracket,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
