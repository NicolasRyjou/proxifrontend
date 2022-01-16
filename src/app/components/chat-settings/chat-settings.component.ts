import { Component, OnInit } from '@angular/core';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { delay, Subscriber } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { UserClass } from 'src/app/structures/user-d-struc';

@Component({
  selector: 'app-chat-settings',
  templateUrl: './chat-settings.component.html',
  styleUrls: ['./chat-settings.component.css']
})
export class ChatSettingsComponent implements OnInit {

  chatData: ChatClass = new ChatClass(1, 1, '--Loading--', {'lat':0, 'lng':0}, 10, false, '--Loading--');
  creatorData: UserClass = new UserClass(1, '--Loading--', '--Loading--', '--Loading--', '--Loading--', '--Loading--')
  userId = Number(this.localstorage.getLocalStorageUserId());
  hasAnAccount = true;
  isUserSavedWhoCreated = false

  constructor(
    private activatedRoute:ActivatedRoute,
    private backend: BackendService,
    private imageSanitizer: DomSanitizer,
    private localstorage: LocalstorageService,
    private router: Router
  ) 
  {
    this.activatedRoute.paramMap.subscribe(
      params=>{
          this.chatData.chatId=Number(params.get('chatId'));
          this.backend.getChatData(this.chatData.chatId).then(dataForChat => {
            if(dataForChat.creator_id != this.userId){
              this.isUserSavedWhoCreated = true;
              delay(2000);
              this.goToPage('/chat/'+this.chatData.chatId)
            }
            let coordinates: any = {
              "lat": dataForChat.loc_latitude,
              "lng": dataForChat.loc_longitude
            };
          this.chatData = new ChatClass(Number(dataForChat.chat_id), Number(dataForChat.creator_id), String(dataForChat.name), coordinates, dataForChat.radius, this.isUserSavedWhoCreated, String(dataForChat.description), this.imageSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + dataForChat.base64string))
        });
      }
    ) 
  }

  ngOnInit(): void {
    if(typeof(this.userId) === 'number'){
      this.hasAnAccount = true;
      let unbindedUseData: any = this.backend.getUserData(this.userId);
      this.creatorData = new UserClass(unbindedUseData.user_id)
    } else if(typeof(this.userId)===null){
      this.hasAnAccount = false;
      delay(2000)
      this.goToPage('register')
    }
    
  }

  getNameForUserById(userId: number){
    let tempData: any = this.backend.getUserData(userId)
    this.creatorData.firstName = tempData.fName
    this.creatorData.lastName = tempData.fName
    return tempData
  }

  deleteChat(){
    let confirmationString: string = "Are you sure you want to delete Chat '" + this.chatData.chatName;
    if(confirm(confirmationString)){
      if(this.backend.deleteChat(this.chatData.chatId))
      console.log("Deleted chat: "+this.chatData.chatName)
    }
  }

  goToPage(pageName: string){
    this.router.navigate([`${pageName}`]);
}
}

