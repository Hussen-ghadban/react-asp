import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    categoryID: "",
    quantity: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5118/api/Category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5118/api/Product/${id}`);
        setProduct(response.data);
        setFormData({
            id: response.data.id, 
          name: response.data.name,
          categoryID: response.data.categoryID,  // ensure this is set correctly
          quantity: response.data.quantity,
        });
        setLoading(false);
      } catch (err) {
        setError(`Error fetching product: ${err}`);
        setLoading(false);
      }
    };
    fetchCategories();
    fetchProduct();
  }, [id]);

  // Handle input changes (for both name, categoryID, and quantity)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.put(`http://localhost:5118/api/Product/${id}`, formData);
      navigate("/");
    } catch (err) {
      setError(`Error updating the product: ${err}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="categoryID">Category</label>
          <select
            id="categoryID"
            name="categoryID"  // Update name to match formData
            value={formData.categoryID}
            onChange={handleChange}  // Use the same handleChange function for categoryID
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
