import { Injectable } from '@angular/core';
import { Member } from './member';
import { MEMBERS } from './mock-members';
// RxJS 6.0
import { Observable, of } from 'rxjs';

@Injectable({
  // アプリケーションのどこで有効か
  // rootの場合はこのサービスをアプリケーション全体で使える
  providedIn: 'root'
})
export class MemberService {

  constructor() { }

  // MEMBERSコンポーネントでデータを取得
  getMembers(): Observable<Member[]>{
    // of はObservableの型に変更して返す関数
    return of(MEMBERS);
  }
}
