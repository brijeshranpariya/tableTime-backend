import { pool } from "../db.js";

export const listRestaurants = async () => {
  try {
    const result = await pool.query(`select * from restaurants`);
    const restaurantList = result.rows;
    return restaurantList;
  } catch (err) {
    console.error("Error while fetching restaurants:", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
};
export const getRestaurantDetails = async (id: string) => {
  try {
    const result = await pool.query(
      `select * from restaurants where id =($1)`,
      [id]
    );
    const restaurantDetails = result.rows;
    return restaurantDetails;
  } catch (err) {
    console.error("Error while fetching restaurants:", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
};
