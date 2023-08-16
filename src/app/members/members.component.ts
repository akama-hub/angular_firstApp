import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MEMBERS } from '../mock-members';
// Memberのデータ取得用
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';
import { MemberDetailComponent } from '../member-detail/member-detail.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{
  members: Member[];
  // selectedMember: Member;

  // ディペンデンシーインジェクション
  constructor(
    private memberService: MemberService,
    // private messageService: MessageService
    ) {

  }

  // コンストラクターは自身の初期化に使われるため、外部データの取得に使うのはおかしい
  ngOnInit(): void{
    this.getMembers();
  }

  // onSelect(member: Member): void { 
  //   this.selectedMember = member;
  //   // テンプレート文字列にしないと変数を埋め込めない
  //   this.messageService.add(`MembersComponent: 社員データ( id = ${member.id} ) が選択されました`);
  // }

  getMembers(): void{
    // Observableオブジェクトを使った非同期処理のデータ渡し
    // membersを引数にとって、this.membersに代入して、リターンしている
    this.memberService.getMembers().subscribe(members => this.members = members)
  }

  add(name: string): void {
    // 前後の空白文字の除去
    name = name.trim();
    if(!name){      return;    }

    this.memberService.addMember({ name } as Member)
    .subscribe(member => {
      this.members.push(member);
    });
  }

  delete(member: Member): void{
    // 選択されているmemberを取り除く
    this.members = this.members.filter(m => m !== member);
    this.memberService.deleteMember(member).subscribe();
  }
}
