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

  constructor(
    private localstorage: LocalstorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  eraseCookiesAndLogout(){
    this.localstorage.resetLocalStorage();
    console.log("Logging out. Erasing localstorage. redirecting to login page")
    this.goToPage('login')
  }
  
  searchQueryChanged(event){
    console.log("Need to search for chats were similar to "+event.value)
  }


  goToPage(pageName:string){
    console.log("Redirecting to page: "+GlobalVariable.BASE_URL+pageName+name)
    this.router.navigate([`${pageName}`, name]);
  }

}
