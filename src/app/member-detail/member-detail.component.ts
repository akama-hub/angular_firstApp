import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent {
  // member変数をMemberとして定義
  @Input() member: Member;

  constructor(
    // urlのパラメータやハッシュフラグメントを取得するためのサービス
    private route: ActivatedRoute,
    private memberService: MemberService,
    // ブラウザバッグやページを進めるためのサービズ
    private location: Location
    ) { }

    ngOnInit(): void{
      this.getMember();
    }

    getMember(): void {
      // App-rouingモジュールで定義しているpathのidを取得
      // snapshotオブジェクトはroute情報が含まれる
      // paramMapオブジェクトはパラメータが格納されている
      // getで帰ってくるidは文字列となるので+をつけることで数値に変換している
      // !をつけることでNULLの場合を省いている
      const id = +this.route.snapshot.paramMap.get('id')!;
      this.memberService.getMember(id).subscribe(member => this.member = member);
    }
    
    goBack(): void{
      this.location.back();
    }

    save(): void{
      this.memberService.updateMember(this.member).subscribe(() => this.goBack());
    }
}
