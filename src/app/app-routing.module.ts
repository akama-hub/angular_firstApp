import { NgModule, Component } from '@angular/core';

import { RouterModule , Routes} from '@angular/router' 
import { MembersComponent } from './members/members.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';

const routes: Routes = [
  // topページのpathを設定し、リダイレクト機能の設定
  // pathMatch: 'full'はpathが完全に一致しているか
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  // url名のpath, pathにアクセスした際にcomponentを表示する
  // この場合だと、呼び出し元のページのurlに /members をつけるとこのページが呼ばれるようになる
  { path: 'members', component: MembersComponent},

  { path: 'dashboard', component: DashboardComponent},
  // :id　:を使うことでそれ以降のパラメータで参照することができる
  { path: 'detail/:id', component: MemberDetailComponent}
];

@NgModule({
  imports: [
    // ルーターモジュールをアプリケーション全体に有効にする
    RouterModule.forRoot(routes)
  ],
  // exportはこのファイルを読み込む側のファイルでこの中のモジュールを使えるようにする
  exports: [
    // 
    RouterModule
  ]
})
export class AppRoutingModule { }
