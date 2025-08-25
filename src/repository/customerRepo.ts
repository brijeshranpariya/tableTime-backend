import { sendSMS } from "../utils/twilioServices.js";
import { pool } from "./../db.js";

export const customerSignUp = async (phoneNumber: string) => {
  try {
    await pool.query("BEGIN");
    let otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const existanceResult = await checkCustomerExist(phoneNumber);
    let expirationTime;
    let result;
    let customerId;
    if (!existanceResult?.isExist) {
      result = await pool.query(
        `insert into customers ( phone_number, is_verified) values ($1, $2) returning customer_id`,
        [phoneNumber, false]
      );
      customerId = result.rows[0].customer_id;
      if (result) {
        result = await pool.query(
          `insert into otp_varification ( customer_id ,otp_code, expiration_time,used) values ($1, $2, now() + interval '10 minutes', $3)  RETURNING otp_id, customer_id, otp_code, expiration_time, used`,
          [customerId, otp, false]
        );
        expirationTime = result.rows[0].expiration_time;
        otp = result.rows[0].otp_code;
      }
    } else {
      customerId = existanceResult.result[0].customer_id;
      result = await pool.query(
        `update otp_varification set otp_code = ($1),used = ($2),expiration_time =now() + interval '90 seconds' where customer_id = ($3) RETURNING otp_id, customer_id, otp_code, expiration_time, used`,
        [otp, false, customerId]
      );
      expirationTime = result.rows[0].expiration_time;
      otp = result.rows[0].otp_code;
    }
    await sendSMS(otp,phoneNumber);
    await pool.query("COMMIT");
    return { otp, expirationTime };
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error generating OTP:", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const checkCustomerExist = async (phoneNumber: string) => {
  try {
    const response = await pool.query(
      `select * from customers where phone_number = ($1)`,
      [phoneNumber]
    );
    if (response.rows.length == 0) {
      return { isExist: false, result: response.rows };
    } else {
      return { isExist: true, result: response.rows };
    }
  } catch (err) {
    console.error("Error while checking for customer existance:", err);
  }
};
