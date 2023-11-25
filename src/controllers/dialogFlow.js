const { SessionsClient } = require("dialogflow");
const path = require("path");

const sessionClient = new SessionsClient({
  keyFilename: path.join(__dirname, "dialogFlowKey.json"),  //This file represents the configuration in JSON format that you've obtained from Google Cloud Platform (GCP).
});

exports.getBotResponse = async (req, res) => {
  const sessionPath = sessionClient.sessionPath("your project id", "session id");   //change project id and session id

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.text,
        languageCode: "en-US",
      },
    },
  };

  try {
    const response = await sessionClient.detectIntent(request);

    res.status(200).json({
      response: response[0].queryResult.fulfillmentText,
    });
  } catch (error) {
    console.error("Error while processing Dialogflow request:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
