import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
  });
  const [message, setMessage] = useState("");

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const addCategory = async () => {
    try {
      const response = await axios.post("http://localhost:5118/api/Category", category);
      setMessage("Category added successfully!");
      setCategory({ name: "" });
    } catch (error) {
      console.error("Error adding category:", error);
      setMessage("Error adding category");
    }
  };

  return (
    <div>
      <h2>Add New Category</h2>
      <input
        type="text"
        placeholder="Category Name"
        name="name"
        value={category.name}
        onChange={handleCategoryChange}
      />
      <button onClick={addCategory}>Add Category</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCategory;
