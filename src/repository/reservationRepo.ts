import { Pool } from "pg";
import { pool } from "../db.js";
import { Reservation } from "../interface/interface.js";

export const reserveRestaurant = async (
  reservationDetails: Reservation,
  registeredPhoneNumber: string
) => {
  try {
    await pool.query("BEGIN");
    const { firstName, lastName, phoneNumber, arrivalTime, numberOfGuest } =
      reservationDetails;
    const result = await pool.query(
      `select customer_id from customers where phone_number = ($1)`,
      [registeredPhoneNumber]
    );
    const customerId = result.rows[0].customer_id;
    await pool.query(
      `insert into reservation (customer_id,party_size,status) values ($1, $2, $3)`,
      [customerId, numberOfGuest, "pending"]
    );
    await pool.query("COMMIT");
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error reserving the table:", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
};
