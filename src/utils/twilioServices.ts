import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();
console.log("Account SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("API Key SID:", process.env.TWILIO_API_KEY);
console.log(" Key secret SID:", process.env.TWILIO_KEY_SECRET);

const verifySid = process.env.TWILIO_VERIFY_SID;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authtoken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authtoken);

export const sendSMS = async (otp: number, phoneNumber: string) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP for tableTime is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log(`SMS sent! SID: ${message.sid}`);
    // res.send(`Sent message. SID: ${message.sid}`);
  } catch (err) {
    console.error("Error:", err);
    // res.status(500).send("Failed to send SMS");
  }
};
