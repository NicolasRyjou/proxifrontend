import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { TitleService } from 'src/app/services/title-service/title.service';
import { UserClass } from 'src/app/structures/user-d-struc';

export interface ResponceUpdatedData {
  'success':boolean
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId: number = Number(this.localstorage.getLocalStorageUserId());
  isSuccess: boolean;
  hasSendRequest: boolean;
  hasAccount: boolean = false;
  hasErrorHappened: boolean = false;
  hasDeletedAccount: boolean = false;
  hasTriedDeleting: boolean = false;
  hasSendEmail: boolean = false;

  public user = new UserClass();
  public registerForm:FormGroup;
  private firstName:FormControl;
  private lastName:FormControl;
  private email:FormControl;
  private bio:FormControl;
  private birthday:FormControl;
  constructor(
    private localstorage: LocalstorageService,
    private backend: BackendService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private title: TitleService,
    private cdRef:ChangeDetectorRef

  ) {this.firstName = new FormControl("", [Validators.required]);
  this.lastName = new FormControl("", [Validators.required]);
  this.email = new FormControl("", [Validators.required]);
  this.bio = new FormControl("", [Validators.required]);
  this.birthday = new FormControl('', [Validators.required]);
  this.registerForm=formBuilder.group({
    firstName:this.firstName,
    lastName:this.lastName,
    email:this.email,
    bio:this.bio,
    birthday:this.birthday,
  });
  }

  ngOnInit(): void {
    this.title.setTitle('Settings');
    if(this.userId != 0){
      this.hasAccount = true;
    }
    this.cdRef.detectChanges();
    this.backend.getUserData(this.userId).then((data:any) => {
      this.user = new UserClass(data.user_id, data.f_name, data.s_name, data.email, data.birthday, data.created_on, data.description, data.prof_pic, data.prof_pic_filename);
      this.firstName.setValue(this.user.firstName);
      this.lastName.setValue(this.user.lastName);
      this.email.setValue(this.user.email);
      this.bio.setValue(this.user.bio);
      this.birthday.setValue(this.user.birthday);
    });
  }

  updateUser(){
    let confirmationString: string = "Are you sure you want to update your account?";
    if(confirm(confirmationString)){
      this.user.firstName = this.registerForm.controls['firstName'].value
      this.user.lastName = this.registerForm.controls['lastName'].value
      this.user.email = String(this.registerForm.controls['email'].value)
      this.user.bio = this.registerForm.controls['bio'].value
      this.user.birthday = this.registerForm.controls['birthday'].value
      //NEED TO UPLOAD ACTUAL IMAGE
      this.user.profPicB64 = "data:image/png;base64,uvhbijobhiv jgvhb";
      this.user.profPicFilePath = "/image.png";
      let resFromSer: ResponceUpdatedData
      this.backend.update(`/user/${this.userId}`, this.user).then(
          (result) => {
            resFromSer = result
            if(resFromSer.success){
                this.isSuccess = true; 
            }
          }
      );
    }
    this.hasSendRequest = true;
    this.cdRef.detectChanges();
  }

  deleteAccount(){
    let confirmationString: string = "Are you sure you want to delete your account. This action is irreversible";
    if(confirm(confirmationString)){
      this.hasTriedDeleting = true;
      this.backend.deleteUser(Number(this.user.userId)).then((data:any)=>{
        if(data.success){
          this.localstorage.resetLocalStorage();
          this.router.navigate([`register`])
        } else {
          this.hasDeletedAccount = false
        }
      });
    }
  }

  confirmUser(){
    this.backend.newEmailVerification(this.user.email).then((data: any) => {
      if(data.success){
        this.router.navigate([`verify-email?email=${this.user.email}`]);
      } else {
        this.hasErrorHappened = true;
        this.cdRef.detectChanges();
      }
    });
  }
}
