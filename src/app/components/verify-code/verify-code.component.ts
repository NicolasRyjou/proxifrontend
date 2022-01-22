import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { TitleService } from 'src/app/services/title-service/title.service';
import { UserClass } from 'src/app/structures/user-d-struc';
import { GlobalVariable } from 'src/global';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {

  constructor(
    private backend: BackendService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private cdRef:ChangeDetectorRef,
    private title: TitleService
  ) {
    this.verificationCodeCode = new FormControl("123456", [Validators.required]);
    this.verificationCode=formBuilder.group({
      verCode:this.verificationCodeCode
  });
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.userData.email = params['email'];
      }
    )
   }

  public verificationCode: FormGroup;
  private verificationCodeCode: FormControl;
  hasAttempted: boolean = false;
  isVerified: boolean;
  isAlreadyVerified: boolean = false;
  userData: UserClass = new UserClass(1, '--Loading--', '--Loading--', '--Loading--', '--Loading--', '--Loading--', '--Loading--', '--Loading--', '--Loading--');

  ngOnInit(): void {
    this.title.setTitle('Verify')
    this.backend.getUserDataThroughEmail(String(this.userData.email)).then((data:any) => {
      this.userData = new UserClass(data.user_id, data.f_name, data.s_name, data.email, data.birthday, data.created_on, data.description, data.prof_pic, data.prof_pic_filename);
    });
    this.backend.getIsVerified(Number(this.userData.userId)).then((data: any) =>{
      this.isAlreadyVerified = true;
      this.cdRef.detectChanges();
      setTimeout(()=>{ this.router.navigate([``]);}, 2000)
    });
  }

  verifyIfCorrectCode(){
    this.hasAttempted = true;
    this.backend.verifyVerCode(String(this.userData.email), Number(this.verificationCode.controls['verCode'].value)).then((data: any) => {
      if(data.validityOfCode){
        this.isVerified = true;
        this.cdRef.detectChanges();
        setTimeout(()=>{ this.router.navigate([``]); }, 2000)
      } else if(data.validityOfCode){
        this.isVerified = false;
      }
    });
  }

  retryToRegister(){
    console.log(this.userData)

    let tempString = `register?fname=${this.userData.firstName}&lname=${this.userData.lastName}&email=${this.userData.email}&desc=${this.userData.bio}&bday=${this.userData.birthday}`;
    console.log(tempString)
    this.router.navigate([`${tempString}`]);
  }
}
