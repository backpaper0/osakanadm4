# OsakaNa DM 4

## 準備

Elmを使う準備をしましょう。

```sh
npm install -g elm elm-test elm-format
```

おさかな用のディレクトリを作って初期化しましょう。

```sh
mkdir osakana-elm
cd osakana-elm
elm init
```

reactorを起動しましょう。
ちなみにreactorというのはなんか便利なやつです。

```sh
elm reactor
```

http://localhost:8000/ へアクセスしてください。

なんかそれっぽい画面が表示されたらOKです。

[お使いのエディタにプラグイン入れましょう](https://guide.elm-lang.org/install.html#configure-your-editor)。

## Hello, world!

やっぱりまずはHello, world!ですよね。

`src/HelloWorld.elm`を作成してエディタで開きましょう。

次のコードをコピペして保存してください。

```elm
module HelloWorld exposing (..)

import Html exposing (..)


main =
    h1 [] [ text "Hello, world!" ]
```

http://localhost:8000/src/HelloWorld.elm へアクセスしてください。

Hello, world!できましたね！

## 解説

```elm
module HelloWorld exposing (..)
```

`HelloWorld`というモジュールを定義して、変数や関数を全て公開する的な意味です。
JavaScriptの`module.exports = ...`とか`export default ...`みたいなやつです。

```elm
import Html exposing (..)
```

`Html`モジュールの変数や関数を全て使うぞっ、的な宣言です。
JavaScriptの`require(...)`とか`import ... from "..."`みたいなやつです。

```elm
main =
    h1 [] [ text "Hello, world!" ]
```

`main`という名前の変数を定義しています。

変数の本体は`h1`関数の戻り値です。

`h1`関数はHTMLの`h1`要素を表す関数で、引数を2つ取ります。
1つは属性のリスト、もう1つは中身のリストです。

属性のリストは`[]`、つまり空っぽです。
次の`import`を追加して、

```elm
import Html.Attributes exposing (..)
```

`main`を次のように変えてみましょう。

```elm
main =
    h1 [ style "color" "blue" ] [ text "Hello, world!" ]
```

ブラウザをリロードすると文字が青くなったはずです。

- [Elm言語の解説](https://guide.elm-lang.org/core_language.html)
- [Html.h1のAPIドキュメント](https://package.elm-lang.org/packages/elm/html/latest/Html#h1)
- [Html.Attributes.styleのAPIドキュメント](https://package.elm-lang.org/packages/elm/html/latest/Html-Attributes#style)

## Browser.sandoxを使ってみよう

星マークをクリックしたら「いいね！」の件数が増えるやつを書いてみましょう。

まずはHTMLを組み立てます。

```elm
module OnClickDemo exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


main =
    let
        css =
            [ style "cursor" "pointer"
            , style "border" "0"
            , style "background-color" "transparent"
            , style "font-size" "large"
            , style "color" "gray"
            ]
    in
        div []
            [ button css [ text "☆" ]
            , span [] [ text "いいね！0件" ]
            ]
```

次に[Browser.sandbox](https://package.elm-lang.org/packages/elm/browser/latest/Browser#sandbox)を使ってみます。

とりあえず次のような感じに書いてみてください。

```elm
module OnClickDemo exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)


init =
    ()


view () =
    let
        css =
            [ style "cursor" "pointer"
            , style "border" "0"
            , style "background-color" "transparent"
            , style "font-size" "large"
            , style "color" "gray"
            ]
    in
        div []
            [ button css [ text "☆" ]
            , span [] [ text "いいね！0件" ]
            ]


update () () =
    ()


main =
    Browser.sandbox { init = init, view = view, update = update }
```

やたら`()`で誤魔化していますね！

ここで`Browser.sandbox`の定義を見てみましょう。

```
sandbox :
    { init : model
    , view : model -> Html msg
    , update : msg -> model -> model
    }
    -> Program () model msg
```

ここに書かれている`model`と`msg`は仮型変数です。

`model`はアプリケーションの値、`msg`はイベントを表していると思ってください。

`init`は初期値です。

`view`は値を受け取って`Html`を返す関数です。

`update`は`msg`と`model`を受け取って新しい`model`を返す関数です。
これはReduxでいう`reducer`関数です。

## modelとmsgを定義しよう

まずは`model`を定義してみましょう。

このアプリケーションが持つ値は「いいね！」の件数です。

次のように単に`Int`のエイリアスにしても良いですが、

```elm
type alias FavModel =
    Int
```

あまり単一の値だけで済むアプリケーションは見たことないですね。

というわけでレコードを使いましょう。

```elm
type alias FavModel =
    { count : Int }
```

次は`msg`です。

`msg`はイベントのようなものです。
このアプリケーションが発火させるイベントは星マークを押したときのものです。

```elm
type FavMsg
    = ClickStar
```

`init`、`view`、`update`もちょろっと変更しましょう。


```elm
init =
    FavModel 0


view model =
    let
        css =
            [ style "cursor" "pointer"
            , style "border" "0"
            , style "background-color" "transparent"
            , style "font-size" "large"
            , style "color" "gray"
            ]
    in
        div []
            [ button css [ text "☆" ]
            , span [] [ text "いいね！0件" ]
            ]


update msg model =
    model
```

## init、view、updateの型アノテーションを書こう

Elmは割と型推論してくれますが、トップレベルに書く変数・関数ぐらいは型アノテーションを書いた方が良いです。

型アノテーションがない場合のエラーメッセージと型アノテーションがある場合のエラーメッセージだと後者の方が分かりやすいです。

```elm
init : FavModel

view : FavModel -> Html FavMsg

update : FavMsg -> FavModel -> FavModel
```

## modelが持つ値を表示しよう

「いいね！」の件数を今はハードコーディングしています。
これを`model`から取るようにしましょう。

```elm
view : FavModel -> Html FavMsg
view { count } =
    let
        css =
            [ style "cursor" "pointer"
            , style "border" "0"
            , style "background-color" "transparent"
            , style "font-size" "large"
            , style "color" "gray"
            ]
    in
        div []
            [ button css [ text "☆" ]
            , span [] [ text "いいね！", text <| String.fromInt count, text "件" ]
            ]
```

## 星をクリックして「いいね！」の件数を増やすやつを追加してみよう

WIP

## APIを呼び出す

APIを起動する。

```sh
docker-compose up -d
```

Reactで作ったデモを動かす。

```
yarn install
yarn start
```

WIP
