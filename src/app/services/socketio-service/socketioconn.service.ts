import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { MessageClass } from 'src/app/structures/message-d-structure';
import { environment } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class SocketioService{

  socket;
  data;
  temp;

  private _messages = new BehaviorSubject<MessageClass[]>([]);
  readonly messages$ = this._messages.asObservable();
 
  private messages: MessageClass[] = [];

  constructor(
  ) { }

  setupSocketConnection(data: any) {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      auth: {
        token: 'code'
      }
    });
    this.socket.emit("join", data)
  }

  newMessage(data: string){
    this.socket.emit("message", data)
  }

  deleteMessage(data: number){
    this.socket.emit("delete_message", data);
    for(let i=0; i<this.messages.length; i++){
      if(this.messages[i].messageId == data){
        delete this.messages[i];
      }
    }
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      console.log(message)
      this.messages.push(message)
      this._messages.next(Object.assign([], this.messages));
      this.playNewMessageSound();
    });
  };

  private playNewMessageSound(){
    let audio = new Audio();
    audio.src = "../../../assets/soundeffects/soundNewMessage.wav";
    audio.load();
    audio.play();
  }

  disconnect() {
    if(this.socket){
      this.socket.disconnect(); 
    }
  }
}
