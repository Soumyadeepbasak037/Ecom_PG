const db = require("../config/db");
const Product = require("../models/productModels");

const {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} = require("../validators/productValidator");

exports.create_product = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Access Forbidden" });
  }

  const { error, value } = createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const product = await Product.create(value);
    res.json({ message: "Product added", product_id: product.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

exports.get_all_products = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};

exports.get_product_by_id = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};
// exports.update_product = async (req, res) => {
//   if (!req.user?.is_admin) {
//     return res.status(403).json({ message: "Access Forbidden" });
//   }

//   const { id, name, description, price, stock, image_url } = req.body;

//   try {
//     const check = await db.query("SELECT * FROM products WHERE id = $1", [id]);
//     if (check.rows.length === 0) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     await db.query(
//       `
//       UPDATE products
//       SET name = $1, description = $2, price = $3, stock = $4, image_url = $5 WHERE id = $6
//       `,
//       [name, description, price, stock, image_url, id]
//     );

//     res.json({ message: "Product updated" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// };

exports.update_product = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Access Forbidden" });
  }

  const { error, value } = updateProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const product = await Product.findById(value.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.update(value);
    res.json({ message: "Product updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};

// exports.delete_product = async (req, res) => {
//   const { id } = req.body;
//   try {
//     const check = await db.query(`SELECT * FROM products WHERE id = $1`, [id]);
//     if (check.rows.length === 0) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     await db.query(`DELETE FROM products WHERE id = $1`, [id]);
//     res.json({ message: "Prduct Deleted" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Database error" });
//   }
// };

exports.delete_product = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Access Forbidden" });
  }

  const { error, value } = deleteProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const product = await Product.findById(value.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.delete(value.id);
    res.json({ message: "Product Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
};
