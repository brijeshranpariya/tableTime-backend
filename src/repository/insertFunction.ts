import { pool } from "../db.js";

const insertFunction = async () => {
  try {
    const response = await pool.query(`
        INSERT INTO menu_items (restaurant_id, name, description, price, is_available) VALUES
(1, 'Paneer Butter Masala', 'Cottage cheese cooked in rich tomato gravy', 250, true),
(1, 'Butter Naan', 'Soft naan topped with butter', 60, true),
(1, 'Dal Tadka', 'Yellow lentils tempered with spices', 180, true),

(2, 'Margherita Pizza', 'Classic cheese and tomato pizza', 350, true),
(2, 'Pasta Alfredo', 'Creamy white sauce pasta', 400, true),

(3, 'Veg Hakka Noodles', 'Stir-fried noodles with vegetables', 220, true),
(3, 'Chilli Chicken', 'Spicy chicken with peppers', 280, true),
(3, 'Spring Rolls', 'Crispy fried rolls with veggies', 150, true),

(4, 'Cheese Burger', 'Juicy beef burger with cheese', 180, true),
(4, 'French Fries', 'Crispy potato fries', 120, true),

(5, 'Chicken Tandoori', 'Char-grilled chicken with spices', 320, true),
(5, 'Mutton Seekh Kebab', 'Minced mutton skewers with masala', 350, true),

(6, 'Cappuccino', 'Freshly brewed coffee with milk froth', 150, true),
(6, 'Chocolate Brownie', 'Warm brownie with chocolate sauce', 180, true),

(7, 'Hyderabadi Chicken Biryani', 'Fragrant rice with chicken and spices', 350, true),
(7, 'Mutton Biryani', 'Authentic mutton biryani', 400, true),
(7, 'Veg Biryani', 'Basmati rice with vegetables', 280, true),

(8, 'California Roll', 'Crab, avocado, cucumber roll', 500, true),
(8, 'Salmon Nigiri', 'Fresh salmon on sushi rice', 550, true),

(9, 'Pepperoni Pizza', 'Cheese pizza topped with pepperoni', 450, true),
(9, 'Veggie Supreme', 'Pizza with assorted vegetables', 400, true),

(10, 'Quinoa Salad', 'Healthy salad with quinoa and veggies', 250, true),
(10, 'Avocado Toast', 'Whole grain bread with avocado spread', 200, true),
(10, 'Vegan Smoothie', 'Banana, spinach, almond milk smoothie', 180, true);

        `);
    console.log("response: ", response);
  } catch (err) {
    console.log("Error while inserting the data:", err);
  }
};
insertFunction();
