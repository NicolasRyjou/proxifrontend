import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/global';
import { ChatClass } from 'src/app/structures/chat-d-struc';


@Injectable()
export class BackendService {

  constructor(
    private http: HttpClient
  ) { }

  backendUrl = GlobalVariable.BASE_API_URL;

  post(urlAddress: string, data) {
    return this.http.post(this.backendUrl + urlAddress, JSON.stringify(data)).subscribe(
      (response) => console.log(response)
    );
  }

  getChatData(chatId: number) {
    return this.http.get(this.backendUrl+"/chats/"+chatId).subscribe(
      (response) => console.log(response),
    )
  }
  
  getMessagesFromBefore(chatId: number, messageNumber: number){
    return this.http.get(this.backendUrl+"/get-messages/"+chatId+"?hwmny="+messageNumber).subscribe(
      (response) => console.log(response),
    )
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