import { Injectable } from '@angular/core';
import { Member } from './member';
import { MEMBERS } from './mock-members';
// RxJS 6.0
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient} from '@angular/common/http'

@Injectable({
  // アプリケーションのどこで有効か
  // rootの場合はこのサービスをアプリケーション全体で使える
  providedIn: 'root'
})
export class MemberService {
  private membersUrl = 'api/members'

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  // MEMBERSコンポーネントでデータを取得
  getMembers(): Observable<Member[]>{
    this.messageService.add("MessageService: 社員一覧データを取得しました");
    // データサーバからデータをとってくる
    // angularのHttpClientはObservable型でデータを返す
    return this.http.get<Member[]>(this.membersUrl);
  }

  getMember(id: number): Observable <Member> {
    this.messageService.add(`MemberService: 社員データ(id = ${id})を取得しました`);
    // !をつけることでNULLの場合を省いている
    // of はObservableの型に変更して返す関数
    return of( MEMBERS.find(member => member.id === id)! );
  }

  private log(message: string){
    this.messageService.add(`MemberService: ${message}`);
  }
}
