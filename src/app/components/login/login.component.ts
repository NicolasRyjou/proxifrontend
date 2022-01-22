import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { delay } from 'rxjs';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { TitleService } from 'src/app/services/title-service/title.service';
import { UserClass } from 'src/app/structures/user-d-struc';
import { GlobalVariable } from 'src/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public gUser: SocialUser = new SocialUser;
  public user: UserClass = new UserClass(1, "Example Name", "Example Family Name", "example@email.com")
  public isLoggedin: boolean;

  constructor(
    private authService: SocialAuthService,
    public backend: BackendService,
    public localstorage: LocalstorageService,
    public router: Router,
    private title: TitleService
  ) {  }

  ngOnInit() {
    this.title.setTitle('Login')
    if(typeof(this.localstorage.getLocalStorageUserId()) === 'number'){
      this.goToPage('');
      return
    }
    this.authService.authState.subscribe((userSocial) => {
      this.gUser = userSocial;
      this.isLoggedin = (userSocial != null);
      this.user.email = this.gUser.email
      if(this.isLoggedin){
        this.handleLogin(this.user.email);
      }
    });
  }

  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public signOut(): void {
    this.authService.signOut();
    this.localstorage.resetLocalStorage();
    this.goToPage("login")
  }

  newLogin(email: string){
    this.handleLogin(email);
  }

  handleLogin(email: string){
    this.backend.getUserDataThroughEmail(email).then((data:any)=>{
      console.log(data)
      if(data.user_id != 0 || data.user_id != null){
        this.localstorage.resetLocalStorage();
        this.localstorage.setLocalStorageUserID(Number(data.user_id));
        setTimeout(()=>{this.goToPage('');}, 500)
      }
    });
  }

  goToPage(pageName:string){
    console.log("Redirecting to page: " + GlobalVariable.BASE_URL + pageName);
    this.router.navigate([`${pageName}`]);
  }
  
}