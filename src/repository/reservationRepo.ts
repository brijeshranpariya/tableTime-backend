import { Pool } from "pg";
import { pool } from "../db.js";
import { Reservation } from "../interface/interface.js";

export const reserveRestaurant = async (
  reservationDetails: Reservation,
  registeredPhoneNumber: string,
  customerId: string
) => {
  try {
    await pool.query("BEGIN");
    const {
      additionalNote,
      countryCode,
      tableCapacity,
      phoneNumber,
      expectedArrivalTime,
      numberOfGuest,
    } = reservationDetails;
    
    await pool.query(
      `insert into reservation (customer_id,party_size,status,notes) values ($1, $2, $3,$4)`,
      [customerId, numberOfGuest, "confirmed", additionalNote]
    );
    await pool.query("COMMIT");
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error reserving the table:", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
};
