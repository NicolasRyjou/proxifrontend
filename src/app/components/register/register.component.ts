import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend-service/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage-service/localstorage.service';
import { UserClass } from 'src/app/structures/user-d-struc';
import { GlobalVariable } from 'src/global';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit{

    private user = new UserClass();
    public registerForm:FormGroup;
    private firstName:FormControl;
    private lastName:FormControl;
    private email:FormControl;
    private bio:FormControl;

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

        this.registerForm=formBuilder.group({
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email,
            bio:this.bio,
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
        console.log(this.user)
        this.backend.post('/user/12345', this.user)
    }

    goToPage(pageName:string){
        console.log("Redirecting to page: " + GlobalVariable.BASE_URL + pageName);
        this.router.navigate([`${pageName}`]);
      }
}