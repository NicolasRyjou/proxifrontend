import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { GlobalVariable } from 'src/global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isRegistered = false;

  constructor(
    private localstorage: LocalstorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(typeof(this.localstorage.getLocalStorageUserId()) === 'string'){
      this.isRegistered = true;
    }
  }

  eraseCookiesAndLogout(){
    this.localstorage.resetLocalStorage();
    console.log("Logging out. Erasing localstorage. redirecting to login page")
    window.location.reload();
    this.goToPage('register')
  }
  
  searchQueryChanged(event){
    console.log("Need to search for chats were similar to "+event.value)
  }


  goToPage(pageName:string){
    console.log("Redirecting to page: "+GlobalVariable.BASE_URL+pageName)
    this.router.navigate([`${pageName}`]);
  }

}
