import  { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5118/api/Category");
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5118/api/Category/${id}`);
      setMessage("category deleted successfully!");
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
      setMessage("Error deleting category");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
          <div style={{ display: "flex" }}>  {category.name}
            <button onClick={()=>deleteCategory(category.id)} > Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {/* {{message}} */}
      {message && <p>{message}</p>}

    </div>
  );
};

export default Category;
