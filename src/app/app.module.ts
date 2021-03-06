import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { SocketioService } from './services/socketio-service/socketioconn.service';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './components/app';
import { HomeComponent } from './components/home';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { ChatComponent } from './components/chat';
import { MapsComponent } from './components/maps';
import { SidebarComponent } from './components/sidebar';
import { GlobalVariable } from 'src/global';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from './services/backend-service/backend.service';
import { UserComponent } from './components/user/user.component';
import { VerifyCodeComponent } from './components/verify-code';
import { CreateChatComponent } from './components/create';
import { ChatSettingsComponent } from './components/chat-settings/chat-settings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
import { WhatisthisComponent } from './components/whatisthis/whatisthis.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MychatsComponent } from './components/mychats/mychats.component';

const imports = [
  BrowserModule,
  CommonModule,
  MatIconModule,
  appRoutingModule,
  SocialLoginModule,
  BrowserAnimationsModule,
  MatExpansionModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
  MatCardModule,
  MatDatepickerModule,
  MatButtonModule,
  MatFormFieldModule,
  MatNativeDateModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyBoqbGDbzB-Ggw2WHqSJntPwuMy2VITgb0'
  })
]

@NgModule({
  imports: [...imports, NgbModule], //, MdbAccordionModule, MdbCarouselModule, MdbCheckboxModule, MdbCollapseModule, MdbDropdownModule, MdbFormsModule, MdbModalModule, MdbPopoverModule, MdbRadioModule, MdbRangeModule, MdbRippleModule, MdbScrollspyModule, MdbTabsModule, MdbTooltipModule, MdbValidationModule, BrowserAnimationsModule, NgbModule],    
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
      autoLogin: false,
      providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              GlobalVariable.client_id
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    SocketioService,
    BackendService,
    HttpClient
  ],
  declarations: [ 
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    MapsComponent,
    SidebarComponent,
    UserComponent,
    VerifyCodeComponent,
    CreateChatComponent,
    ChatSettingsComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
    WhatisthisComponent,
    MychatsComponent,
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}