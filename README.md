# OsakaNa DM 4

APIを起動する。

```sh
docker-compose up -d
```

Reactで作ったデモを動かす。

```
yarn install
yarn start
```

Elmを使う準備をする。

```sh
npm install -g elm
```

おさかな用のディレクトリを作って初期化する。

```sh
mkdir osakana-elm
cd osakana-elm
elm init
```

reactorを起動する。

```sh
elm reactor
```

http://localhost:8000/ へアクセスする。

