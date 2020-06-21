import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth.interceptor';


registerLocaleData(ruLocale, 'ru')

const INTERCEPTOR_PROVAIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVAIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
