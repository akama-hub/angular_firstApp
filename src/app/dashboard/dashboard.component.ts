import { Component } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  members: Member[] = [];

  constructor(private memberService: MemberService){
    this.getMembers();

  }

  getMembers():void{
    // getMembersでデータを取得して、subscribeでこのクラスのmembersに成形し、
    this.memberService.getMembers().subscribe(members => this.members = members.slice(1, 5));
  }

}
