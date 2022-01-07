import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { UserClass } from 'src/app/structures/user-d-struc';
import { GlobalVariable } from 'src/global';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { formatDate } from '@angular/common';

export interface ResponceUserId{
    "user_id": number,
    "is_existing": boolean
}

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
        this.birthday = new FormControl(new FormGroup({
            start: new FormControl(),
            end: new FormControl(),
        }), [Validators.required]);

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
        this.user.email = String(this.registerForm.controls['email'].value)
        this.user.bio = this.registerForm.controls['bio'].value
        this.user.birthday = this.registerForm.controls['birthday'].value
        //NEED TO UPLOAD ACTUAL IMAGE
        this.user.profPicB64 = "data:image/png;base64,uvhbijobhiv jgvhb";
        this.user.profPicFilePath = "/image.png";
        let userNewId: ResponceUserId
        this.backend.post('/user/12345', this.user).then(
            (result) => {
                userNewId = JSON.parse(result)
                if(userNewId.is_existing){
                    this.goToPage('login')
                }
                this.localstorage.resetLocalStorage();
                this.localstorage.setLocalStorageUserID(Number(userNewId.user_id));
                this.goToPage('')
            }
        );
    }

    goToPage(pageName:string){
        console.log("Redirecting to page: " + GlobalVariable.BASE_URL + pageName);
        this.router.navigate([`${pageName}`]);
      }
}