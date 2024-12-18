import { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    quantity: "",
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5118/api/Category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {    
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));

  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5118/api/Product", {
        name: product.name,
        category: { id: parseInt(product.categoryId),
                name:""
         },
        quantity: parseFloat(product.quantity), // Ensure quantity is a number
      });

      setMessage("Product added successfully!");
      setProduct({ name: "", categoryId: "", quantity: "" }); // Reset form
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Error adding product");
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
        />
        <select name="categoryId" value={product.categoryId} onChange={handleInputChange}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          name="quantity"
          value={product.quantity}
          onChange={handleInputChange}
        />
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProduct;
