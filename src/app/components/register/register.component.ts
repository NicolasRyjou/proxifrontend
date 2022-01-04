import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { UserClass } from 'src/app/structures/user-d-struc';
import { GlobalVariable } from 'src/global';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { formatDate } from '@angular/common';
import { delay, timeInterval } from 'rxjs';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit{

    private user = new UserClass();
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
        private formBuilder:FormBuilder
    ) {
        this.firstName = new FormControl("John", [Validators.required]);
        this.lastName = new FormControl("Steve", [Validators.required]);
        this.email = new FormControl("example@gmail.com", [Validators.required]);
        this.bio = new FormControl("Hi, I am John!", [Validators.required]);
        this.birthday = new FormControl(formatDate(Date.now(), 'yyyy-MM-dd', 'en'), [Validators.required]);

        this.registerForm=formBuilder.group({
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email,
            bio:this.bio,
            birthday:this.birthday,
        })
    }

    ngOnInit(): void {
        if(typeof(this.localstorage.getLocalStorageUserId) === 'number'){
            this.goToPage('')
        }
    }

    registerUser(){
        this.user.firstName = this.registerForm.controls['firstName'].value
        this.user.lastName = this.registerForm.controls['lastName'].value
        this.user.email = this.registerForm.controls['email'].value
        this.user.bio = this.registerForm.controls['bio'].value
        this.user.birthday = this.registerForm.controls['birthday'].value
        //NEED TO UPLOAD ACTUAL IMAGE
        this.user.profPicB64 = "data:image/png;base64,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";
        this.user.profPicFilePath = "/image.png";
        let userNewId: any = this.backend.post('/user/12345', this.user);
        if(userNewId.is_existing){
            alert("You already have an account. Please login")
            delay(3000)
            this.goToPage('login')
        }
        this.localstorage.resetLocalStorage();
        this.localstorage.setLocalStorageUserID(Number(userNewId.user_id));
        this.goToPage('')
    }

    goToPage(pageName:string){
        console.log("Redirecting to page: " + GlobalVariable.BASE_URL + pageName);
        this.router.navigate([`${pageName}`]);
      }
}