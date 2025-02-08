import express from "express";
import pool from "../db.js";


const router = express.Router();


router.get("/", async (req, res) => {
  try{
    const result = await pool.query("SELECT * FROM coffees");
    res.json(result.rows);
  }catch (error){
    console.error("Error fetching coffees:", error);
    res.status(500).json({ error: "Internal Server Error"});
  }
});

export default router;