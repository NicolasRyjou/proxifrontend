import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { ChatClass } from 'src/app/structures/chat-d-struc';

@Component({
  selector: 'app-mychats',
  templateUrl: './mychats.component.html',
  styleUrls: ['./mychats.component.css']
})
export class MychatsComponent implements OnInit {

  public userId: number = Number(this.localstorage.getLocalStorageUserId());
  public chatsData: ChatClass[] = [];
  public hasNoChats: boolean = true;
  public hasAccountLoggedIn: boolean = true;

  constructor(
    private localstorage: LocalstorageService,
    private backend: BackendService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if(this.userId==0){
      this.hasAccountLoggedIn = false;
      this.cdRef.detectChanges();
      setTimeout(()=>{this.goToPage('register', null)}, 2000);
    }
    this.backend.getChatsByUser(this.userId).then((dataForChats: any) => {
      this.hasAccountLoggedIn = true;
      if(dataForChats.lengh == null){
        this.hasNoChats = true;
        for(let i=0; i<dataForChats.lenght; i++){
          let tempChat = new ChatClass(dataForChats[i].chat_id, dataForChats[i].creator_id, dataForChats[i].name, {"lat":dataForChats[i].loc_latitude, "lng":dataForChats[i].loc_longitude}, dataForChats[i].radius, true, dataForChats[i].description, dataForChats[i].imgb64);
          this.chatsData.push(tempChat);
        }
      } else {
        this.hasNoChats = false;
      }
      this.cdRef.detectChanges();
    });
  }

  goToPage(pageName: string, optional: any){
    this.router.navigate([`${pageName}/${optional}`]);
  }

  goToSettings(chatId: number){
    this.router.navigate([`chat/${chatId}/settings`])
  }

  goToCreate(){
    this.router.navigate([`create`]);
  }

}
