const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET test
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // ✅ return JSON
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
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

// 1️⃣ Get all products (FIRST)
router.get("/all", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 2️⃣ Get single product by ID (SECOND)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
