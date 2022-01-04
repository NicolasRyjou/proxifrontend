import { Component, ViewChild, AfterViewInit, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketioService } from 'src/app/services/socketio-service/socketioconn.service';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { UserClass } from 'src/app/structures/user-d-struc';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MessageClass } from 'src/app/structures/message-d-structure';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';

@Component({ templateUrl: 'chat.component.html' })
export class ChatComponent implements OnInit{
    userData = new UserClass(1, "", "", "");
    chatData = new ChatClass(1, 1, "", null, "", "");
    messages$ : Observable<MessageClass[]>;
    messagesOld: MessageClass[]

    constructor(
        private activatedRoute:ActivatedRoute,
        private socketService: SocketioService,
        private imageSanitizer: DomSanitizer,
        private backend: BackendService,
        private localstorageservice: LocalstorageService
    ) {
        this.activatedRoute.paramMap.subscribe(
            params=>{
                this.chatData.chatId=Number(params.get('chatId'));
            }
        )
    }
    
    ngOnInit(): void {
        this.userData.userId = Number(this.localstorageservice.getLocalStorageUserId())
        let tempData = JSON.stringify({"user_id": this.userData.userId, "chat_id": this.chatData.chatId});
        this.socketService.setupSocketConnection(tempData)
        this.messages$ = this.socketService.messages$;
        let lastRecentMessages = this.backend.getMessagesFromBefore(this.chatData.chatId, 50)
        for(let i:number = 0; i>50; i++){
            this.messagesOld.push(lastRecentMessages[i])
        }
        this.socketService.getNewMessage()
    }

    ngOnDestroy() {
        this.socketService.disconnect();
    }    

    bindDataFromRequest(dataForChat: any){
        let coordinates: any = {
          "lat": dataForChat.loc_latitude,
          "lng": dataForChat.loc_longitude
        };
        this.chatData.chatId = Number(dataForChat.chat_id);
        this.chatData.creatorId = Number(dataForChat.creator_id);
        this.chatData.chatName = String(dataForChat.name);
        this.chatData.coordinates = coordinates;
        this.chatData.description = String(dataForChat.chat_id);
        this.chatData.imageBase64 = this.imageSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + dataForChat.image.base64string); dataForChat.image;
      }

    loadChat(chat_id: number){
        return this.backend.getChatData(chat_id)
    }

    uploadImage(){

    }

    newMessage(message: string, image?: string, imageName?: string){///REPLACE string by File type
        let jsonned_string = JSON.stringify({"content":message, "user_id": this.userData.userId, "chat_id": this.chatData.chatId, "image":{"content":image, "filename": imageName}})
        this.socketService.newMessage(jsonned_string)
    }

    deleteMessage(message_id: number){
        this.socketService.deleteMessage(message_id);
    }

}