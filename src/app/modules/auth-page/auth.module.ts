import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/auth.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { FooterCompModule } from "../footer-comp/footer-comp.module";

@NgModule({
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
    providers: [],
    imports: [
        CommonModule,
        HttpClientModule,
        OAuthModule.forRoot(),
        FooterCompModule
    ]
})

export class LoginModule { }