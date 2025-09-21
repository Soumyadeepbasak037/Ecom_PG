const express = require("express");
const router = express.Router();
const analytics_controller = require("../controllers/analyticsController");
const auth_middleware = require("../middleware/authmiddleware");
const { default: roleMiddleware } = require("../middleware/roleMiddleware");

router.get(
  "/getSalesSummary",
  auth_middleware,
  roleMiddleware,
  analytics_controller.getSalesSummary
);

router.get(
  "/getTopProducts",
  auth_middleware,
  roleMiddleware,
  analytics_controller.getTopProducts
);

router.get(
  "/getTopCustomers",
  auth_middleware,
  roleMiddleware,
  analytics_controller.getTopCustomers
);
module.exports = router;
