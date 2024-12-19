import Navbar from "./componenets/Navbar";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Product from "./pages/Products";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Product/>} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/add-category" element={<AddCategory/>} />
          <Route path="/edit-product/:id" element={<EditProduct/>} />
        </Routes>
      </BrowserRouter>
    
    </div>
  );
};

export default App;
