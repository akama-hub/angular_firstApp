import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MEMBERS } from '../mock-members';
// Memberのデータ取得用
import { MemberService } from '../member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{
  members: Member[];
  selectedMember: Member;

  // ディペンデンシーインジェクション
  constructor(private memberService: MemberService) {

  }

  // コンストラクターは自身の初期化に使われるため、外部データの取得に使うのはおかしい
  ngOnInit(): void{
    this.getMembers();
  }
  onSelect(member: Member): void { 
    this.selectedMember = member;
  }
  getMembers(): void{
    // Observableオブジェクトを使った非同期処理のデータ渡し
    this.memberService.getMembers().subscribe(members => this.members = members)
  }

}
