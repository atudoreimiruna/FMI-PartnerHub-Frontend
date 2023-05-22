import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home-page/home.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginModule } from "./modules/auth-page/auth/auth.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatIconModule,
        HomeModule,
        HttpClientModule,
        OAuthModule.forRoot()
    ]
})
export class AppModule { }
