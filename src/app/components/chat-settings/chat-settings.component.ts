import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { delay, Subscriber } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { UserClass } from 'src/app/structures/user-d-struc';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';

export interface ResponceUpdatedData {
  'success':boolean
}

@Component({
  selector: 'app-chat-settings',
  templateUrl: './chat-settings.component.html',
  styleUrls: ['./chat-settings.component.css']
})
export class ChatSettingsComponent implements OnInit {

  chatData: ChatClass = new ChatClass(1, 1, '--Loading--', {'lat':0, 'lng':0}, 10, false, '--Loading--');
  creatorData: UserClass = new UserClass(1, '--Loading--', '--Loading--', '--Loading--', '--Loading--', '--Loading--');
  radius: number = 1000;
  clientuserId = Number(this.localstorage.getLocalStorageUserId());
  hasAnAccount = true;
  isUserSavedWhoCreated = false;

  hasDeletedChat: boolean = false;
  hasTriedDeleting: boolean = false;

  isClickableMarker: boolean = false;

  hasTriedUpdating: boolean = false;
  hasUpdatedChat: boolean = false;

  public chatForm:FormGroup;
  private chatName:FormControl;
  private description:FormControl;


  constructor(
    private activatedRoute:ActivatedRoute,
    private backend: BackendService,
    private imageSanitizer: DomSanitizer,
    private router: Router,
    private localstorage: LocalstorageService,
    private formBuilder:FormBuilder,
    private cdRef:ChangeDetectorRef

  ) 
  {
    this.activatedRoute.paramMap.subscribe(
      params=>{
          this.chatData.chatId=Number(params.get('chatId'));
      }
    );
    this.chatName = new FormControl("GWC chat", [Validators.required]);
    this.description = new FormControl("This is the GWC chat", [Validators.required]);
    this.chatForm=formBuilder.group({
      name:this.chatName,
      description:this.description,
    });
  }

  ngOnInit(): void {
    if(typeof(this.creatorData.userId) === 'number'){
      this.hasAnAccount = true;
      this.backend.getChatData(this.chatData.chatId).then(dataForChat => {
        console.log(dataForChat.creator_id+ '+' +this.clientuserId)
        if(true){//Number(dataForChat.creator_id) == Number(this.clientuserId)
          this.isUserSavedWhoCreated = true;
          this.cdRef.detectChanges();
        } else if(dataForChat.creator_id != this.clientuserId){
          this.goToPage('/chat/'+this.chatData.chatId)
        }
        let coordinates: any = {
          "lat": dataForChat.loc_latitude,
          "lng": dataForChat.loc_longitude
        };
      this.chatData = new ChatClass(Number(dataForChat.chat_id), Number(dataForChat.creator_id), String(dataForChat.name), coordinates, dataForChat.radius, this.isUserSavedWhoCreated, String(dataForChat.description), this.imageSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + dataForChat.base64string));
      this.chatName.setValue(this.chatData.chatName);
      this.description.setValue(this.chatData.description);
    });
      this.cdRef.detectChanges();
      setTimeout(()=>{this.backend.getUserData(Number(this.creatorData.userId)).then((data:any) => {
        this.creatorData = new UserClass(data.user_id, data.f_name, data.s_name, data.email, data.birthday, data.created_on, data.description, data.prof_pic, data.prof_pic_filename);
      });}, 1000)
    } else if(this.creatorData.userId==0){
      this.hasAnAccount = false;
      this.cdRef.detectChanges();
      setTimeout(()=>{this.goToPage(`chat/${this.chatData.chatId}?origin=cs`);}, 1000)
    }
    this.cdRef.detectChanges();

  }

  onInputChange(event: MatSliderChange) {
    this.radius = Number(event.value);
  }

  updateChat(){
    let confirmationString: string = "Are you sure you want to update this chat?";
    if(confirm(confirmationString)){
      this.hasTriedUpdating = true;
      this.chatData.chatName = this.chatForm.controls['name'].value
      this.chatData.description = this.chatForm.controls['description'].value
      this.chatData.radius = this.radius;
      this.backend.update(`/chats/${this.chatData.chatId}`, this.chatData).then(
          (result:ResponceUpdatedData) => {
            if(result.success){
                this.hasUpdatedChat = true; 
            } else if (!result.success){
              this.hasUpdatedChat = false;
            }
          }
      );
    }
    this.cdRef.detectChanges();
  }

  getNameForUserById(userId: number){
    let tempData: any = this.backend.getUserData(userId)
    this.creatorData.firstName = tempData.fName
    this.creatorData.lastName = tempData.fName
    return tempData
  }

  deleteChat(){
    let confirmationString: string = "Are you sure you want to delete Chat '" + this.chatData.chatName+"'";
    if(confirm(confirmationString)){
      this.hasTriedDeleting = true
      this.backend.deleteChat(this.chatData.chatId).then(
        (result:ResponceUpdatedData) => {
          if(result.success){
              this.hasDeletedChat = true; 
          } else if (!result.success){
            this.hasDeletedChat = false;
          }
        }
    );
    this.cdRef.detectChanges();
    setTimeout(()=>{
      this.goToPage[''], 2000
    });
    }
  }

  goToPage(pageName: string){
    this.router.navigate([`${pageName}`]);
}
}

