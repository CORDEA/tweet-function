# tweet-function

This cloud function is tweet a commit message in response to a push event.

## Usage

1. Enable "Cloud Functions".
2. ```cp config.default.json config.json```
3. Enter twitter's API key in json.
4. Deploy!
  ```
  $ gcloud beta functions deploy tweet --stage-bucket tweet-function --trigger-http
  ```
