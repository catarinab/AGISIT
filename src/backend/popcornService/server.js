const { Datastore } = require("@google-cloud/datastore");

const datastore = new Datastore();

function writeToDatastore(logMessage) {
  const logEntity = {
    key: datastore.key(["LogEntry"]),
    data: {
      timestamp: new Date(),
      message: logMessage,
    },
  };

  datastore
    .save(logEntity)
    .then(() => {
      console.log("Log entry saved to Datastore:", logMessage);
    })
    .catch((error) => {
      console.error("Error writing log entry to Datastore:", error);
    });
}

var express = require("express");
var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  const time = 3;
  writeToDatastore(`The popcorn is going to be ready in ${time} minutes`);
  res.send({ time });
});

app.listen(80, () => {
  writeToDatastore("popcornService listening at port 80");
});
