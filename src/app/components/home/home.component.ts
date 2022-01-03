import { Component, NgModule, Compiler,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { ChatComponent } from '../chat';
import { BackendService } from '../../services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { GlobalVariable } from 'src/global';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';


@Component({
    templateUrl: 'home.component.html',
    styleUrls:[
        './home.component.css'
    ]
})
export class HomeComponent implements OnInit{
    newUrl;
    data;

    constructor(
        private router: Router,
        private httpConnService: BackendService,
        public localstorage: LocalstorageService
    ) { }

    ngOnInit(){
        console.log("I NEED TO GET LOCAL CHATS")
    }

    eraseCookiesAndLogout(){
        this.localstorage.resetLocalStorage();
        console.log("Logging out. Erasing localstorage. redirecting to login page")
        this.goToPage('login', '')
      }

    goToPage(pageName:string, name: any){
        console.log("Redirecting to page: "+GlobalVariable.BASE_URL+pageName+name)
        this.router.navigate([`${pageName}`, name]);
    }
}