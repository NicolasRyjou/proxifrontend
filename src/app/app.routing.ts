import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { ChatComponent } from './components/chat';
import { CreateChatComponent } from './components/create';
import { ChatSettingsComponent } from './components/chat-settings';
import { ContactComponent } from './components/contact/contact.component';
import { WhatisthisComponent } from './components/whatisthis/whatisthis.component';
import { VerifyCodeComponent } from './components/verify-code';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'chat/:chatId', component: ChatComponent },
    { path: 'create', component: CreateChatComponent },
    { path: 'chat-settings/:chatId', component: ChatSettingsComponent},
    { path: 'contact-us', component: ContactComponent},
    { path: 'what-is-this', component: WhatisthisComponent},
    { path: 'verify-email', component: VerifyCodeComponent},
    { path: '**', redirectTo: ''},
];

export const appRoutingModule = RouterModule.forRoot(routes);