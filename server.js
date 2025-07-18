const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const authRoutes = require("../e_com_pg/routes/authroutes");
const userRoutes = require("../e_com_pg/routes/user_routes");
const productRoutes = require("../e_com_pg/routes/product_routes");
const orderRoutes = require("../e_com_pg/routes/order_routes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
