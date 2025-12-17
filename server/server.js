import express from "express";
import cors from "cors";
import { supabase } from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/recipes", async (req, res) => {
  const { data, error } = await supabase
    .from("recipes")
    .select(`*, categories(id, name), 
    recipe_ingredients!recipe_ingredients_recipe_id_fkey (
      quantity,
      ingredient_id,
      ingredients (*)
    )`);

  if (error) {
    console.error("Ошибка Supabase:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.get("/categories", async (req, res) => {
  console.log("GET /categories received!");
  const { data, error } = await supabase
    .from("categories")
    .select("id, name");

  if (error) {
    console.error("Ошибка Supabase:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});


app.get("/users", async (req, res) => {
  console.log("GET /users received!");
  const { data, error } = await supabase
    .from("users")
    .select(`*`);

  if (error) {
    console.error("Ошибка Supabase:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});




app.get("/favorites", async (req, res) => {
  console.log("GET /favorites received!");
  const { data, error } = await supabase
    .from("favorites")
    .select(`*`);

  if (error) {
    console.error("Ошибка Supabase:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});



app.post("/favorites", async (req, res) => {
  const { user_id, recipe_id } = req.body;
  console.log("POST /favorites body:", req.body);

  const { data: existing, error: checkError } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user_id)
    .eq("recipe_id", recipe_id);

  if (checkError) {
    console.error("Ошибка при проверке избранного:", checkError);
    return res.status(500).json({ error: checkError.message, details: checkError.details, hint: checkError.hint });
  }

  if (existing && existing.length > 0) {
    return res.status(400).json({ message: "Этот рецепт уже в избранном!" });
  }

  const { data, error } = await supabase
    .from("favorites")
    .insert([{ user_id, recipe_id }]);

  if (error) {
    console.error("Ошибка при вставке в favorites:", error);
    return res.status(500).json({
      message: "Ошибка при добавлении в избранное",
      error: error.message,
      details: error.details,
      hint: error.hint
    });
  }

  res.json({ message: "Рецепт добавлен в избранное", data });
});


app.delete("/favorites", async (req, res) => {
  const { user_id, recipe_id } = req.body;

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user_id)
    .eq("recipe_id", recipe_id);

  if (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка при удалении" });
  }

  res.json({ message: "Удалено из избранного" });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


