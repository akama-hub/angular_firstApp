# Angular
Angularを使った開発手順のメモ

ローカルでの作業のすすめ方は、
+ StackBlitz環境
+ ローカルサーバを立ち上げてVSCode上で編集していく

の２パターン。今回はVSCode版

# windows(WSL) または linux での環境構築法
バージョン管理を行う必要がない場合はNode.jsをそのままダウンロードしてインストールを行うが、
アプリケーション開発を行う場合は基本的にバージョン管理を行うことが多い。
なのでNode.jsだけでなく、バージョン管理ツールも一緒にインストールを行う。

## 1. homebrewのインストール
*追記； homebrewからnodebrewをインストールするのは良くなさそう…

https://brew.sh/index_ja.htmlの公式サイトを参考に、

```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```

インストールができているか ```brew --version``` で確認する

## 2. nodebrewのインストール（追記版）
https://github.com/hokaccha/nodebrew
を参考に

    curl -L git.io/nodebrew | perl - setup

その後、```vim ~/.bashrc``` または ```code ~/.bashrc``` 等で.bashrcファイルを以下の内容を末尾に
追加する（立ち上げ時にパスを通さなくて済むように設定）

    export PATH=$HOME/.nodebrew/current/bin:$PATH
    export NODE_PATH=$HOME/.nodebrew/current/lib/node_modules

そして、編集内容のアップデート

    source ~/.bashrc

また、wslのデフォルトではbashを実行しないので、立ち上げ時に自動で実行してくれるように設定
```~/.bash_profile```に以下の内容が無ければ追加する。```~/.bash_profile```はログイン時に一度だけ実行され、```~/.bashrc```はシェルを起動するたびに実行される。

    # Get the aliases and functions
    if [ -f ~/.bashrc ]; then
            . ~/.bashrc
    fi

インストールできたか確認する。

    nodebrew help



~~### nodebrewのインストール~~

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

## 3.  Node.jsの最新バージョンもしくは指定したバージョンのインストールおよび切り替え

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

## 4. VSCode上のNode環境の設定
WSLの拡張機能を入れるだけ

## おすすめのVSCodeの拡張機能
+ Japanese Language Pack for VS Code 
+ Angular Essentials
+ angular2-inline
+ Angular 2 TyeScript Emmet
+ TypeScript Importer
+ WSL

### VSCodeのターミナルでスクリプトを実行するための設定
settings.jsonで以下のコードを追加する

    "terminal.integrated.env.windows": {
        "PSExecutionPolicyPreference": "RemoteSigned"
    }

その後、再起動

## プロジェクトの作成・実行手順

### 1. プロジェクトの立ち上げ方
ターミナルで

    ng new プロジェクト名

ルーティングについては特に何も入力せず、Enterを教えていくとプロジェクトが立ち上がる

### 2. サーバの立ち上げ方
ターミナルで

    npm start

これはｍpackage.json内で

    "start": "ng serve",

と定義されており、実際には

    ng serve

が実行されたのと同義

### 3. Componentの作成
ターミナルで

    ng generate component コンポーネント名

とたたく

### ※Property初期化に関するエラー
tsconfig.jsonの"compilerOptions"に「"strictPropertyInitialization": false」を追記するとプロパティ初期化を厳格にチェックしなくなるためエラーが表示されなくなる。
これを追記しないとすべての変数に初期化が必要となる。

そもそも、

tsconfig.jsonが存在しない場合はプロパティ初期化のエラーは表示されないので、エラー表示を確認する場合はtsconfig.jsonを追加する必要がある。

npx tsc --initを実行すると簡単にtsconfig.jsonを追加できる。

ターミナルで

    npm i -D typescript
    npx tsc --init

とたたく。

### 4. データの受け渡し用の成形
ターミナルで

    ng generate service 受け渡したいデータ名

とたたく。

### 5. ルーティング用のモジュールの作成
ターミナルで

    ng generate module モジュール名 --flat --module=app

とたたく。

--flatオプションはappディレクトリ直下にファイルのみを作成する。

--moduleオプションはapp.moduleのimportモジュールに自動で追加するようにしてくれる。

### 6. HTTPクライアントモジュール
データサーバをシミュレートする用のデータサーバ設定

ターミナルで

    npm install angular-in-memory-web-api --save

とたたく。