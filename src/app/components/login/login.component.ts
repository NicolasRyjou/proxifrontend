import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { delay } from 'rxjs';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
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
    public router: Router
  ) {  }

  ngOnInit() {
    this.user.bio = "No Bio Provided"
    if(typeof(this.localstorage.getLocalStorageUserId()) === 'number'){
      this.goToPage('');
      return
    }
    this.authService.authState.subscribe((userSocial) => {
      this.gUser = userSocial;
      this.isLoggedin = (userSocial != null);

      this.user.firstName = this.gUser.firstName
      this.user.lastName = this.gUser.lastName
      this.user.email = this.gUser.email
      this.user.profPicFilePath = this.gUser.photoUrl
      this.user.profPicB64 = 'b64 data'
      this.user.birthday = "2021-12-12"
      if(this.isLoggedin){
        this.backend.post('/user/12345', this.user)
      }
      delay(1000)
      this.backend.getUserDataThroughEmail(this.user.email).subscribe(userId => {
        this.localstorage.setLocalStorageUserID(Number(userId));
      });
      this.goToPage('')
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

  goToPage(pageName:string){
    console.log("Redirecting to page: " + GlobalVariable.BASE_URL + pageName);
    this.router.navigate([`${pageName}`]);
  }
  
}