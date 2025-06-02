import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Invoice } from "./Model/invoice.js";

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongodb successfullt connected");
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
