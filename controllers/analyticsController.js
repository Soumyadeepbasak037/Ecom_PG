import db from "../config/db";

exports.getSalesSummary = async (req, res) => {
  try {
    const totalRevenueQuery = `select SUM(total_price) AS "revenue" from orders`;
    const totalOrdersQuery = `SELECT COUNT(*) as count FROM orders"`;

    const totalRevenueresult = await db.query(totalRevenueQuery);
    const totalOrdersresult = await db.query(totalOrdersQuery);

    const totalRevenue = totalRevenueresult.rows;
    const totalOrders = totalOrdersresult.rows;

    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    res.json({ totalRevenue, totalOrders, avgOrderValue });
  } catch (err) {
    res.status(500).json({ message: "Error fetching sales summary" });
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    const query = ` SELECT p.name, SUM(oi.quantity) as sold, SUM(oi.quantity * oi.price) as revenue
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      GROUP BY p.id
      ORDER BY sold DESC
      LIMIT 10`;

    const topProductsresults = await db.query(query);
    const topProducts = topProductsresults.rows;

    res.json({ topProducts });
  } catch (err) {
    res.status(500).json({ message: "Error fetching details" });
  }
};

exports.getTopCustomers = async (req, res) => {
  try {
    const query = ` SELECT u.username, u.email, SUM(o.total_price) as "Total_Amount", COUNT(o.id) as "Orders"
    FROM users u
    JOIN orders o ON u.id = o.user_id
    GROUP BY u.id
    ORDER BY SUM(o.total_price) DESC
    LIMIT 10`;

    const topCustomersresults = await db.query(query);
    const topCustomers = topCustomersresults.rows;

    res.json({ topCustomersresults });
  } catch (err) {
    res.status(500).json({ message: "Error fetching top customers" });
  }
};
