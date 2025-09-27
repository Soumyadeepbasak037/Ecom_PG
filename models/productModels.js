const db = require("../config/db");

exports.create = async ({ name, description, price, stock, image_url }) => {
  const result = await db.query(
    `
    INSERT INTO products (name, description, price, stock, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
    `,
    [name, description, price, stock ?? 0, image_url]
  );
  return result.rows[0];
};

exports.findAll = async () => {
  const result = await db.query("SELECT * FROM products");
  return result.rows;
};

exports.findById = async (id) => {
  const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

exports.update = async ({ id, name, description, price, stock, image_url }) => {
  await db.query(
    `
    UPDATE products
    SET name = $1, description = $2, price = $3, stock = $4, image_url = $5
    WHERE id = $6
    `,
    [name, description, price, stock, image_url, id]
  );
};
exports.delete = async (id) => {
  await db.query("DELETE FROM products WHERE id = $1", [id]);
};
