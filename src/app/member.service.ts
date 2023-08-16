import { Injectable } from '@angular/core';
import { Member } from './member';
import { MEMBERS } from './mock-members';
// RxJS 6.0
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders} from '@angular/common/http'

import { catchError, map, tap} from 'rxjs/operators';

@Injectable({
  // アプリケーションのどこで有効か
  // rootの場合はこのサービスをアプリケーション全体で使える
  providedIn: 'root'
})
export class MemberService {
  private membersUrl = 'api/members';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  // MEMBERSコンポーネントでデータを取得
  getMembers(): Observable<Member[]>{
    // this.messageService.add("MessageService: 社員一覧データを取得しました");

    // データサーバからデータをとってくる
    // angularのHttpClientはObservable型でデータを返す
    // pipe()で中間処理を記述できる
    // 指定したメソッドの順に実行されていく
    return this.http.get<Member[]>(this.membersUrl).pipe(
      // getしてきたデータをtap関数で受け取る、受け取った値を確認するための関数
      tap(members => this.log(`社員データを取得しました`)),
      // 一覧データの取得時にエラーが発生した時に引数内の関数を実行する
      catchError(this.handleError<Member[]>('getMembers', []))
    );
  }

  getMember(id: number): Observable <Member> {
    // this.messageService.add(`MemberService: 社員データ(id = ${id})を取得しました`);

    // !をつけることでNULLの場合を省いている
    // of はObservableの型に変更して返す関数
    // return of( MEMBERS.find(member => member.id === id)! );

    const url = `${this.membersUrl}/${id}`
    return this.http.get<Member>(url).pipe(
      tap(_ => this.log(`社員データ(id = ${id})を取得しました`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }

  updateMember(member: Member): Observable <any>{
    // 
    return this.http.put(this.membersUrl, member, this.httpOptions).pipe(
      tap(_ => this.log(`社員データ(id = ${member.id})を変更しました`)),
      catchError(this.handleError<any>(`updateMember`))
    );
  }

  addMember(member: Member): Observable <Member>{
    // データの作成はpostメソッド
    return this.http.post<Member>(this.membersUrl, member, this.httpOptions)
    .pipe(
      tap( (newMember: Member) => this.log(`社員データ(id = ${newMember.id})を追加しました`)),
      catchError(this.handleError<Member>(`addMember`))
    );
  }

  deleteMember(member: Member | number): Observable<Member>{
    // typeof演算子でmemberの型判定
    const id = typeof member === 'number' ? member: member.id;
    const url = `${this.membersUrl}/${id}}`;

    return this.http.delete<Member>(url, this.httpOptions)
    .pipe(
      tap( _ => this.log(`社員データ(id = ${id})を削除しました`)),
      catchError(this.handleError<Member>(`deleteMember`))
    );
  }

  searchMembers(term: string): Observable <Member []>{
    if(!term.trim()){
      return of([]);
    }
    // クエリパラメータの追加
    return this.http.get<Member[]>(`${this.membersUrl}/?name=${term}`)
    .pipe(
      tap(_ => this.log(`${term}にマッチする社員データが見つかりました`)),
      catchError(this.handleError<Member[]>(`searchMember`))
    );
  }

  private log(message: string){
    this.messageService.add(`MemberService: ${message}`);
  }

  // operationは実行したメソッド名を受け取る
  // resutはエラーによってアプリケーションがとまらないように安全な値をコンポーネントに渡す
  private handleError<T>(operation = 'operation', result?: T ){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} 失敗: ${error.message}`);
      // resultがT型になるようにasでキャスト
      return of(result as T);
    }
  }
}
