import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home-page/home.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HomeModule,
        HttpClientModule,
        OAuthModule.forRoot(),
        NgxPaginationModule,
        BrowserAnimationsModule
    ]
})
export class AppModule { }
