# SimpowerNewTab

SimpowerNewTabは、新しいタブを便利にカスタマイズできる軽量なツールです。メモ、ToDoリスト、リンク集を一箇所にまとめて管理できるシンプルな新規タブページを提供します。

## 特徴

- **メモ機能**: 簡単なメモを保存しておけます。
- **ToDoリスト**: タスクを追加、削除、並べ替え可能。進捗管理に便利です。
- **リンク集**: よく使うリンクを登録して整理できます。ドラッグ＆ドロップで順序を変更可能。
- **テーマ切り替え**: DaisyUIを活用した多彩なテーマを選択可能。
- **背景カスタマイズ**: 背景色や画像を自由に設定できます。
- **検索機能**: Google、Bing、DuckDuckGoなどの検索エンジンを選択可能。

## インストールと設定

1. **GitHub Pagesを利用**  
   SimpowerNewTabはGitHub Pagesでホストされています。以下のURLにアクセスしてください。  
   [https://distnovelist.github.io/SimpowerNewTab/](https://distnovelist.github.io/SimpowerNewTab/)

2. **New Tab Redirectの設定**  
   新しいタブでSimpowerNewTabを表示するには、以下の手順で設定を行ってください。

   - **Chrome、Edgeの場合**:
     1. [New Tab Redirect](https://chromewebstore.google.com/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna?hl=ja)をインストールします。
     2. 拡張機能の設定画面を開き、リダイレクト先に以下のURLを入力します。  
        ```
        https://distnovelist.github.io/SimpowerNewTab/
        ```
     3. 設定を保存します。

   - **Firefoxの場合(未確認)**:
     1. [Custom New Tab Page](https://addons.mozilla.org/en-US/firefox/addon/custom-new-tab-page/)をインストールします。
     2. 拡張機能の設定画面でリダイレクト先を設定します。

## 使用方法

1. **メモ**:
   - メモ欄に自由にテキストを入力できます。
   - 入力内容は自動的に保存されます。

2. **ToDoリスト**:
   - 「追加」ボタンで新しいタスクを追加します。
   - チェックボックスでタスクの完了状態を切り替えられます。
   - タスクをドラッグ＆ドロップして順序を変更できます。

3. **リンク集**:
   - 名前とURLを入力してリンクを追加します。
   - リンクをドラッグ＆ドロップして順序を変更できます。
   - 編集や削除も簡単に行えます。

4. **テーマのカスタマイズ**:
   - 設定ボタンをクリックしてテーマを変更できます。
   - それぞれの配色は[daisyUI Themes](https://daisyui.com/docs/themes/#list-of-themes)を参照してください。

すべてのデータはlocalStorageに保存され、すべてのタブでリアルタイムに同期されます。

## 開発者向け情報

### ソースコード
ソースコードはGitHubリポジトリで公開されています。  
[https://github.com/distnovelist/SimpowerNewTab](https://github.com/distnovelist/SimpowerNewTab)

### 開発環境のセットアップ
1. リポジトリをクローンします。
   ```bash
   git clone https://github.com/distnovelist/SimpowerNewTab.git
   ```
2. 必要な依存関係をインストールします（必要に応じて）。
3. ローカルサーバーで動作を確認します。

### 貢献
バグ報告や機能リクエストは[Issues](https://github.com/distnovelist/SimpowerNewTab/issues)で受け付けています。プルリクエストも歓迎します！

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。