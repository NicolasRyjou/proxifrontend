import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(
    private router: Router
  ) { }

  public setLocalStorageUserID(userId: number){
    localStorage.setItem('userId', String(userId));
    console.log("Saved user Id "+userId+" to localstorage;")
  }

  public resetLocalStorage(){
    localStorage.clear()
  }

  public getLocalStorageUserId(){
    return localStorage.getItem('userId');
  }
}
