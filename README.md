<h1 style="text-align: center;">FAVOLINK</h1>

<!-- [![next.js](https://img.shields.io/badge/v13.2.1-blueviolet.svg?style=for-the-badge&logo=Next.js&labelColor=000000&logoWidth=20>)](https://github.com/vercel/next.js/) -->
<!-- [![react](https://img.shields.io/badge/v18.2.0-blue.svg?style=for-the-badge&logo=React&labelColor=000000&logoWidth=20>)](https://github.com/facebook/react) -->

<p style="display: flex; justify-content: center; gap: 10px;">
  <a href="https://github.com/vercel/next.js/">
    <img alt="" src="https://img.shields.io/badge/v13.2.1-blueviolet.svg?style=for-the-badge&logo=Next.js&labelColor=222222&logoWidth=20" />
  </a>
  <a href="https://github.com/facebook/react">
    <img alt="" src="https://img.shields.io/badge/v18.2.0-blue.svg?style=for-the-badge&logo=React&labelColor=222222&logoWidth=20" />
  </a>
</p>

## URL

**https://favolink.vercel.app/**

## 概要

好きな動画で自己紹介できるプロフィールアプリ。

## 作成した動機

あらゆる SNS アカウントをまとめたり、趣味や好きなものを列挙するプロフィールアプリはいろいろと存在するものの、自分の好きな動画を紹介することで、自分をアピールするサービスは無いように感じていた。

## 既存のサービスでは解決できないこと

- たとえ好きな動画を投稿しようとも、すぐに過去へ流れていってしまう。
- プロフィール欄に好きな動画を記載しても、再生ページへアクセスしてもらわなければならないというハードルがある。

## このアプリで解決できること

- 登録した動画はプロフィールページに残り続ける。
- 再生ページへアクセスする必要はなく、プロフィールページ内で動画を再生できる。

## ページと機能

|                          トップページ                          |                             ログイン                             |
| :------------------------------------------------------------: | :--------------------------------------------------------------: |
| ![top](https://gyazo.com/b5800773a70dfe20de9f7cfc2b95fd32.gif) | ![login](https://gyazo.com/2727c5f319616ed9341e4f9a02f73a4a.gif) |
|                 アプリの概要を画像付きで紹介。                 |                      Google、Twitter 認証。                      |

<br>

|                                                                                  ダッシュボード                                                                                  |                                                                         プロフィール編集ページ                                                                          |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                       ![dashboard](https://gyazo.com/48124e8b04d69e7cb5e0cade89d68b39.gif)                                                       |                                                   ![profile](https://gyazo.com/abd721ede9f7e5392cfad6390d44308a.gif)                                                    |
| ダッシュボードにはプロフィール編集、動画登録、カスタマイズを行うページと、プレビューページが存在する。サイドバーには各種ページへのリンク、右枠にはそれぞれのページが表示される。 | プロフィール編集ページでは、アバター画像のアップロード、表示名、公開ページの slug、登録した動画に対する説明文、プロフィールページの公開非公開の設定を行うことができる。 |

<br>

|                         動画リスト編集ページ（登録）                         |                      動画リスト編集ページ（並び替え）                       |
| :--------------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
| ![add-video(submit)](https://gyazo.com/f4cebff24935349dd6df1d86ab421801.gif) | ![add-video(order)](https://gyazo.com/91814ba69dda9e09e6b5f6b282b9b194.gif) |
|      ネストしたフォームを動的に生成し、カテゴリー名と動画の登録を行う。      |                      要素の並び替え、アコーディオン。                       |

<br>

|                      カスタマイズページ（モード変更）                      |                    カスタマイズページ（画像アップロード）                    |
| :------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| ![customize(mode)](https://gyazo.com/b2569f470ceb6b42a5e04b36d98580a6.gif) | ![customize(upload)](https://gyazo.com/b5f579538ece489d81b925d0832d5f1c.gif) |
|                   公開ページ用の背景画像とモードの設定。                   |                           背景画像のアップロード。                           |

|                                           プレビューページ                                           |                                  公開ページ                                  |
| :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                  ![preview](https://gyazo.com/3d84788d25818f7fe307d95b0e228750.gif)                  |      ![public](https://gyazo.com/6c9f914048c19122de8756700d2badac.gif)       |
| 公開前の状態を確認できるプレビューページ。サムネイルをクリックすると、ダイアログで動画を再生できる。 | 自身の公開ページを開いた場合にのみ、右上に編集ページへのボタンが表示される。 |

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
  DataTime expires
}

Profile {
  String id
  String name
  String image
  String slug
  String description
  String backgroundImage
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
