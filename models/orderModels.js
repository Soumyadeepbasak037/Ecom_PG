const db = require("../config/db");
const Products = require("../models/productModels");

exports.findProductById = (productId) => {
  return db.query(`SELECT * FROM products WHERE id = $1`, [productId]);
};

exports.findCartByID = (userId, productId) => {
  return db.query(
    `SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2`,
    [userId, productId]
  );
};
