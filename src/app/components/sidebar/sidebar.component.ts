import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { BackendService } from '../../services/backend-service/backend.service';

export interface ResponcePrevId {
  ids: Array<any>
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public httpService: BackendService, 
    public router: Router,
    public localstorage: LocalstorageService
  ) { }

  chatData: ChatClass[] = [];
  MAX_SIDEBAR_CHAT = 100;
  unselectedChat: string = 'list-group-item list-group-item-action py-3 lh-tight';
  userId = Number(this.localstorage.getLocalStorageUserId());

  ngOnInit(): void {
    this.httpService.getRecentChats(this.userId).then((data: any) => {
      let dataForChats: Array<any> = data.ids;
      for(let i=0; i<dataForChats.length;i++){
        let tempWasCreatedBySavedUser = false;
        if(dataForChats[i].creator_id == this.userId){
          tempWasCreatedBySavedUser = true;
        }
        let temp = new ChatClass(dataForChats[i].chat_id, dataForChats[i].creator_id, dataForChats[i].name, {"lat":dataForChats[i].loc_latitude, "lng":dataForChats[i].loc_longitude}, dataForChats[i].radius, tempWasCreatedBySavedUser, dataForChats[i].description, dataForChats[i].imgb64);
        this.chatData.push(temp);
        if(i==dataForChats.length){
          break
        }
      }
    });
  }

  goToPage(pageName: string, id: any){
      this.router.navigate([`${pageName}/${id}`]);
  }

}
