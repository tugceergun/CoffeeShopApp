import express from "express";
const router = express.Router();


router.get("/", (req, res) => {
  res.send("Favorites route is working!");
});

export default router;