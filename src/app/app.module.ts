import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { SettingsComponent } from './components/settings/settings.component';
import { VerifyCodeComponent } from './components/verify-code';
import { CreateChatComponent } from './components/create';
import { ChatSettingsComponent } from './components/chat-settings/chat-settings.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    appRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule
  ],    
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
    SettingsComponent,
    VerifyCodeComponent,
    CreateChatComponent,
    ChatSettingsComponent,
    NavbarComponent,
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}