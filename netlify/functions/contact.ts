import { Handler } from "@netlify/functions";
import { Resend } from 'resend';
import axios from 'axios';
import validator from 'validator';

const handler: Handler = async (event) => {
  const {
    RESEND_API_KEY,
    RECAPTCHA_SECRET_KEY,
    FORM_TO_EMAIL
  } = process.env;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  if (!event.body) {
    return { statusCode: 400, headers, body: JSON.stringify({ msg: "No body" }) };
  }

  const { name, email, message, token } = JSON.parse(event.body);

  // reCAPTCHA verification
  const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`;

  let score = 0;

  try {
    const recaptchaCheck = await axios.post(recaptchaVerifyUrl);
    const verifyData = recaptchaCheck.data;

    if (!verifyData.success) {
      console.error("reCAPTCHA failed:", verifyData);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ msg: "Invalid reCAPTCHA" }),
      };
    }

    score = verifyData.score;
    // 0.5 is a standard threshold.
    if (score < 0.5) {
      console.warn(`Bot detected. Score: ${score}`);
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ msg: "Bot detected. Access denied." }),
      };
    }

  } catch (error) {
    console.error("reCAPTCHA Verification Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ msg: "reCAPTCHA verification failed." }),
    };
  }

  if (!validator.isEmail(email)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ msg: "Invalid email format" }),
    };
  }

  const sanitizedMessage = validator.escape(message);
  const sanitizedName = validator.escape(name);
  const subject = `Nieuw bericht van ${sanitizedName} (${email})`;

  const resend = new Resend(RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: 'Webfabrik Contact Form <website@jawbouw.nl>',
      to: [FORM_TO_EMAIL || 'maarten@webfabrik.nl'],
      replyTo: email,
      subject: subject,
      html: `
        <h3>Nieuw bericht via website</h3>
        <p><strong>Naam:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>reCAPTCHA Score:</strong> ${score.toFixed(2)}</p>
        <hr />
        <p><strong>Bericht:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
      text: `Nieuw bericht van ${sanitizedName} (${email}):\n\n${sanitizedMessage}\n\nScore: ${score}`
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ msg: "Email sent successfully", data }),
    };
  } catch (error) {
    console.error("Resend Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ msg: "Email failed to send." }),
    };
  }
};

export { handler };
