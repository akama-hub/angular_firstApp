# Angular
Angularを使った開発手順のメモ

ローカルでの作業のすすめ方は、
+ StackBlitz環境
+ ローカルサーバを立ち上げてVSCode上で編集していく

の２パターン。今回はVSCode版


## おすすめのVSCodeの拡張機能
+ Japanese Language Pack for VS Code 
+ Angular Essentials
+ angular2-inline
+ Angular 2 TyeScript Emmet
+ TypeScript Importer

### VSCodeのターミナルでスクリプトを実行するための設定
settings.jsonで以下のコードを追加する

    "terminal.integrated.env.windows": {
        "PSExecutionPolicyPreference": "RemoteSigned"
    }

その後、再起動

## プロジェクトの作成・実行手順

### プロジェクトの立ち上げ方
ターミナルで

    ng new プロジェクト名

ルーティングについては特に何も入力せず、Enterを教えていくとプロジェクトが立ち上がる

### サーバの立ち上げ方
ターミナルで

    npm start

これはｍpackage.json内で

    "start": "ng serve",

と定義されており、実際には

    ng serve

が実行されたのと同義