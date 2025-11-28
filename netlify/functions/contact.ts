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

  if (!event.body) {
    return { statusCode: 400, body: JSON.stringify({ msg: "No body" }) };
  }

  const { name, email, message, recaptchaResponse } = JSON.parse(event.body);

  // reCAPTCHA verification
  const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;

  try {
    const recaptchaCheck = await axios.post(recaptchaVerifyUrl);
    if (!recaptchaCheck.data.success) {
      console.error("reCAPTCHA failed:", recaptchaCheck.data);
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: "Invalid reCAPTCHA" }),
      };
    }
  } catch (error) {
    console.error("reCAPTCHA Verification Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: "reCAPTCHA verification failed." }),
    };
  }

  if (!validator.isEmail(email)) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: "Invalid email format" }),
    };
  }

  const sanitizedMessage = validator.escape(message);
  const sanitizedName = validator.escape(name);
  const subject = `New message from ${sanitizedName} (${email})`;

  const resend = new Resend(RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: 'Webfabrik Contact Form <website@jawbouw.nl>', // Update this to your verified sender
      to: [FORM_TO_EMAIL || 'maarten@webfabrik.nl'],
      replyTo: email,
      subject: subject,
      html: `<p><strong>From:</strong> ${sanitizedName} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${sanitizedMessage}</p>`,
      text: `New message from ${sanitizedName} (${email}):\n\n${sanitizedMessage}`
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: "Email sent successfully", data }),
    };
  } catch (error) {
    console.error("Resend Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: "Email failed to send." }),
    };
  }
};

export { handler };
