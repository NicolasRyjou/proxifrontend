import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public router: Router
  ) { }

  chatData: ChatClass[];
  MAX_SIDEBAR_CHAT = 100;

  ngOnInit(): void {
    let chatIdDataRaw: any = this.httpService.getRecentChatId(1);
    for(let i=0; i<chatIdDataRaw.lenght;i++){
      if(i>this.MAX_SIDEBAR_CHAT){
        break
      }
      this.chatData.push(this.httpService.getChatData(Number(chatIdDataRaw[i])))
    }
  }

  goToPage(pageName: string, id: number){
      console.log("Redirecting to chat number: "+id);
      this.router.navigate([`${pageName}`,id]);
  }


}
