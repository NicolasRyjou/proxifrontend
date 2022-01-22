import { Component, NgModule, Compiler,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { ChatComponent } from '../chat';
import { BackendService } from '../../services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { GlobalVariable } from 'src/global';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { LocationService } from 'src/app/services/location-service/location.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TitleService } from 'src/app/services/title-service/title.service';
import { UserClass } from 'src/app/structures/user-d-struc';


@Component({
    templateUrl: 'home.component.html',
    styleUrls:[
        './home.component.css'
    ]
})
export class HomeComponent implements OnInit{
    newUrl;
    dataChats: ChatClass[] = [];
    userData: UserClass;
    coords: any;
    radius = 0.5; //km
    userId = Number(this.localstorage.getLocalStorageUserId());

    maxRadius = 5000;
    minRadius = 100;
    radiusSliderSteps = 25;
    
 
    constructor(
        private router: Router,
        private backend: BackendService,
        public localstorage: LocalstorageService,
        private locationservice: LocationService,
        private imageSanitizer: DomSanitizer,
        private title:TitleService
    ) { }

    ngOnInit(){
        this.title.setTitle('Home')
        this.updateNearMe();
        this.backend.getUserData(this.userId).then((data: any) => {
            this.userData = new UserClass(data.user_id, data.f_name, data.s_name, data.email, data.birthday, data.created_on, data.description, data.prof_pic, data.prof_pic_filename);
        });
    }

    public getColorForMyChat(): string {
        return 'rgb(200, 55, 100)';
      }      

    updateNearMe(){
        this.locationservice.getPosition().then(pos => {
            this.dataChats = [];
            this.backend.getChatNearMe(pos).then(listOfChatsNearMe => {
                listOfChatsNearMe.forEach((dataForChat: any) => {
                    let tempIsUserSavedWhoCreated = false;
                    if(dataForChat.creator_id == this.userId){
                        tempIsUserSavedWhoCreated = true;
                    }
                    let coordinates: any = {
                        "lat": dataForChat.loc_latitude,
                        "lng": dataForChat.loc_longitude
                      };
                    this.dataChats.push(new ChatClass(Number(dataForChat.chat_id), Number(dataForChat.creator_id), String(dataForChat.name), coordinates, dataForChat.radius, tempIsUserSavedWhoCreated, String(dataForChat.description), this.imageSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + dataForChat.base64string)));
                });
            })
        })
    }

    eraseCookiesAndLogout(){
        this.localstorage.resetLocalStorage();
        console.log("Logging out. Erasing localstorage. redirecting to login page")
        this.goToPage('login', '')
      }

    radiusSliderFunc(event: any){
        this.radius = event.value;
    }

    hasChatsNear(){
        if(this.dataChats.length>0){
            return true
        } else {
            return false
        }
    }

    goToPage(pageName:string, name: any){
        console.log("Redirecting to page: "+GlobalVariable.BASE_URL+pageName+'/'+name)
        this.router.navigate([`${pageName}/`, name]);
    }
    
    goToSettings(chatId: number){
        this.router.navigateByUrl(`chat/${chatId}/settings`);
    }

}

