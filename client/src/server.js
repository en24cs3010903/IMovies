
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("IMovies Backend is running!");
});

app.get("/api/movies", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Interstellar",
      genre: "Sci-Fi",
      price: 200
    },
    {
      id: 2,
      title: "Inception",
      genre: "Thriller",
      price: 180
    },
    {
      id: 3,
      title: "The Batman",
      genre: "Action",
      price: 220
    }
  ]);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`IMovies server running on http://localhost:${PORT}`);
});
