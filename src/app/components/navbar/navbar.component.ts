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
    this.goToPage('login', '')
  }
  
  goToPage(pageName:string, name: any){
    console.log("Redirecting to page: "+GlobalVariable.BASE_URL+pageName+name)
    this.router.navigate([`${pageName}`, name]);
  }

}
