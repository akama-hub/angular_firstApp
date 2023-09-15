# Angular
Angularを使った開発手順のメモ

ローカルでの作業のすすめ方は、
+ StackBlitz環境
+ ローカルサーバを立ち上げてVSCode上で編集していく

の２パターン。今回はVSCode版

# A, windows(WSL) または linux での環境構築法
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

## Docker の環境構築

### Docker Engine のインストール
[ Docker の公式](https://docs.docker.jp/v1.9/engine/installation/ubuntulinux.html)
[ WSL2にdockerをインストール ](https://qiita.com/hkusaba/items/5b44248d758214f99e97)

Docker の公式GPG鍵を使ったインストール手順

```
# 古いバージョンのdockerを削除
$ sudo apt-get remove docker docker-engine docker.io containerd runc

# パッケージインデックスの更新とパッケージインストール
$ sudo apt-get update
$ sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Dockerの公式GPGキーを追加
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# stableのレポジトリを追加
$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 再度パッケージインデックスを更新し、DockerEngineをインストール
$ sudo apt-get update
$ sudo apt-get install -y docker-ce docker-ce-cli containerd.io
```

### Docker Compose のインストール
[Docker の公式](https://docs.docker.jp/v1.9/compose/install.html)
[GitHub 上にある Compose レポジトリのリリース・ページ ](https://github.com/docker/compose/releases)

+ WSL 上でのインストール
```
sudo curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
```


+ インストールを確認
```
$ docker-compose --version
docker-compose version: 1.5.1
```

※　もし “Permission denied” エラーが表示される場合は、/usr/local/bin ディレクトリに対する書き込み権限がない
```
$ chmod +x /usr/local/bin/docker-compose
```

### Docker 実行時

まず、docker の起動状態を確認
```
sudo service docker status
```

起動していなければ、以下の順に進む

docker を起動するために
```
sudo systemctl enable docker
sudo service docker start
```

試しにhello-world をしてみる
```
sudo docker run hello-world
```

### 2 回目以降の Docker 起動時 (WSL2 の場合) 

Dockerコマンドを叩くと以下のようなエラーが出てしまう。

```
$ docker ps
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

Dockerが起動できていない。
原因は、Dockerインストール後に起動させていないとか、Dockerを落としたのに起動処理を忘れているとか。
そのため、以下のコマンドで起動させれば解決する。

```
$ systemctl start docker
```

※ WSL 上で systemctl が動かない時の対処

```
$ systemctl
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```

PID1 の command が systemd ではなく /init になっている状態は systemctl が正常に動いていない
```
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0    896   528 ?        Sl   15:51   0:00 /init
```

二つ方法が有りそう

#### 1. WSL がSystemd をサポート

バージョンが 0.67.6 以上であれば、利用可能
```
wsl --version
```

wsl.confファイルに設定を追加
```
sudo vim /etc/wsl.conf

[boot]
systemd=true
```

```wsl.conf``` ファイルに設定を追加

その後、WSL で ```systemctl list-unit-files --type=service``` を実行し、Systemd が動いているのが確認できれば終了

#### 1. genie を利用

[genie を利用することで systemd を PID1 で動作させることができる](https://github.com/arkane-systems/genie)

```
# 「systemd-genie」パッケージのリポジトリーのGPGキーをダウンロード
sudo wget -O /etc/apt/trusted.gpg.d/wsl-transdebian.gpg https://arkane-systems.github.io/wsl-transdebian/apt/wsl-transdebian.gpg

sudo chmod a+r /etc/apt/trusted.gpg.d/wsl-transdebian.gpg

# 2 行追加
sudo vim /etc/apt/sources.list.d/wsl-transdebian.list
deb https://arkane-systems.github.io/wsl-transdebian/apt/ focal main
deb-src https://arkane-systems.github.io/wsl-transdebian/apt/ focal main

sudo apt update

sudo apt upgrade

sudo apt install -y systemd-genie

# 実行
genie -s

# エラー消去 (しなくても良いかも)
sudo rm -rf /etc/apt/sources.list.d/wsl-translinux.list
```

最後に~/.bashrcか~/.bash_profileに以下の内容を追記

```
if [ "`ps -eo pid,cmd | grep systemd | grep -v grep | sort -n -k 1 | awk 'NR==1 { print $1 }'`" != "1" ]; then
  genie -s
fi
```

### WSL2 + Docker 環境で動作が遅い理由
参考）
+ [Docker x Laravel めちゃくちゃ遅い Docker for Mac を爆速化する](https://qiita.com/ucan-lab/items/a88e2e5c2a79f2426163)
+ [「WSL2 + Docker」が遅いなら、速くすればいい](https://qiita.com/LemonmanNo39/items/e92ed9e3b9c812238006)
+ [Windows + WSL2 + docker + laravel を 10 倍速くする方法](https://www.aska-ltd.jp/jp/blog/197)

#### OS ファイル システム間でのファイルの読み込みが遅い
Windows と Linux では HDD のフォーマット形式が違います。
Windows は NTFS、Linux は EXT4 といった具合です。
主に耐障害性やセキュリティの設計思想から両者で違いが出ています。

#### 結論
プロジェクトの置く位置を
```
¥¥wsl$Ubuntu¥mnt¥
```
配下から
```
¥¥wsl$Ubuntu¥home¥
```
¥wsl$Ubuntu¥home¥移動して
そこから ```docker-compose up``` で起動するだけ！

## B, windowsでの環境構築法

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