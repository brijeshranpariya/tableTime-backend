import { pool } from "../db.js";

export const fetchMenuItemsById = async (id: string) => {
  try {
    const response = await pool.query(
      `select * from menu_items where restaurant_id = ($1)`,
      [id]
    );
    return response.rows;
  } catch (err) {
    console.log("Error while fetching menu items by id.", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
};
