import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  chatData: any;

  ngOnInit(): void {
  //  let chatDataRaw = this.httpService.get_chat_data(1);
  //  this.chatData = Array.of(chatDataRaw); 
  //
  }

  goToPage(pageName: string, id: number){
      console.log("Redirecting to chat number: "+id);
      this.router.navigate([`${pageName}`,id]);
  }


}
