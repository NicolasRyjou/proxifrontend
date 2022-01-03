import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { SocketioService } from 'src/app/services/socketio-service/socketioconn.service';
import { GlobalVariable } from 'src/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Proxi';
  display_title = 'Proxi - Find. Talk. Connet.'

  constructor(
    private socketService: SocketioService,
    public localstorage: LocalstorageService,
    public router: Router
  ) { }

  
  goToPage(pageName:string, name: any){
    console.log("Redirecting to page: "+GlobalVariable.BASE_URL+pageName+name)
    this.router.navigate([`${pageName}`, name]);
  }

}