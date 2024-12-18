import  { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../componenets/SearchProduct";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchProducts();
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
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
          <div style={{ display: "flex" }}>  {product.name} - {product.quantity}
            <button onClick={()=>deleteProduct(product.id)} > Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
