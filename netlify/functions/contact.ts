import validator from 'validator';
// Import necessary classes from MailerSend
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { Handler } from "@netlify/functions";
import axios from 'axios';

// The verified sender email for your MailerSend account.
// NOTE: This must be a verified domain/sender in your MailerSend account.
const MAILERSEND_SENDER_EMAIL = "maarten@webfabrik.nl"; 

const handler: Handler = async (event) => {
  const {
    // We now look for the MailerSend API key
    MAILERSEND_API_KEY, 
    reCAPTCHA_SECRET_KEY,
    FORM_TO_EMAIL // Your recipient email address
  } = process.env;

  // The original code was written to handle a JSON body from the event
  let { name, email, message, recaptchaResponse } = JSON.parse(event.body);

  // --- RECAPTCHA VERIFICATION (UNCHANGED) ---
  const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${reCAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;
  
  try {
    const recaptchaCheck = await axios.post(recaptchaVerifyUrl);
    if (!recaptchaCheck.data.success) {
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
  // ------------------------------------------

  // --- INPUT VALIDATION AND SANITIZATION (UNCHANGED) ---
  if (!validator.isEmail(email)) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: "Invalid email format" }),
    };
  }

  // Sanitize inputs
  email = validator.normalizeEmail(email) || email;
  const sanitizedMessage = validator.escape(message);
  name = validator.escape(name);
  const subject = `New message from ${name} (${email})`;
  // -----------------------------------------------------

  // --- MAILERSEND CONFIGURATION AND SENDING ---
  
  // 1. Initialize MailerSend client
  const mailerSend = new MailerSend({
    apiKey: MAILERSEND_API_KEY,
  });

  // 2. Define Sender (From)
  const sentFrom = new Sender(MAILERSEND_SENDER_EMAIL, name);

  // 3. Define Recipient (To)
  // We use the FORM_TO_EMAIL environment variable as the recipient address
  const recipients = [
    new Recipient(FORM_TO_EMAIL, "Website Owner")
  ];

  // 4. Construct Email Parameters
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    // Optionally set a Reply-To header to the user's email for easy replies
    .setReplyTo(new Recipient(email, name)) 
    .setSubject(subject)
    .setHtml(`<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${sanitizedMessage}</p>`)
    // Provide a plain text alternative for better deliverability
    .setText(`New message from ${name} (${email}):\n\n${sanitizedMessage}`);

  try {
    // 5. Send the email
    await mailerSend.email.send(emailParams);

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
    // Note: MailerSend error objects might differ from SendGrid's error structure
    console.error("MailerSend Error:", err); 
    
    // We return a 500 status code for server-side mailing errors
    return {
      statusCode: 500, 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg: "Email failed to send due to a server error." }),
    };
  }
};

export { handler };
