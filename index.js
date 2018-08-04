'use strict';

var config = require("./conf");
var builder = require("botbuilder");
var botbuilder_linebot_connector = require("botbuilder-linebot-connector");
var connector = new botbuilder_linebot_connector.LineConnector({
  hasPushApi: false,
  autoGetUserProfile: false,
  // your line
  channelId: process.env.channelId || config.channelId,
  channelSecret: process.env.channelSecret || config.channelSecret,
  channelAccessToken: process.env.channelAccessToken || config.channelAccessToken
});

const Datastore = require('@google-cloud/datastore');
var database = require("botbuilder-storage-google-cloud-datastore");

const ds = Datastore({ projectId: config.projectId });
const kind = 'botState';
var client = new database.GDatastoreBotStorage(ds, { kind: kind });

var bot = new builder.UniversalBot(connector)
  .set("storage", client);

bot.dialog("/", [
  s => {
    s.send("hello");
    s.beginDialog("greetings")
  }, s => {
    s.send("bady")
  }
])

bot.dialog('greetings', [
  // Step 1
  function (session) {
    session.send(new builder.Message(session).addAttachment(new botbuilder_linebot_connector.Sticker(session, 1, 2)))
    builder.Prompts.text(session, 'Hi! What is your name?');
  },
  // Step 2
  function (session, results) {
    session.endDialog(`Hello ${results.response}!`);
  }
]);



// exports.webhock = (request, response) => connector.listen()

exports.line = (request, response) => {
  let f = connector.listen()
  let r = f(request, response);
  // console.log("response", r)
  response.status(200).send(r);

}

// exports.event = (event, callback) => {
//   callback();
// };  

// exports.line = (event, callback) => {
//   connector.serverlessWebhock(event)
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Go Serverless v1.0! Your function executed successfully!',
//       input: event,
//     }),
//   };

//   callback(null, response);

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
// };