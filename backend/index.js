import express from "express";
import mysql from "mysql";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("common"));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "book_store",
  port: 3306
});

// Test DB connection
db.connect(err => {
  if (err) {
    console.error("DB CONNECTION ERROR:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.get("/", (req, res) => {
  res.json("Backend is running");
});

// GET all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

// ADD new book ✅ FIXED
app.post("/books", (req, res) => {
  const q = `
    INSERT INTO books
    (book_title, book_desc, book_price, book_cover)
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("INSERT ERROR:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(201).json({ message: "Book added successfully" });
  });
});

// DELETE book
app.delete("/books/:id", (req, res) => {
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Book deleted" });
  });
});

// UPDATE book
app.put("/books/:id", (req, res) => {
  const q = `
    UPDATE books SET
    book_title = ?,
    book_desc = ?,
    book_price = ?,
    book_cover = ?
    WHERE id = ?
  `;

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
    req.params.id
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Book updated" });
  });
});

app.listen(80, () => {
  console.log("Backend running on port 80");
});
