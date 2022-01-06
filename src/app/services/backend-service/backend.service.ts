import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/global';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class BackendService {

  constructor(
    private http: HttpClient
  ) { }

  backendUrl = GlobalVariable.BASE_API_URL;
  
  post(urlAddress: string, data): Observable<string>{
    var subject = new Subject<string>();
    this.http.post<any>(this.backendUrl + urlAddress, JSON.stringify(data))
    .subscribe(
      (response: any) => {console.log(response);subject = response;}
    );
    return subject.asObservable();
  }

  getChatData(chatId: number): any {
    return this.http.get(this.backendUrl+"/chats/"+chatId).subscribe(
      (response) => console.log(response),
    )
  }
  
  getRecentChatId(userId: number){
    return this.http.get(this.backendUrl+"/recent/"+userId).subscribe(
      (response) => console.log(response),
    )
  }

  getMessagesFromBefore(chatId: number, messageNumber: number): any{
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