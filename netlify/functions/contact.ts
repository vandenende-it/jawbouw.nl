import validator from 'validator';
import sgMail from "@sendgrid/mail";
import { Handler } from "@netlify/functions";
import axios from 'axios';

const handler: Handler = async (event: { body: string }) => {
  const { SENDGRID_API_KEY } = process.env;
  const { reCAPTCHA_SECRET_KEY } = process.env;
  const { FORM_TO_EMAIL} = process.env;

  // get data from body
  let { name, email, message, recaptchaResponse } = JSON.parse(event.body);

  // verify reCAPTCHA
  const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;
   recaptchaResponse = await axios.post(recaptchaVerifyUrl);

  if (!recaptchaResponse.data.success) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: "Invalid reCAPTCHA",
      }),
    };
  }

  // validate email
  if (!validator.isEmail(email)) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: "Invalid email format",
      }),
    };
  }

  // sanitize inputs
  email = validator.normalizeEmail(email) || email;
  message = validator.escape(message);
  name = validator.escape(name);
  // set API key
  sgMail.setApiKey(SENDGRID_API_KEY);

  // setup data for email
  const data = {
    to: FORM_TO_EMAIL, // Change to your recipient (your email in this case)
    from: "maarten@webfabrik.nl", // Change to your verified sender
    subject: `New message from ${name} (${email})`,
    html: `<p>${message}</p>`,
  };

  try {
    await sgMail.send(data);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: "Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op."
      }),
    };
  } catch (err) {
    return {
      statusCode: err.code,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg: err.message }),
    };
  }
};

export { handler };