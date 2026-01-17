const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET test
router.get("/", (req, res) => {
  res.send("Product API working");
});

// POST: add product
router.post("/add", async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = new Product({ name, price });
    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// GET: fetch all products
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
