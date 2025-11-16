import express from "express";
import cors from "cors";
import { supabase } from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  const { data, error } = await supabase
  .from("recipes")
  .select("*");

  if (error) {
    console.error("Ошибка Supabase:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
