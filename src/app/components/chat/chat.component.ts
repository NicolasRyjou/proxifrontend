import { Component, ViewChild, AfterViewInit, OnInit, Sanitizer, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketioService } from 'src/app/services/socketio-service/socketioconn.service';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { UserClass } from 'src/app/structures/user-d-struc';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MessageClass } from 'src/app/structures/message-d-structure';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { TitleService } from 'src/app/services/title-service/title.service';

@Component({ templateUrl: 'chat.component.html' })
export class ChatComponent implements OnInit{
    userData = new UserClass(1, "", "", "");
    chatData = new ChatClass(1, 1, "", null, 0.5, false, "", "");
    creatorData = new UserClass;
    toAgmData = [this.chatData]
    messages$ : Observable<MessageClass[]>;
    lastRecentMessages: MessageClass[];
    listLastRecentMessages:any = [];
    message: string;
    showhasTriedToAccessNoCreator: boolean = false;
    hasTriedToAccessNoCreator: boolean = false;
    isIcreated: boolean = false;

    constructor(
        private activatedRoute:ActivatedRoute,
        private socketService: SocketioService,
        private imageSanitizer: DomSanitizer,
        private backend: BackendService,
        private localstorageservice: LocalstorageService,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private title: TitleService
    ) {
        this.activatedRoute.paramMap.subscribe(
            params=>{
                this.chatData.chatId=Number(params.get('chatId'));
            }
        );
        this.activatedRoute.queryParams.subscribe(params => {
            let temp = params['origin']
            if(temp == 'cs'){
              this.showhasTriedToAccessNoCreator 
              this.hasTriedToAccessNoCreator = true
              this.cdRef.detectChanges();
              setTimeout(()=>{this.showhasTriedToAccessNoCreator = false; this.cdRef.detectChanges();}, 2000)
            }
        });
    }
    
    ngOnInit(): void {
        this.userData.userId = Number(this.localstorageservice.getLocalStorageUserId());
        if(Number(this.userData.userId) == 0){
            this.goToPage('register');
        }
        let tempData = JSON.stringify({"user_id": this.userData.userId, "chat_id": this.chatData.chatId});
        this.backend.getChatData(this.chatData.chatId).then(data => {
            this.bindDataFromRequest(data);
            this.title.setTitle(`${this.chatData.chatName}`);
            if(this.userData.userId = this.chatData.creatorId){
                this.isIcreated = true;
            }
        });
        this.backend.getUserData(this.chatData.creatorId).then((data: any) => {
            this.creatorData = new UserClass(data.user_id, data.f_name, data.s_name, data.email, data.birthday, data.created_on, data.description, data.prof_pic, data.prof_pic_filename);
        });
        this.socketService.setupSocketConnection(tempData)
        this.messages$ = this.socketService.messages$;
        this.backend.getMessagesFromBefore(this.chatData.chatId, 50).then(data => {
            for(let i=0;i<data.length;i++){
                    this.listLastRecentMessages.push(data[i])
                }
        });
        this.socketService.getNewMessage();
        this.cdRef.detectChanges();


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
        this.chatData.description = String(dataForChat.description);
        this.chatData.imageBase64 = this.imageSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + dataForChat.base64string); dataForChat.image;
        this.chatData.radius = dataForChat.radius;
      }

    loadChat(chat_id: number){
        return this.backend.getChatData(chat_id)
    }

    uploadImage(){

    }

    goToEdit(){
        this.router.navigate([`chat/${this.chatData.chatId}/settings`])
    }

    newMessage(message: string, image?: string, imageName?: string){
        this.message = '';
        let jsonned_string = JSON.stringify({"content":message, "user_id": this.userData.userId, "chat_id": this.chatData.chatId, "image":{"content":image, "filename": imageName}})
        this.socketService.newMessage(jsonned_string)
    }

    deleteMessage(message_id: number){
        this.socketService.deleteMessage(message_id);
    }

    goToPage(pageName: string){
        this.router.navigate([`${pageName}`]);
    }
}