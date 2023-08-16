import { Component } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent {
  members$: Observable<Member[]>;
  // Subject は Observable を継承したクラス
  private searchTerms = new Subject<string>();

  constructor(private memberService: MemberService){  }

  search(term: string): void{
    // next関数は、受け取ったtermを渡す。（pipeで規定されている中間処理を通してsubscribeが実行されているところにデータを遅れる）
    this.searchTerms.next(term);
  }

  ngOnInit(): void{
    this.members$ = this.searchTerms.pipe(
      // キーボード入力後、300ms待ってから次の実行に移る
      debounceTime(300),
      // 直前のデータと同じ場合は処理を実行しない、同じ検索キーワードの入力をはじく
      distinctUntilChanged(),
      // 検索キーワードを受け取る度に、新しいobservableを渡す
      switchMap((term: string) => this.memberService.searchMembers(term))
    );
  }
}
