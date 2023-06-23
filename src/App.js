import "./App.css";
import SearchBar from "./Components/SearchBar";
import ProductList from "./Pages/ProductList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster />
      <h1>Snacks Table</h1>
      <SearchBar />
      <ProductList />
    </div>
  );
}

export default App;
