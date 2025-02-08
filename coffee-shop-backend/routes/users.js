import express from "express";
import bcrypt from "bcryptjs";
import pool from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const router = express.Router();


router.post("/register", async (req, res) => {

  try {
    const { name, email, password } = req.body;  //datas entered by users

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Add user to db
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered succesfully!", user: newUser.rows[0] });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

});

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    //Find user
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //Compare password
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //Create JWT token
    const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email },  //payload; It embeds the user's id and email into the token. So when the backend reads the token, it knows which user it belongs to.
      process.env.JWT_SECRET,                                                  //crate token by using JWT_SECRET in .env file
      { expresIn: "1h" }                                                       //token validity time
    )

    res.json({ message: "Login successful" }, token);

  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ error: "InternaL Server Error" });
  }

})

export default router;