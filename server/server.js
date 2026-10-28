const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Booking = require("./models/Booking");

const app = express();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Error:", err));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("IMovies Backend is running!");
});
app.get("/test", (req, res) => {
res.json({ message: "Backend connection successful!" });
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
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

app.post("/api/bookings", async (req, res) => {
  try {
    const { movieTitle, tickets } = req.body;

    const prices = {
      Interstellar: 200,
      Inception: 180,
      "The Batman": 220
    };

    if (!Object.hasOwn(prices, movieTitle)) {
      return res.status(400).json({ message: "Invalid movie selected." });
    }

    if (!Number.isInteger(tickets) || tickets < 1 || tickets > 10) {
      return res.status(400).json({ message: "Select 1 to 10 tickets." });
    }

    const totalPrice = prices[movieTitle] * tickets;

    const booking = await Booking.create({
      movieTitle,
      tickets,
      totalPrice
    });

    res.status(201).json({
      message: "Booking saved successfully!",
      booking
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Could not save booking." });
  }
});
console.log("Booking route registered!");


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`IMovies server running on http://localhost:${PORT}`);
});