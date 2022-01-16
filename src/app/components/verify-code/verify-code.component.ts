import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { BackendService } from 'src/app/services/backend-service/backend.service';
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
    private formBuilder:FormBuilder
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
  userData: UserClass = new UserClass(1, '--Loading--', '--Loading--', '--Loading--', '--Loading--', '--Loading--', '--Loading--', '--Loading--', '--Loading--');

  ngOnInit(): void {

  }

  verifyIfCorrectCode(){
    this.hasAttempted = true;
    this.backend.verifyVerCode(String(this.userData.email), Number(this.verificationCode.controls['verCode'].value)).then((data: any) => {
      if(data.validityOfCode){
        this.isVerified = true;
        delay(2000);
        this.router.navigate([``]);
      } else if(data.validityOfCode){
        this.isVerified = false;
      }
    });
  }

  retryToRegister(){
    this.router.navigate([`register?fname=${this.userData.firstName}&lname=${this.userData.lastName}&email=${this.userData.email}&desc=${this.userData.bio}&bday=${this.userData.birthday}`]);
  }
}
