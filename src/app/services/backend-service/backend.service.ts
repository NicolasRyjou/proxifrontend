import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/global';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { Observable, Subject } from 'rxjs';
import { CheckboxRequiredValidator } from '@angular/forms';
import { UserClass } from 'src/app/structures/user-d-struc';

@Injectable()
export class BackendService {

  constructor(
    private http: HttpClient
  ) { }

  backendUrl = GlobalVariable.BASE_API_URL;
  
  post(urlAddress: string, data): Promise<any>{
    return this.http.post<any>(this.backendUrl + urlAddress, JSON.stringify(data)).toPromise();
  }

  update(urlAddress: string, data): Promise<any>{
    return this.http.put<any>(this.backendUrl+urlAddress, data).toPromise();
  }

  getChatData(chatId: number): Promise<any> {
    return this.http.get(this.backendUrl+"/chats/"+chatId).toPromise();
  }
  
  verifyUser(userEmail: string): Promise<any> {
    return this.http.get(this.backendUrl+'/verify?email='+userEmail).toPromise();
  }

  getRecentChats(userId: number): Promise<any> {
    return this.http.get(this.backendUrl+"/recent/"+userId).toPromise();
  }

  getChatNearMe(coords): Promise<any>{
    return this.http.get(this.backendUrl+"/get-chats-near-me?lat="+coords.lat+"&lng="+coords.lng).toPromise();
  }

  delete(urlAddress: string, data:any): Promise<any>{
    return this.http.delete(this.backendUrl+'/'+urlAddress+'/'+data).toPromise();
  }

  getIsVerified(userId: number): Promise<any>{
    return this.http.get(this.backendUrl+"/is-verified/"+userId).toPromise();
  }

  getMessagesFromBefore(chatId: number, messageNumber: number): Promise<any>{
    return this.http.get(this.backendUrl+"/get-messages/"+chatId+"?hwmny="+messageNumber).toPromise()
  }

  newEmailVerification(email): Promise<any>{
    return this.http.post(this.backendUrl+"/verify", {'email': email}).toPromise();
  }

  getUserData(userId: number): Promise<any> {
    return this.http.get(this.backendUrl+"/user/"+userId).toPromise();
  }

  getVar(varName: string){
    return this.http.get(this.backendUrl+"/variables?varname="+varName)
  }

  postVar(varName: string, value: any){
    return this.http.get(this.backendUrl+"/variables?varname="+varName+"&value="+value)
  }

  getUserDataThroughEmail(email: string){
    return this.http.get(this.backendUrl+'/get-user?email='+email).toPromise();
  }

  deleteUser(userId: number): Promise<any>{
    return this.http.delete(this.backendUrl+"/users/"+userId).toPromise();
  }

  deleteChat(chatId: number): Promise<any>{
    return this.http.delete(this.backendUrl+"/chats/"+chatId).toPromise();
  }

  verifyVerCode(email: string, code: number): Promise<any>{
    return this.http.get(this.backendUrl+'/check-if-correct-code?email='+email+'&code='+code).toPromise();
  }
}