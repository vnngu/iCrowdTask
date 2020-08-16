require("dotenv").config();
const https = require("https");
const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

function AddMember(firstName, lastName, email) {
  const API_KEY = process.env.API_KEY;

  const LIST_ID = "9e4a91e912";
  const URL = `https://us17.api.mailchimp.com/3.0/lists/${LIST_ID}`;
  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  let jsonData = JSON.stringify(data);
  let options = {
    method: "POST",
    auth: `nam:${API_KEY}`,
  };
  const request = https.request(URL, options);
  request.write(jsonData);
  request.end();
}

function SendGrid(email) {
  const msg = {
    to: email,
    from: "nguyenvietnam2401@gmail.com", // Use the email address or domain you verified above
    subject: "Welcome to iCrowdTask",
    html: `We're glad you're here. Visit our website: <a href="https://icrowdtask.herokuapp.com/">iCrowdTask</a>`,
  };
  (async () => {
    try {
      await sgMail.send(msg);
      console.log("Email Sent");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
}

module.exports = { AddMember, SendGrid };
