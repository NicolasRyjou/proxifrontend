import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/global';
import { delay, retry } from 'rxjs';
import { coerceStringArray } from '@angular/cdk/coercion';
import { TitleService } from 'src/app/services/title-service/title.service';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateChatComponent implements OnInit {

  constructor(
    public backend: BackendService,
    public localstorageservice: LocalstorageService,
    private router: Router,
    private cdRef:ChangeDetectorRef,
    private title: TitleService
  ) { }

  userId: number = 1;
  modelChat = new ChatClass(1, this.userId, "", null, 0.5, false);

  imageError: string;
  isImageSaved: boolean;  
  cardImageBase64: string;
  hasAccount: boolean = false;

  radius = 1000;

  maxRadius = 50000;
  minRadius = 10;
  radiusSliderSteps = 25;
  isVerified = false;
  
  ngOnInit() {
    this.title.setTitle('Create')
    this.backend.getVar('chatNumber')
    if(Number(this.localstorageservice.getLocalStorageUserId()) > 0){
      this.userId = Number(this.localstorageservice.getLocalStorageUserId());
      this.hasAccount = true;
      this.backend.getIsVerified(this.userId).then((isVerifiedRespFromServer: any) => {
        this.isVerified = isVerifiedRespFromServer.isValid;
        this.cdRef.detectChanges();
      })
    } else {
      this.cdRef.detectChanges();
      setTimeout(()=>{this.goToPage('register')}, 2000);
      console.log("No user id detected. Please log in.")
    }
    navigator.geolocation.getCurrentPosition(position => {
      this.modelChat.coordinates = {
        "lat": position.coords.latitude,
        "lng": position.coords.longitude,
      }
    })
    this.modelChat.radius = this.radius
  }

  onCreateChatSubmit() { 
    if(!this.isVerified){
     return
    }
    this.modelChat.radius = this.radius;
    this.modelChat.creatorId = Number(this.localstorageservice.getLocalStorageUserId());
    console.log(this.modelChat)
    this.backend.post('/chats/12345', this.modelChat);
    delay(1000);
    let chatNumberBefore: number = Number(this.backend.getVar('chatNumber'));
    let redirectUrlChatId = chatNumberBefore+1;
    this.backend.postVar("chatNumber", redirectUrlChatId)
    this.goToPage(String(redirectUrlChatId));
  }

  radiusSliderFunc(event: any){
    this.radius = event.value;
    this.cdRef.detectChanges();
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  goToPageRetry(){
    let email: any = this.backend.getUserData(this.userId);
    this.router.navigate([`verify-email?email=${email.email}`]);
  }
}
