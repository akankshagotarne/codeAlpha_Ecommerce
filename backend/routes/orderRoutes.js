const express = require("express");
const router = express.Router();
const Order = require("../models/orders");
const auth = require("../middleware/auth");

// ✅ PLACE ORDER
router.post("/", auth, async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      user: req.user.id,     // from token
      products,
      totalAmount
    });

    await order.save();
    res.json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: "Order failed" });
  }
});

// ✅ GET MY ORDERS
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.productId");

    res.json(orders);
  } catch (err) {
    console.error("FETCH ORDERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ✅ EXPORT ONLY ONCE (VERY IMPORTANT)
module.exports = router;
