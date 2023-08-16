import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string [] = [];

  add(message: string){
    // push: 呼び出し元の配列の末尾に要素を追加する
    this.messages.push(message);
  }

  clear(){
    this.messages = [];
  }
}
