# Taryou / Rangesa — Portfolio 98

Windows 95/98 のデスクトップ体験から着想を得た、個人開発者 Taryou / Rangesa のポートフォリオです。古典的なウィンドウ操作とモダンなレスポンシブ設計を組み合わせています。

## サイト

GitHub Pages: https://rangesa.github.io/Portfolio/

公開用の設定が有効な場合、main への反映後に GitHub Actions がビルド・デプロイします。

## 主な機能

- Windows 90年代風デスクトップ、スタートメニュー、タスクバー
- ウィンドウを開く・閉じる・最小化・最大化・ドラッグ移動
- 作品カテゴリの絞り込み、詳細表示、GitHubへのリンク
- スマートフォンではウィンドウを全画面表示し、スクロール操作を優先
- 外部のUIライブラリ、画像CDN、解析スクリプトは不使用
- キーボード操作・フォーカス表示・動きを減らす設定への配慮

## 掲載内容

公開された GitHub の README に基づいて以下の制作物を紹介しています。

- Wynncraft AI Bridge
- DanmakuChat
- .NET Decompiler MCP
- Game Translator
- FastFastMap

既存の research/fpga-memory-acquisition 以下の技術報告もそのまま保持しています。査読済み論文と誤解されないよう明記しています。

## 開発

必要環境: Node.js 24、npm

- npm ci — 依存関係のインストール
- npm run dev — ローカル開発サーバー
- npm run lint — ESLint
- npm run build — TypeScript チェックと本番ビルド
- npm run preview — ビルド済みサイトを確認

技術構成: React / TypeScript / Vite / 自前の CSS・SVG。
Viteの base は /Portfolio/ に設定されています。

## デザイン

グラデーションのカード、意味のないアニメーション、ダミーの実績や連絡先は使用していません。Windows 95/98 のタイトルバー・凹凸境界線・ファイル一覧などの特徴を優先し、情報の読みやすさを保っています。

## 注意

これは Windows の公式製品・シミュレーターではありません。システム操作はブラウザ画面内で完結します。
