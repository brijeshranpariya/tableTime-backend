import { pool } from "../db.js";

export const getAvailableTableById = async (id: string) => {
  try {
    let result = await pool.query(
      `select count(*) as total_tables from restaurant_table where restaurant_id = ($1)`,
      [id]
    );
    const total_tables = parseInt(result.rows[0].total_tables, 10);
    result = await pool.query(
      `select 
      table_id,
    restaurant_id,
    location,
    status,(capacity + extendable_upto) AS total_capacity from restaurant_table where status = $1 and restaurant_id = $2 `,
      ["available", id]
    );
    const availableTableDetails = result.rows;
    result = await pool.query(
      `select count(*),(capacity+extendable_upto) as total_capacity from restaurant_table where restaurant_id = ($1) and status=($2) group by (capacity+extendable_upto)`,
      [id, "available"]
    );
    const capacityWiseCount = result.rows.map((row) => ({
      tableCount: parseInt(row.count, 10),
      total_capacity: row.total_capacity,
    }));
    return {
      total_tables: total_tables,
      availableTableDetails: availableTableDetails,
      capacityWiseTableDetails: capacityWiseCount,
    };
  } catch (err) {
    console.log("Error while fetching table details by id:", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
};
