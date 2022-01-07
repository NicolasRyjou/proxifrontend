import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/global';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { Observable, Subject } from 'rxjs';
import { CheckboxRequiredValidator } from '@angular/forms';

@Injectable()
export class BackendService {

  constructor(
    private http: HttpClient
  ) { }

  backendUrl = GlobalVariable.BASE_API_URL;
  
  post(urlAddress: string, data): Promise<any>{
    return this.http.post<any>(this.backendUrl + urlAddress, JSON.stringify(data)).toPromise();
  }

  getChatData(chatId: number): Promise<any> {
    return this.http.get(this.backendUrl+"/chats/"+chatId).toPromise();
  }
  
  getRecentChatId(userId: number): Promise<any> {
    return this.http.get(this.backendUrl+"/recent/"+userId).toPromise();
  }

  getChatNearMe(coords, radius): Promise<any>{
    return this.http.get(this.backendUrl+"/get-chats-near-me?lat="+coords.lat+"&lng="+coords.lng+"&radius="+radius).toPromise();
  }

  getMessagesFromBefore(chatId: number, messageNumber: number): Promise<any>{
    return this.http.get(this.backendUrl+"/get-messages/"+chatId+"?hwmny="+messageNumber).toPromise()
  }

  getUserData(userId: number) {
    return this.http.get(this.backendUrl+"/chats/"+userId).subscribe(
      (response) => console.log(response),
    )
  }

  getVar(varName: string){
    return this.http.get(this.backendUrl+"/variables?varname="+varName)
  }

  postVar(varName: string, value: any){
    return this.http.get(this.backendUrl+"/variables?varname="+varName+"&value="+value)
  }

  getUserDataThroughEmail(email: string){
    return this.http.get(this.backendUrl+'/get-user-id?email='+email)
  }

  deleteUser(userId: number){
    return this.http.delete(this.backendUrl+"/users/"+userId).subscribe(
      (response) => console.log(response),
    );
  }

  deleteChat(chatId: number){
    return this.http.delete(this.backendUrl+"/chats/"+chatId).subscribe(
      (response) => console.log(response),
    );
  }
}