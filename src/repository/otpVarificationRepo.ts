import { pool } from "../db.js";

export const verifyOtp = async (otp: string) => {
  try {
    await pool.query("BEGIN");
    let result = await pool.query(
      `select * from otp_varification where otp_code = ($1)`,
      [otp]
    );
    const expirationTime = result.rows[0].expiration_time;
    const isValid = new Date(expirationTime) > new Date();
    result = await pool.query(
      `update otp_varification set used = ($1) where otp_code = ($2) returning customer_id`,
      [true, otp]
    );
    const customerId = result.rows[0].customer_id;
    if (customerId)
      await pool.query(
        `update customers set is_verified = ($1) where customer_id = ($2)`,
        [true, customerId]
      );
    await pool.query("COMMIT");
    return isValid;
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error verifying OTP:", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const resendOtp = async (phoneNumber: string) => {
  try {
    await pool.query("BEGIN");
    let newOtp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    let result = await pool.query(
      `select customer_id from customers where phone_number = ($1)`,
      [phoneNumber]
    );
    const customerId = result.rows[0].customer_id;
    result = await pool.query(
      `update otp_varification set otp_code = ($1) where customer_id = ($2) returning otp_code`,
      [newOtp, customerId]
    );
    newOtp = result.rows[0].otp_code;
    await pool.query("COMMIT");
    if (newOtp) {
      return newOtp;
    }
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error resending OTP:", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
};
