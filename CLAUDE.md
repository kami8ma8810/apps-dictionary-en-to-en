# English-to-English Dictionary PWA

## プロジェクト概要
英語から英語への辞書PWAアプリ。知らない単語を母語に翻訳せず、英語の定義で理解する学習法を支援する。

## 技術スタック

| カテゴリ | 選定 | 備考 |
|---------|------|------|
| フレームワーク | Nuxt 3 (Vue 3) / SPA (`ssr: false`) | |
| 言語 | TypeScript (strict) | |
| 状態管理 | Pinia (Setup Store) | |
| IndexedDB | Dexie.js | |
| UI | Nuxt UI v3 | Reka UIベース |
| PWA | @vite-pwa/nuxt | |
| ユーティリティ | VueUse (@vueuse/nuxt) | |
| 辞書API | Free Dictionary API | 抽象化レイヤーで切り替え可能 |
| ユニットテスト | Vitest + vitest-axe + @testing-library/vue | jsdom環境 |
| E2Eテスト | Playwright + @axe-core/playwright | WCAG 2.2 AA |
| CIテスト | pa11y-ci | |

## TDDルール

全ての機能開発を以下のサイクルで進める：

1. **RED**: テストを先に書く（失敗する）
2. **GREEN**: テストを通す最小限のコードを書く
3. **REFACTOR**: コードを整理する

### テストファイルの配置
- ユニットテスト: `tests/` 配下に実装と同じ構造で配置
- E2Eテスト: `tests/e2e/` 配下

### テストの書き方
- `@testing-library/vue` を使用し、`getByRole` を優先
- `getByText`, `getByTestId` は最終手段
- a11yテストは `vitest-axe` の `toHaveNoViolations()` を使用
- IndexedDBテストは `fake-indexeddb` を使用

## アクセシビリティ（WCAG 2.2 AA）

### 準拠すべき主要基準
- **1.4.3**: テキストのコントラスト比 4.5:1
- **1.4.11**: UI要素のコントラスト比 3:1
- **2.1.1 / 2.1.4**: 全機能キーボードアクセス可能
- **2.4.3**: 論理的なフォーカス順序
- **2.4.7 / 2.4.11**: フォーカスインジケータ（2px以上、コントラスト3:1）
- **2.5.8**: ターゲットサイズ最小 24x24px
- **4.1.3**: ステータスメッセージ（aria-live region）

### 実装パターン
- 検索結果: `aria-live="polite"` で結果数を通知
- 検索入力: `role="searchbox"`, `aria-label`, `aria-controls`
- 音声再生: ボタンに適切な `aria-label`
- ブックマーク: トグル状態を `aria-pressed` で伝達

## UIデザイン方針

- **ミニマル・クリーン**: 色数2-3色、余白は8pxグリッド
- **フォント**: Inter または system-ui
- **禁止事項**: 絵文字、グラデーション、過度なシャドウ、多色使い
- Nuxt UI v3コンポーネントを活用

## コーディング規約

### TypeScript
- `any`, `unknown` は基本的に使用しない
- キャスト・ダブルキャスト禁止
- オブジェクトの形状には `interface` を使う（`I` プレフィックス不要）
- `type` は合併型、タプル、複雑な型操作、プリミティブ別名のみ

### Vue / Nuxt
- `<script setup lang="ts">` を使用
- Composition APIのみ（Options API不使用）
- Pinia Store は Setup Store パターン

### コミット・プッシュ
- コミット前に必ずTypeScriptの型チェック（`npx tsc --noEmit`）を実行
- テストが全てPASSすることを確認してからコミット
- 適切な粒度でコミット・プッシュすること（Step単位、機能単位など）
- パッケージマネージャーは pnpm を使用

## ディレクトリ構成

```
types/          — 型定義
database/       — Dexieスキーマ + リポジトリ
services/       — API抽象化レイヤー
composables/    — Vue composables
stores/         — Pinia stores
layouts/        — Nuxtレイアウト
pages/          — ページコンポーネント
components/     — UIコンポーネント
plugins/        — Nuxtプラグイン
public/         — 静的アセット
tests/          — テストファイル
```
