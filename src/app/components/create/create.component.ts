import { Component, OnInit } from '@angular/core';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/global';

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
  modelChat = new ChatClass(1, this.userId, "", null);

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  ngOnInit() {
    if(typeof(Number(this.localstorageservice.getLocalStorageUserId())) === 'number'){
      this.userId = Number(this.localstorageservice.getLocalStorageUserId());
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
  }

  onCreateChatSubmit() { 
    console.log(JSON.stringify(this.modelChat.coordinates))
    this.backend.post('/chats/12345', this.modelChat);
    let chatNumberBefore: number = Number(this.backend.getVar('chatNumber'));
    let redirectUrlChatId = chatNumberBefore+1;
    this.backend.postVar("chatNumber", redirectUrlChatId)
    this.goToPage(String(redirectUrlChatId));
  }

  goToPage(pageName:string){
    console.log("Redirecting to page: " + GlobalVariable.BASE_URL + pageName);
    this.router.navigate([`${pageName}`]);
  }
}
