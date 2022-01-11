import { Component, OnInit } from '@angular/core';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-chat-settings',
  templateUrl: './chat-settings.component.html',
  styleUrls: ['./chat-settings.component.css']
})
export class ChatSettingsComponent implements OnInit {

  chatData = new ChatClass(1, 1, '', '', 0.5)
  creatorData: any

  constructor(
    private activatedRoute:ActivatedRoute,
    private backend: BackendService,
    private imageSanitizer: DomSanitizer
  ) 
  {
    this.activatedRoute.paramMap.subscribe(
      params=>{
          this.chatData.chatId=Number(params.get('chatId'));
      }
    ) 
  }

  ngOnInit(): void {
    console.log("Requesting data for chat: "+this.chatData.chatId);
    this.backend.getChatData(this.chatData.chatId).then(dataForChat => {
      let coordinates: any = {
        "lat": dataForChat.loc_latitude,
        "lng": dataForChat.loc_longitude
      };
      this.chatData = new ChatClass(Number(dataForChat.chat_id), Number(dataForChat.creator_id), String(dataForChat.name), coordinates, dataForChat.radius, String(dataForChat.description), this.imageSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + dataForChat.base64string))
    });
  }

  getNameForUserById(userId: number){
    let tempData: any = this.backend.getUserData(userId)
    this.creatorData.fName = tempData.fName
    this.creatorData.sName = tempData.fName
    return tempData
  }

  deleteChat(){
    let confirmationString: string = "Are you sure you want to delete Chat '" + this.chatData.chatName;
    if(confirm(confirmationString)){
      if(this.backend.deleteChat(this.chatData.chatId))
      console.log("Deleted chat: "+this.chatData.chatName)
    }
  }
}

