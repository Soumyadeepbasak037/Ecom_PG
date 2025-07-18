const db = require("../config/db");

exports.create_product = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Access Forbidden" });
  }

  const { name, description, price, stock, image_url } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const result = await db.query(
      `
      INSERT INTO products (name, description, price, stock, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
      `,
      [name, description, price, stock ?? 0, image_url]
    );

    res.json({
      message: "Product added",
      product_id: result.rows[0].id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

exports.get_all_products = async (req, res) => {
  try {
    const products = await db.query(`SELECT * FROM products`);
    res.json(products.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};

exports.get_product_by_id = async (req, res) => {
  const { id } = req.body;
  try {
    const product = await db.query(`SELECT * FROM products where id = $1`, [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};

exports.update_product = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Access Forbidden" });
  }

  const { id, name, description, price, stock, image_url } = req.body;

  try {
    const check = await db.query("SELECT * FROM products WHERE id = $1", [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    await db.query(
      `
      UPDATE products
      SET name = $1, description = $2, price = $3, stock = $4, image_url = $5 WHERE id = $6
      `,
      [name, description, price, stock, image_url, id]
    );

    res.json({ message: "Product updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

exports.delete_product = async (req, res) => {
  const { id } = req.body;
  try {
    const check = await db.query(`SELECT * FROM products WHERE id = $1`, [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    await db.query(`DELETE FROM products WHERE id = $1`, [id]);
    res.json({ message: "Prduct Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};
