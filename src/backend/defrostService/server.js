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

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const weight = parseInt(req.query["weight"]);
  const time = weight * 0.02;
  writeToDatastore(
    `The ${weight}g product is going to be ready in ${time} minutes`
  );
  res.send({ time });
});

app.listen(80, () => {
  writeToDatastore("defrostService listening at port 80");
});
