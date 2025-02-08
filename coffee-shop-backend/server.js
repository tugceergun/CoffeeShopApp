import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import users from "./routes/users.js";
import coffees from "./routes/coffees.js";
import favorites from "./routes/favorites.js";
import cart from "./routes/cart.js";
import pool from "./db.js";

dotenv.config();

console.log(process.env.DB_USER);

const app = express();         //used to create an HTTP server
app.use(cors());              //Allows other resources (such as frontend, mobile application) to access the api
app.use(express.json());     //used to read incoming data in JSON format

app.use("/users", users);    //Directs incoming requests to the relevant router
app.use("/coffees", coffees);
app.use("/favorites", favorites);
app.use("/cart", cart);

app.listen(5000, () => console.log("Server is working on port 5000"));    //starts the server on port 5000
