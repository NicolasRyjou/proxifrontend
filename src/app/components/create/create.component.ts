import { Component, OnInit } from '@angular/core';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/global';
import { delay } from 'rxjs';
import { coerceStringArray } from '@angular/cdk/coercion';

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
  ) { }

  userId: number = 1;
  modelChat = new ChatClass(1, this.userId, "", null, 0.5);

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  radius = 0.5; //km

  maxRadius = 5000;
  minRadius = 100;
  radiusSliderSteps = 25;
  isVerified = false;
  
  ngOnInit() {
    this.backend.getVar('chatNumber')
    if(typeof(Number(this.localstorageservice.getLocalStorageUserId())) === 'number'){
      this.userId = Number(this.localstorageservice.getLocalStorageUserId());
      this.backend.getIsVerified(this.userId).then((isVerifiedRespFromServer) => {
        this.isVerified = isVerifiedRespFromServer;
      })
    } else {
      console.log("No user id detected. Please log in.")
      this.goToPage('login')
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

    this.modelChat.radius = this.radius;
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
  }

  goToPage(pageName:string){
    console.log("Redirecting to page: " + GlobalVariable.BASE_URL + pageName);
    this.router.navigate([`${pageName}`]);
  }
}
