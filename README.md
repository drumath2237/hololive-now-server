# hololive-now-server

## About this

[ホロジュール](https://schedule.hololive.tv)からスクレイピングしてホロライブメンバーの配信スケジュールを取得するAPI鯖

## Usage

```bash
yarn install
yarn start
```

## API Reference

### Endpoints

`/api/schedule`と`api/schedule/now`というエンドポイントにアクセスすることで、
JSONデータを取得できる。

|url|method|info|
|---|---|---|
|`/api/schedule/`|`GET`|スケジュール全体のJSON配列|
|`/api/schedule/now/`|`GET`|現在配信中の配信データ|

### Response Data

レスポンスデータは以下の書式に基づく。

```json
[
  {
    "member": {
      "name": "メンバーの名前",
      "icon": "メンバーのYoutubeアイコン"
    },
    "streaming": {
      "datetime": "配信時間(UTC)",
      "url": "配信URL(Youtube)",
      "thumbnail": "Youtubeライブのサムネイル",
      "now": "配信中かどうかのboolean"
    }
  },
  {...},...
]
```

### More info

このシステムはホロジュールからスクレイピングして情報を取得していますが、
ホロジュール自体の更新が15分ごとに行われるため、
アクセスから更新されるまでの時間に再度エンドポイントへアクセスがあっても、
あらかじめキャッシュされたデータを返すことになる。

## Contact

何かございましたらこちらのTwitterへご連絡いただけますと幸いです。

[にー兄さん(Twitter)](https://twitter.com/ninisan_drumath)
