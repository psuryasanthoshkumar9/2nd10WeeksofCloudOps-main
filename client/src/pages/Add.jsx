import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "./config";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",   // ✅ FIXED
    price: "",
    cover: "",
  });

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/books`, book);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>

      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />

      <textarea
        rows={5}
        placeholder="Book description"
        name="description"   // ✅ FIXED
        onChange={handleChange}
      />

      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />

      <button onClick={handleClick}>Add</button>
      {error && <span style={{ color: "red" }}>Something went wrong!</span>}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Add;
