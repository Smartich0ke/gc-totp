import { authenticator } from 'otplib';
import 'dotenv/config';

exports.handler = async (event) => {
  const secret = process.env.TOTP_SECRET; // Secret key stored in an env variable
  const finalCoords = process.env.FINAL_COORDS; // Final coordinates, also stored in an env variable
  const expectedCode = event.queryStringParameters.code; // Code sent by client

  if (authenticator.check(expectedCode, secret)) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, coordinates: finalCoords }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ success: false, message: "Invalid TOTP code" }),
  };
};
