import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import Category from "./pages/Categories";
import Product from "./pages/Products";

const App = () => {
  return (
    <div>
      <Product/>
      <Category/>
      <AddProduct/>
      <AddCategory/>
    </div>
  );
};

export default App;
