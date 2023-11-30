const nodemailer = require("nodemailer");
const { BadRequestError } = require("../lib/errors");

exports.sendEmail = (req, res) => {
  const { firstName, lastName, body, receiver } = req.body;

  try {
    send(firstName, lastName, body, receiver).then((response) => {
      if (!!response) {
        res.status(200).json({
          messageID: response,
        });
      } else {
        res.status(400).json({
          error: "Bad Request",
        });
        throw new BadRequestError("Bad Request");
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

async function send(firstName, lastName, body, receiver) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
      port: 465, // Port for SMTP (usually 465)
      secure: true, // Usually true if connecting to port 465
      auth: {
        user: process.env.EMAIL_SENDER, // add your gmail in .env file
        pass: process.env.PASSWORD_SENDER, // Password (for gmail, your app password)
      },
    });
    let info = await transporter.sendMail({
      from: `${firstName} ${lastName} <${process.env.EMAIL_SENDER}>`,
      to: process.env.EMAIL_RECEIVER, //alternatively use receiver from request body
      subject: `New Email from user ${lastName}`,
      html: `
              <h2>Greetings! My name is <i>${firstName}</i>, and I'm reaching out to you via email through Nodemailer</h2>
              <p>${body}</p>
              <hr style = "width: 200px">
              <div style="text-align: center;">
                  <i>NodeMailer is a usefull tool</i>
              </div>
              `,
    });

    return info.messageId; // Random ID generated after successful send
  } catch (error) {
    return null;
  }
}
