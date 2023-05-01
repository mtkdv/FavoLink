<h1 align="center">FAVOLINK</h1>

<!-- [![next.js](https://img.shields.io/badge/v13.2.1-blueviolet.svg?style=for-the-badge&logo=Next.js&labelColor=000000&logoWidth=20>)](https://github.com/vercel/next.js/) -->
<!-- [![react](https://img.shields.io/badge/v18.2.0-blue.svg?style=for-the-badge&logo=React&labelColor=000000&logoWidth=20>)](https://github.com/facebook/react) -->

<p align="center">
  <a href="https://github.com/vercel/next.js/">
    <img alt="Next.js" src="https://img.shields.io/badge/v13.2.1-blueviolet.svg?style=for-the-badge&logo=Next.js&labelColor=333333&logoWidth=20" />
  </a>
  &nbsp;
  <a href="https://github.com/facebook/react">
    <img alt="React" src="https://img.shields.io/badge/v18.2.0-blue.svg?style=for-the-badge&logo=React&labelColor=333333&logoWidth=20" />
  </a>
  &nbsp;
  <a href="https://gitmoji.dev">
    <img
      src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=for-the-badge&labelColor=333333"
      alt="Gitmoji"
    />
  </a>
</p>

## URL

**https://favolink.vercel.app/**

## FAVOLINK に関して

### 概要

好きな動画で自己紹介できるプロフィールアプリ。

### 作成した動機・目的

あらゆる SNS アカウントをまとめたり、趣味や好きなものを列挙するプロフィールアプリは、現状でも多く存在する。<br>
しかし、好きな動画を紹介することで、自分をアピールするサービスは無いように感じていた。

### 既存のサービスでは解決できないこと

- プロフィール欄に好きな動画を記載したとしても、再生ページへアクセスしてもらわなければならないというハードルが存在する。
- 好きな動画を紹介する投稿をしたとしても、すぐに他の投稿に埋もれ、過去へと流れていってしまう。

### このアプリで解決できること

- プロフィールページから再生ページへアクセスしてもらう必要はなく、その場で動画を再生することができる。
- 投稿とは異なり、登録した動画はプロフィールページに残り続ける。

## ページと機能

<!-- prettier-ignore -->
| トップページ・ログイン | ダッシュボード |
| :---: | :---: |
| ![top-login](https://gyazo.com/e470c9af4b659f099ea5a92abc3973db.gif) | ![dashboard](https://gyazo.com/48124e8b04d69e7cb5e0cade89d68b39.gif) |
| Google、Twitter、ゲストアカウントによる認証。<br>※ 2023/4/30現在、Twitter認証を一時的に停止しています。 | サイドバーには各種編集ページへのリンク、右枠にはそれぞれのページが表示される。 |

<br>

<!-- prettier-ignore -->
| プロフィール編集ページ | カスタマイズページ |
| :---: | :---: |
| ![dashboard](https://gyazo.com/abd721ede9f7e5392cfad6390d44308a.gif) | ![customize](https://gyazo.com/b5f579538ece489d81b925d0832d5f1c.gif) |
| 各種プロフィール情報と、プロフィールページの公開状態を変更できる。 | プロフィールページの背景画像のアップロードと、ライト・ダークモードの変更ができる。 |

<br>

<!-- prettier-ignore -->
| 動画リスト編集ページ（登録） | 動画リスト編集ページ（並び替え） |
| :---: | :---: |
| ![add-video(submit)](https://gyazo.com/f4cebff24935349dd6df1d86ab421801.gif) | ![add-video(order)](https://gyazo.com/91814ba69dda9e09e6b5f6b282b9b194.gif) |
| ネストしたフォームを動的に生成し、カテゴリー名と動画の登録を行う。 | 要素を並び替え、プロフィールページでの表示順を変更できる。 |

<br>

<!-- prettier-ignore -->
| プレビューページ | 公開ページ |
| :---: | :---: |
| ![preview](https://gyazo.com/f86d11097d8eab9ec0520108aac9e608.gif) | ![public](https://gyazo.com/7ca1c07a34703eea78ceaf9f99a6c302.gif) |
| 公開前の状態を確認できる。サムネイルをクリックすると、ダイアログで動画を再生する。 | 自身のプロフィールページを開いた場合にのみ、右上に編集ページへのボタンが表示される。 |

## 使用技術

- Next.js 13.2.1
- React 18.2.0
- TypeScript 4.9.5

#### 認証

- NextAuth.js
- GCP OAuth 2.0
- Twitter API

#### データ取得、グローバルステート管理

- axios
- Tanstack Query
- react-error-boundary

#### フォームの生成、バリデーション

- React Hook Form
- zod

#### Style、UI、アニメーション

- Tailwind CSS
- Headless UI
- clsx
- Framer Motion
- react-hot-toast
- react-icons

#### 動画情報の取得、再生

- YouTube Data API v3
- react-player

#### インフラ、DB 関連

- Vercel
- Prisma
- PlanetScale
- Cloud Storage for Firebase

## ER 図

```mermaid
erDiagram

User ||--o{ Account: ""
User ||--o{ Session: ""
User ||--o| Profile: ""
User ||--o| Custom: ""
User ||--o{ Category: ""
User ||--o{ Link: ""
Category ||--o{ Link: ""

Account {
  String id
  String type
  String provider
  String providerAccountId
  String refresh_token
  String access_token
  String oauth_token
  String oauth_token_secret
  Int expires_at
  String token_type
  String scope
  String id_token
  String session_state
}

Session {
  String id
  String sessionToken
  DateTime expires
}

User {
  String id
  String name
  String email
  DateTime emailVerified
  String image
}

VerificationToken {
  String identifier
  String token
  DateTime expires
}

Profile {
  String id
  String name
  String image
  String slug
  String description
  Boolean published
}

Custom {
  String id
  String backgroundImage
  Mode mode
  String color
  String fontFamily
}

Category {
  String id
  String name
  String description
  Int index
}

Link {
  String id
  String title
  String videoId
  String thumbnailUrl
  String channelId
  String channelTitle
  String channelThumbnailUrl
  Int index
}
```
