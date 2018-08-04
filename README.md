add conf.js
=====
module.exports = {
    channelId: "xx",
    channelSecret: "xx",
    channelAccessToken: "xx",
    projectId: "xxx"
}
====
change serverless.yml
====
service: xxxx // add your service name

provider:
  name: google
  runtime: nodejs
  project: xxx // google project name
  region: xxx //gcp region
  # the path to the credentials file needs to be absolute
  credentials: ~/.gcloud/xxxx.json // credentials location

plugins:
  - serverless-google-cloudfunctions // google plugin