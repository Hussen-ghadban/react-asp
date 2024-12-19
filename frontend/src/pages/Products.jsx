import  { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../componenets/SearchProduct";
import { Link } from "react-router-dom";
import Category from "./Categories";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5118/api/Category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchProductsByCategory = async (categoryId) => {
    try {
     
      const response = await axios.get(`http://localhost:5118/api/Product/productbycategory?categoryId=${categoryId}`);

      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching products");
      setLoading(false);
    }
  };
  const fetchProducts = async () => {
    try {
     
      const response = await axios.get("http://localhost:5118/api/Product");

      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching products");
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchProducts();
    fetchCategories();
  }, []);
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5118/api/Product/${id}`);
      setMessage("Product deleted successfully!");
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error deleting product");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
        <SearchBar setProducts={setProducts} /> 
        <select
  name="categoryId"
  value={selectedCategory}
  onChange={(e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    // Fetch filtered products or all products
    if (categoryId) {
      fetchProductsByCategory(categoryId);
    } else {
      fetchProducts(); // Fetch all products when no category is selected
    }
  }}
>
  <option value="">All Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
          <div style={{ display: "flex" }}>  {product.name} - {product.quantity}
            <button onClick={()=>deleteProduct(product.id)} > Delete</button>
            <Link to={`/edit-product/${product.id}`}><button>Edit</button></Link>
            </div>
          </li>
        ))}
      </ul>
      <Category/>
    </div>
  );
};

export default Product;
