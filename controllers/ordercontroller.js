const db = require("../config/db");

exports.add_to_cart = async (req, res) => {
  const user_id = req.user.id;
  const product_id = req.body.product_id;
  const quantity = req.body.quantity;

  try {
    const check = await db.query(`SELECT * FROM products WHERE id = $1`, [
      product_id,
    ]);

    if (check.rows.length === 0) {
      return res.json({ message: "Product not found" });
    }

    const existing = await db.query(
      `SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2`,
      [user_id, product_id]
    );

    if (existing.rows.length > 0) {
      await db.query(
        `UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3`,
        [quantity, user_id, product_id]
      );
      res.json({ message: "Product found in cart, quantity increased" });
    } else {
      await db.query(
        `INSERT INTO cart_items (user_id,product_id,quantity) VALUES ($1,$2,$3)`,
        [user_id, product_id, quantity]
      );
      res.json({ message: "Proccduct added to cart" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "DB error" });
  }
};

exports.get_cart = async (req, res) => {
  const user_id = req.user.id;
  //   const product_id = req.body.product_id;
  try {
    // const items = await db.query(
    //   `SELECT * FROM cart_items WHERE user_id = $1`,
    //   [user_id]
    // );

    const items = await db.query(
      //       `select * from products where id in
      // (select product_id from cart_items where user_id = $1)`,

      `select cart.id,users.username,products.name,quantity,products.id,products.price,products.price * quantity as "total" from cart_items cart join users on users.id = cart.user_id join products on products.id = cart.product_id where users.id = $1`,
      [user_id]
    );
    console.log(items.rows);
    res.json(items.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Db error" });
  }
};

exports.placeOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    // await db.query("BEGIN");

    const cartRes = await db.query(
      `
      SELECT c.product_id, c.quantity, p.price
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
      `,
      [userId]
    );

    const cart_items = cartRes.rows;

    if (cart_items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const totalPrice = cart_items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderRes = await db.query(
      `INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id`,
      [userId, totalPrice]
    );
    const order_id = orderRes.rows[0].id;

    for (const item of cart_items) {
      await db.query(
        `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        `,
        [order_id, item.product_id, item.quantity, item.price]
      );
    }

    await db.query(`DELETE FROM cart_items WHERE user_id = $1`, [userId]);

    await db.query("COMMIT");

    res.status(201).json({ message: "Order placed", order_id: order_id });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "DB error" });
  }
};

exports.get_user_orders = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await db.query(
      `select order_items.order_id,products.name,order_items.quantity,orders.total_price,products.image_url
        from order_items 
        inner join orders 
        on order_items.order_id = orders.id 
        inner join products 
        on order_items.product_id = products.id 
        where orders.user_id = $1
	`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "DB error" });
  }
};
