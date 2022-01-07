import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { BackendService } from '../../services/backend-service/backend.service';


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

  chatData: ChatClass[];
  MAX_SIDEBAR_CHAT = 100;

  ngOnInit(): void {
    this.httpService.getRecentChatId(Number(this.localstorage.getLocalStorageUserId())).then(data => {
      for(let i=0; i<data.lenght;i++){
        if(i>this.MAX_SIDEBAR_CHAT){
          break
        }
        console.log(i)
        this.httpService.getChatData(Number(data[i])).then(data => {
          this.chatData.push(data);
        });
      }
      }
    );
  }

  goToPage(pageName: string, id: number){
      console.log("Redirecting to chat number: "+id);
      this.router.navigate([`${pageName}`,id]);
  }

}
