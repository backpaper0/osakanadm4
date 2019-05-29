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

[http://localhost:8000/](http://localhost:8000/) へアクセスしてください。

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

変数の本体は[h1](https://package.elm-lang.org/packages/elm/html/latest/Html#h1)の戻り値です。

`h1`はHTMLの`h1`要素を表す関数で、引数を2つ取ります。
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
[style](https://package.elm-lang.org/packages/elm/html/latest/Html-Attributes#style)はCSSが書ける関数です。

## Elmの関数を少し学ぶ

Elmを学ぶには次のドキュメントが役立ちます。
今日も別タブで開いておいてください。

- [Official Guide](https://guide.elm-lang.org/)
- [Elm Syntax](https://elm-lang.org/docs/syntax)
- [Package Docs](https://package.elm-lang.org/)

ここではElmの関数を少し学びましょう。

新しく`src/FunctionDemo.elm`を作成して次のコードをコピペしてください。

```elm
module FunctionDemo exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


foods =
    [ "Apple", "Banana", "Chocolate", "Donut", "Eggs Benedict" ]


elements =
    [ li [] [ text "Apple" ]
    , li [] [ text "Banana" ]
    , li [] [ text "Chocolate" ]
    , li [] [ text "Donut" ]
    , li [] [ text "Eggs Benedict" ]
    ]


main =
    ul [] elements
```

まずは`foods`を`elements`へ変換してみましょう。

ヒント：[List.map](https://package.elm-lang.org/packages/elm/core/latest/List#map)と[List.singleton](https://package.elm-lang.org/packages/elm/core/latest/List#singleton)を使います。

答えが見えたらアレなので行数を稼いでおきます。

```
(´・ω・｀)
(´・ω・)
(´・ω)
(   ´・)
(     ´)
（      ）
（｀     ）
（・｀   ）
（ω・｀）
（・ω・｀）
(´・ω・｀)
(´・ω・)
(´・ω)
(   ´・)
(     ´)
（      ）
（｀     ）
（・｀   ）
（ω・｀）
（・ω・｀）
(´・ω・｀)
(´・ω・)
(´・ω)
(   ´・)
(     ´)
（      ）
（｀     ）
（・｀   ）
（ω・｀）
（・ω・｀）
ｷﾀ━━━━━━(ﾟ∀ﾟ)━━━━━━ !!!!!
```

答え：こんな感じです。

```elm
texts =
    List.map text foods


nodes =
    List.map List.singleton texts


elements =
    List.map (li []) nodes
```

これを一行で書くと次のようになります。

```elm
elements =
    List.map (li []) (List.map List.singleton (List.map text foods))
```

ちょっと見辛いですね。

ここで2つの関数`A -> B`と`B -> C`があるとします。
Elmではこの2つの関数を合成して`A -> C`にできます。

関数合成は`>>`を使います。

```elm
elements =
    List.map (text >> List.singleton >> li []) foods
```

さて、次は名前に`"e"`を含む要素だけに絞り込んでから`li`要素を組み立ててみましょう。

ヒント：[List.filter](https://package.elm-lang.org/packages/elm/core/latest/List#filter)と[String.contains](https://package.elm-lang.org/packages/elm/core/latest/String#contains)を使います。

また答えが見えたらアレなので行数を稼いでおきます。

```
(´・ω・｀)
(´・ω・)
(´・ω)
(   ´・)
(     ´)
（      ）
（｀     ）
（・｀   ）
（ω・｀）
（・ω・｀）
(´・ω・｀)
(´・ω・)
(´・ω)
(   ´・)
(     ´)
（      ）
（｀     ）
（・｀   ）
（ω・｀）
（・ω・｀）
(´・ω・｀)
(´・ω・)
(´・ω)
(   ´・)
(     ´)
（      ）
（｀     ）
（・｀   ）
（ω・｀）
（・ω・｀）
ｷﾀ━━━━━━(ﾟ∀ﾟ)━━━━━━ !!!!!
```

答え：こんな感じです。

```elm
elements =
    List.map (text >> List.singleton >> li []) (List.filter (String.contains "e") foods)
```

処理の順番は`filter`してから`map`するのにコード上では`map`が`filter`よりも先に来ていますね。

これは`|>`を使うことで処理の順番通りに書けるようになります。

```elm
elements =
    foods |> List.filter (String.contains "e") |> List.map (text >> List.singleton >> (li []))
```

これでみなさんは`filter`と`map`、`>>`と`|>`を知りました。
いい感じです。

あとは必要になったら調べながら進みましょう。

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

単一の値だけで済むアプリケーションはあまり見たことないですね。

というわけでレコードを使いましょう。

```elm
type alias FavModel =
    { count : Int }
```

- [レコード](https://elm-lang.org/docs/records)

次は`msg`です。

`msg`はイベントのようなものです。
このアプリケーションが発火させるイベントは星マークを押したときのものです。

`msg`はカスタム型として定義します。

```elm
type FavMsg
    = ClickStar
```

カスタム型はTypeScriptでいうUnion型みたいなやつです。
Scalaだと`sealed`と`case class`を組み合わせたものっぽいですね。
あとは直和型とかバリアントって呼ばれてるやつっぽいやつです。

- [カスタム型](https://guide.elm-lang.org/types/custom_types.html)

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

引数はパターンマッチでレコードを分解して受け取れます。
これはJavaScriptでも似たようなことができますね。

## 星をクリックして「いいね！」の件数を増やすやつを追加してみよう

クリックイベントを使うために次の`import`を追加してください。

```elm
import Html.Events exposing (..)
```

星ボタンの属性リストに`onClick`を追加します。

今、星ボタンの属性リストには変数`css`が設定されています。
この変数`css`にイベントハンドラを追加しても良いんですが、`css`って名前にしたのでこのまま置いておきます。

ここでは新しく`handler`という変数を導入して、`css`と合わせて`attrs`という変数にしちゃいましょう。
星ボタンに渡している`css`を`attrs`に変えてください。

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

        handler =
            onClick ClickStar

        attrs =
            handler :: css
    in
        div []
            [ button attrs [ text "☆" ]
            , span [] [ text "いいね！", text <| String.fromInt count, text "件" ]
            ]
```

[onClick](https://package.elm-lang.org/packages/elm/html/latest/Html-Events#onClick)は`msg`を受け取って`Attribute msg`を返す関数です。
`msg`は仮型引数です。

ここでは実型引数が`FavMsg`です。
星ボタンをクリックしたことを表すのは`ClickStar`なので、`onClick`には`ClickStar`を渡しています。

イベントのハンドリングは`update`で行います。
今回は`ClickStar`イベントを受け取って`model`の`count`に1足しましょう。

```elm
update : FavMsg -> FavModel -> FavModel
update msg model =
    case msg of
        ClickStar ->
            { model | count = model.count + 1 }
```

`case of`でカスタム型のパターンマッチができます。

それから新しい`model`を構築しているところに注目してください。

```elm
{ model | count = model.count + 1 }
```

これは`model`をベースにして`count`だけを変更しています。
今は`count`しかないので便利さを実感できませんが、もっとたくさんの値を持つアプリケーションを作るときは便利です。

## HTTPリクエストを行う

HTTPリクエストを行うには`Browser.sandbox`ではなくて[Browser.element](https://package.elm-lang.org/packages/elm/browser/latest/Browser#element)を使う必要があります。

定義を見てみましょう。

```
element :
    { init : flags -> ( model, Cmd msg )
    , view : model -> Html msg
    , update : msg -> model -> ( model, Cmd msg )
    , subscriptions : model -> Sub msg
    }
    -> Program flags model msg
```

`sandbox`と比べると……

`init`は型引数`flags`を取るようになっています。
また、戻り値は`model`ではなく`model`と`Cmd msg`のタプルです。

`view`は変わりなしですね。

`update`は戻り値が`model`と`Cmd msg`のタプルになっています。

それから新しく`subscriptions`という関数を取るようになっています。

新しい要素がいくつか出てきましたね。

- `flags`
- `Cmd msg`
- `subscriptions`
- `Sub msg`

`flags`はJavaScriptの世界からこんにちはできる初期値です。
ElmコードをJavaScriptへビルドしてHTMLファイルから読み込んで使おうとすると次のようなコードになります。

```html
<div id="root"></div>
<script>
  const node = document.getElementById("root");
  const app = Elm.Main.init({ node });
</script>
```

この`init`に`flags`を渡せるのです。

```html
<div id="root"></div>
<script>
  const node = document.getElementById("root");
  const flags = "Hello, world!";
  const app = Elm.Main.init({ node, flags });
</script>
```

ちなみにElmコードをJavaScriptへビルドするには次のコマンドで行います。

```sh
elm make src/Main.elm --output main.js
```

`Cmd msg`は非同期処理や副作用を伴う処理に使われるやつです。
非同期でアレした結果や副作用をアレした結果を`msg`にしてアレすると`update`が呼ばれます。

`subscriptions`と`Sub msg`は今日は使わないし解説面倒なので省略します。
まあ、それを言うと`flags`も使わないんですけどね、でも解説しちゃいましたね。
`subscriptions`と`Sub msg`は以前[ライフゲームを作った時に使った](https://github.com/backpaper0/elm-sandbox/blob/2371825cdf35c8ad0ae519345c999177f0979870/sandbox/src/LifeGame.elm#L187-L189)ので参考にしてみてください。

それはそうとHTTPリクエストしてみましょう。
`control + c`で`reactor`を止めて`elm install elm/http`してから、また`reactor`を起動しましょう。

次の内容で`hello.json`を作ってください。

```json
{"message":"Hello, world!"}
```

[http://localhost:8000/hello.json](http://localhost:8000/hello.json)でHTTP使ってアクセスできます。
このファイルをHTTPで取ってくるコードを書いてみましょう。

まずは元となる画面を準備します。
単にメッセージとボタンが表示されているだけのものです。
`Browser.element`を使用していることに注目してください。

```elm
module HttpDemo exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


type alias Model =
    { message : String }


type Msg
    = Noop


init : () -> ( Model, Cmd Msg )
init () =
    ( Model "Initial message", Cmd.none )


view : Model -> Html Msg
view { message } =
    div []
        [ p [] [ text message ]
        , p []
            [ button [] [ text "Click me !" ]
            ]
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main =
    Browser.element { init = init, view = view, update = update, subscriptions = subscriptions }
```

ここにHTTPリクエストの処理を足していきます。

まず`import`してください。

```elm
import Http
```

次に`onClick`で`msg`を発行させます。

`Msg`に`GetHello`を追加して`onClick`で発行するようにしてください。

次に`update`で`GetHello`をハンドリングします。

```elm
update msg model =
    case msg of
        GetHello ->
            ( model, Http.get { url = "/hello.json", expect = Http.expectString GotHello } )
```

[Http.get](https://package.elm-lang.org/packages/elm/http/latest/Http#get)は`Cmd msg`を返します。

`url`と`expect`を指定します。
`expect`は期待するレスポンスの形を指定するところです。
今回は`String`を期待しています。

[Http.expectString](https://package.elm-lang.org/packages/elm/http/latest/Http#expectString)の定義をみてみましょう。

```
expectString : (Result Error String -> msg) -> Expect msg
```

`Result Error String`を受け取って`msg`を返す関数を受け取って`Expect msg`を返すようになっています（この`Error`は`Http.Error`です）。

[Result error value](https://package.elm-lang.org/packages/elm/core/latest/Result)は他の言語では`Either`と呼ばれるものに似ています。

`Result Error String`を受け取る`GotHello`を定義しましょう。

```elm
type Msg
    = GetHello
    | GotHello (Result Http.Error String)
```

それにしても`onClick`で`msg`投げたと思ったらまた`GotHello`を投げるんかい、と思ったかもしれません。

ここまでの処理の流れは次の通りです。

1. `onClick`で`GetHello`を発行する
2. `update`で`GetHello`を受け取ってHTTPリクエストを行う
3. レスポンスが返ってきたらボディを`String`の値にして`GotHello`を発行する
4. `update`で`GotHello`を受け取って`model`を更新する

「ここまでの処理の流れ」と言ったけど最後のやつはまだ書いていませんでしたね。
というわけで`GotHello`をハンドリングしましょう。

```elm
update msg model =
    case msg of
        GetHello ->
            ( model, Http.get { url = "/hello.json", expect = Http.expectString GotHello } )

        GotHello (Ok message) ->
            ( { model | message = message }, Cmd.none )

        GotHello (Err _) ->
            ( model, Cmd.none )
```

`Err`の時はエラー処理を書くべきですが、今回は省略します。

## JSONデコードする

HTTPで取得したやつはJSONです。
今はそのまま表示していますが、せっかくなのでデコードしましょう。

`reactor`を止めて`elm install elm/json`しましょう。

JSONを受け取る場合は`Http.get`の`expect`に`Http.expectString`ではなく[Http.expectJson](https://package.elm-lang.org/packages/elm/http/latest/Http#expectJson)を使います。

`Http.expectJson`の定義をみてみましょう。

```
expectJson : (Result Error a -> msg) -> Decoder a -> Expect msg
```

`Result Http.Error a`を受け取って`msg`を返す関数と`Decoder a`を受け取って`Expect msg`を返す関数ですね。

`a`は仮型変数です。
JSONをデコードして求められる任意の型ですね。

今回は`message`のみを持つレコードを定義してそれを使いましょう。

```elm
type alias Hello =
    { message : String }
```

次はデコーダーを定義します。
まず`import`してください。

```elm
import Json.Decode as D
```

`Json.Decode`は頻出するので`D`という別名を付けています。
いやいや`D`て！と思ったら他の名前でも構いません。

`message`というフィールドを取り出すので[Json.Decode.field](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#field)を使います。
`Json.Decode.field`は`String`と`Decoder a`を受け取って`Decoder a`を返す関数です。
受け取る`String`はフィールド名、`Decoder a`はフィールドの型です。

`message`フィールドは`String`なので[Json.Decode.string](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#string)を使います。

最後に`Decoder string`を`Decoder Hello`に変換するため[Json.Decode.map](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#map)を使います。

というわけで`Decoder Hello`は次のように定義できます。

```elm
update msg model =
    let
        decoder =
            D.map Hello (D.field "message" D.string)
    in
```

`decoder`は`update`の中でしか使わないので`let in`を使用しています。

## Osakanagramを作る

ここまでで次のような知識を得ました。

- レコード、カスタム型、パターンマッチ
- `Browser.element`、`init`、`view`、`update`、`subscriptions`
- `Http`
- `Json.Decode`

これだけ知ったなら**Osakanagram**を作れるはずです。

Osakanagramの参照実装をReactで作ってみました。
同じものをElmを使って実装してみましょう。

## Osakanagram参照実装を起動する

まずAPIを起動しましょう。
Dockerイメージを用意しています。
あと`docker-compose.yml`も用意しているので起動は楽ちんです。

```sh
docker-compose up -d
```

参照実装を起動しましょう。

```
yarn install
yarn start
```

[http://localhost:3000/](http://localhost:3000/)にアクセスしてみてください。
Osakanagramが表示されましたね。

星マークをクリックしてみてください。
「いいね！」の件数が増えますよね。
無限に増やせます。
嘘です。
オーバーフローするまでは増やせます。

それではコードを書きましょう。
