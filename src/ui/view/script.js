'use strict'

const titlebar = require('./titlebar/titlebar');
const preview = require('./preview/preview');


function render(mdText) {
    document.getElementById('markdown').innerHTML = preview.preview(mdText);
}

window.addEventListener("load",()=>{

    render(mdTextSample);
});

const mdTextSample = "# 見出し1（h1）\n\
見出し1（h1）  \n\
=============  \n\
\n\
## 見出し2（h2)\n\
\n\
見出し2（h2）\n\
-------------\n\
\n\
### 見出し3\n\
\n\
#### 見出し4\n\
\n\
##### 見出し5\n\
\n\
###### 見出し6\n\
\n\
---\n\
\n\
ここは段落です。♪もーもたろさん もーもたーろさん おっこしーにつっけたーちーびまーるこー\n\
\n\
ここは段落です。  \n\
↑半角スペース2個で強制改行しています。  \n\
♪もーもたろさん もーもたーろさん おっこしーにつっけたーちーんあーなごー\n\
\n\
- **強い強調（strong）です。** __これも強い強調です。__ `<strong>`strongタグです。`</strong>`\n\
- *強調（em）です。* _これも強調です。_ 斜体の`<em>`タグになります。\n\
- ***強調斜体です。*** ___強調斜体です。___ `<strong>`＋`<em>`タグになります。\n\
\n\
\n\
> 引用（Blockquote）です\n\
\n\
> > 引用のネストです\n\
\n\
> 上に一行空けないとネストのままです\n\
\n\
引用（Blockquote）の中にはMarkdown要素を入れられます\n\
\n\
> ## 見出し\n\
> \n\
> 1. 数字リスト\n\
> 2. 数字リスト\n\
\n\
## エスケープ文字\n\
\n\
\*アスタリスクをバックスラッシュでエスケープ\*\n\
\n\
\## 見出しハッシュ文字をエスケープ\n\
\n\
HTMLタグをバックスラッシュでエスケープ→（\<p>）\n\
\n\
HTMLをバッククォートでインラインコード→（`<p>`）\n\
\n\
## 水平線（`<hr>`）各種\n\
\n\
アスタリスク3個半角スペース空けて\n\
\n\
* * *\n\
アスタリスク3個以上\n\
\n\
******\n\
ハイフン半角スペース空けて\n\
\n\
- - -\n\
続けてハイフン3個以上\n\
\n\
-------------------\n\
\n\
## リスト\n\
\n\
- ハイフン箇条書きリスト\n\
+ プラス箇条書きリスト \n\
* 米印箇条書きリスト\n\
    - 二階層め・箇条書きリスト\n\
      - 三階層め・箇条書きリスト\n\
       - 四階層め・箇条書きリスト\n\
- 箇条書きリスト\n\
\n\
---\n\
\n\
1. 番号付きリスト\n\
	1. 二階層め・番号付きリスト1\n\
	1. 二階層め・番号付きリスト2\n\
1. 番号付きリスト2\n\
	1. 二階層め・番号付きリスト1\n\
		1. 三階層め・番号付きリスト1\n\
		1. 三階層め・番号付きリスト2\n\
  		1. 四階層め・番号付きリスト1\n\
	1. 二階層め・番号付きリスト2\n\
1. 番号付きリスト3\n\
\n\
\n\
定義リストタイトル\n\
: 定義リスト要素1\n\
: 定義リスト要素2\n\
: 定義リスト要素3\n\
\n\
## コードブロック\n\
\n\
```\n\
バッククォート or 半角チルダ3個でくくります。\n\
###ここにはMarkdown書式は効きません\n\
/* コメント */\n\
testtest // コメント\n\
```\n\
\n\
~~~\n\
<!DOCTYPE html>\n\
<head>\n\
<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n\
<title>ニョロニョロ囲みhtml</title>\n\
/* コメント */\n\
~~~\n\
\n\
```\n\
<!DOCTYPE html>\n\
<head>\n\
<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n\
<title>バッククォート囲みhtml</title>\n\
```\n\
\n\
```\n\
body { display: none; } /* バッククォート囲みcss */\n\
// コメント\n\
```\n\
\n\
    // 先頭に半角スペース4つでcode囲い\n\
    <?php if (is_tag()){ $posts = query_posts($query_string . '&showposts=20'); } ?>\n\
\n\
バッククォート1個ずつで囲むとインラインのコード（`<code></code>`）です。`body { visibility: hidden; }`\n\
\n\
## リンク\n\
\n\
markdownでテキストリンク [WIRED.jp](http://wired.jp/ \"WIRED.jp\")\n\
\n\
<カッコ>でくくってリンク <http://wired.jp/>\n\
\n\
定義参照リンクです。SNSには [Twitter] [1] や [Facebook] [2] や [Google+] [3]  などがあります。\n\
\n\
  [1]: https://twitter.com/        \"Twitter\"\n\
  [2]: https://ja-jp.facebook.com/  \"Facebook\"\n\
  [3]: https://plus.google.com/    \"Google+\"\n\
\n\
## 画像\n\
\n\
![うきっ！](http://mkb.salchu.net/image/salchu_image02.jpg \"salchu_image02.jpg\")\n\
\n\
## table\n\
\n\
| Left align | Right align | Center align |\n\
|:-----------|------------:|:------------:|\n\
| This       |        This |     This     |\n\
| column     |      column |    column    |\n\
| will       |        will |     will     |\n\
| be         |          be |      be      |\n\
| left       |       right |    center    |\n\
| aligned    |     aligned |   aligned    |\n\
\n\
（Kobitoのヘルプmdから拝借しました）\n\
\n\
# GFM\n\
\n\
## リンク\n\
\n\
URLそのまま貼り付け http://wired.jp/\n\
\n\
## 段落中の改行\n\
\n\
ここは段落です。\n\
↑returnで改行しています。\n\
♪もーもたろさん もーもたーろさん おっこしーにつっけたーちー○○ー○○ー\n\
\n\
## コードブロック\n\
\n\
バッククォートの開始囲みに続けて拡張子でシンタックスハイライト\n\
\n\
```html\n\
<!DOCTYPE html>\n\
<head>\n\
<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n\
<title>バッククォート囲みに拡張子付きhtml</title>\n\
/* コメント */\n\
```\n\
\n\
```css\n\
body { display: none; } /* コメント */\n\
```\n\
\n\
```php\n\
<?php if (is_tag()){ $posts = query_posts($query_string . '&showposts=20'); } ?>\n\
```\n\
\n\
## 取り消し線\n\
\n\
~~取り消し線（GFM記法）~~  \n\
<s>sタグです。</s>\n\
\n\
## 単語中のアンダースコアの無効\n\
\n\
GitHub_Flavored_Markdown_test_test\n\
\n\
## tasklist\n\
\n\
- [ ] task1\n\
- [ ] task2\n\
- [x] completed task\n\
\n\
---\n\
\n\
from [Markdown記法 表示確認用サンプル - Qiita](http://qiita.com/salchu/items/da81122ed50b35feda4d \"Markdown記法 表示確認用サンプル - Qiita\")"
