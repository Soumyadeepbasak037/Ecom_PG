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
    const query = ``;
  } catch (err) {}
};
