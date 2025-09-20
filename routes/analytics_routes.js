const express = require("express");
const router = express.Router();
const analytics_controller = require("../controllers/analyticsController");
const auth_middleware = require("../middleware/authmiddleware");

router.post(
  "/getSalesSummary",
  auth_middleware,
  analytics_controller.getSalesSummary
);
router.get(
  "/getTopProducts",
  auth_middleware,
  analytics_controller.getTopProducts
);
router.post(
  "/getTopCustomers",
  auth_middleware,
  analytics_controller.getTopCustomers
);
module.exports = router;
