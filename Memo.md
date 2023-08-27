# Angular
Angularを使った開発手順のメモ

ローカルでの作業のすすめ方は、
+ StackBlitz環境
+ ローカルサーバを立ち上げてVSCode上で編集していく

の２パターン。今回はVSCode版

## windows(WSL) または linux での環境構築法
バージョン管理を行う必要がない場合はNode.jsをそのままダウンロードしてインストールを行うが、
アプリケーション開発を行う場合は基本的にバージョン管理を行うことが多い。
なのでNode.jsだけでなく、バージョン管理ツールも一緒にインストールを行う。
### homebrewのインストール
*追記； homebrewからnodebrewをインストールするのは良くなさそう…

https://brew.sh/index_ja.htmlの公式サイトを参考に、

```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```

インストールができているか ```brew --version``` で確認する

### nodebrewのインストール（追記版）
https://github.com/hokaccha/nodebrew
を参考に

    curl -L git.io/nodebrew | perl - setup

    export PATH=$HOME/.nodebrew/current/bin:$PATH

    source ~/.bashrc

    nodebrew help



### nodebrewのインストール

    brew install nodebrew

インストール直後の状態だとnodebrewへのパスが設定されていないため環境変数PATHに実行ファイルまでのパスを追加する
下記設定を行うことでターミナル上で```nodebrew xx```といったコマンドが実行できるようになる

    # home/.bash_profileが作成されていない場合、homeディレクトリに移動後に先にこちらのコマンドを実行する
    touch ~/.bash_profile

    # vimで.bash_profileを編集する
    vim ~/.bash_profile

    # 実行直後にiキーを押して挿入モードに移行後、以下の行を追加
    # 追加後にEscキーを押してノーマルモードに戻った後、:wqで保存してvimを終了させる
    export PATH=$HOME/.nodebrew/current/bin:$PATH

完了後、.bash_profileを再読み込みする
    
    source ~/.bash_profile

ここで、```nodebrew --version```で確認してみると、
nodebrew not foundのエラーが表示されてので以下を実行した

    sudo apt-get install build-essential

    echo 'eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)' >> /home/`whoami`/.profile

    eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)

すると、インストールが完了した

### Node.jsの最新バージョンもしくは指定したバージョンのインストールおよび切り替え

    # もしすでにインストールしている場合
    sudo apt remove nodejs

    # 最新バージョンをインストールする場合
    nodebrew install-binary latest

    # 安定バージョンをインストールする場合
    nodebrew install stable 


    # バージョンを指定してインストールする場合
    nodebrew install-binary 12.4.0

    # 現在インストール可能なバージョンを表示する
    nodebrew ls-remote

完了後、インストールされたバージョンを確認する

    nodebrew list

    v20.5.1
    current: none

初回インストール時または、バージョンを切り替える場合は以下のコマンドを使用する

    nodebrew use v20.5.1

正常に切り替えができているかを確認する

    nodebrew list

    v20.5.1

    current: v20.5.1

## windowsでの環境構築法

Nodeのバージョン管理用に[Volta](https://docs.volta.sh/guide/getting-started)を採用。URL先の公式のインストーラからインストールする。

### Node.js v15をインストール

    volta install node@15
    node -v
    v15.14.0

### 最新版をインストールしたい場合

    volta install node

### インストールしたNode.jsのバージョンを確認

    #バージョンの一覧を表示
    volta list all
    ⚡️ User toolchain:
        Node runtimes:
            v12.13.1
            v12.22.12
            v15.14.0 (default)
            v16.15.0
        Package managers:
        Packages:
    #デフォルトのバージョンを表示
    node -v
    v15.14.0

### アンインストール
voltaには```uninstall```のコマンドが現時点で使用できないため、直接特定のバージョンのNode.jsを削除する。具体的には、%LOCALAPPDATA%\Volta\tools\image\node<バージョン>のディレクトリを削除。

### ディレクトリごとにNode.jsのバージョンを固定する
プロジェクトのディレクトリまで移動して```volta pin```コマンドを実行

    volta pin node@12.13.1
    success: pinned node@12.13.1 (with npm@6.12.1) in package.json

するとpackage.jsonに下のように追記され、これによって、プロジェクトのメンバー全員がNode.jsの同じバージョンを自動的に使える。

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

### Componentの作成
ターミナルで

    ng generate component コンポーネント名

とたたく

### Property初期化に関するエラー
tsconfig.jsonの"compilerOptions"に「"strictPropertyInitialization": false」を追記するとプロパティ初期化を厳格にチェックしなくなるためエラーが表示されなくなる。
これを追記しないとすべての変数に初期化が必要となる。

そもそも、

tsconfig.jsonが存在しない場合はプロパティ初期化のエラーは表示されないので、エラー表示を確認する場合はtsconfig.jsonを追加する必要がある。

npx tsc --initを実行すると簡単にtsconfig.jsonを追加できる。

ターミナルで

    npm i -D typescript
    npx tsc --init

とたたく。

### データの受け渡し用の成形
ターミナルで

    ng generate service 受け渡したいデータ名

とたたく。

### ルーティング用のモジュールの作成
ターミナルで

    ng generate module モジュール名 --flat --module=app

とたたく。

--flatオプションはappディレクトリ直下にファイルのみを作成する。

--moduleオプションはapp.moduleのimportモジュールに自動で追加するようにしてくれる。

### HTTPクライアントモジュール
データサーバをシミュレートする用のデータサーバ設定

ターミナルで

    npm install angular-in-memory-web-api --save

とたたく。

