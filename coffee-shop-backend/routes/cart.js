import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { user_id, coffe_id, quantity } = req.body;

    //add to db
    const newCartItem = await pool.query(
      "INSERT INTO cart (user_id, coffe_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [user_id, coffe_id, quantity]
    );

    res.status(201).json(newCartItem.rows[0]);   //The information of the newly added product is returned to the frontend

  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

});

export default router