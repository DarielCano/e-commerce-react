import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navBar/NavBar";
import ItemListContainer from "./components/itemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/itemDetailContainer/ItemDetailContainer";

function App() {
  return (
    <BrowserRouter>
      <div className="myApp">
        <Navbar numProd={0} />
        <Routes>
          <Route path="/e-commerce-react/" element={<ItemListContainer />} />
          <Route
            path="/e-commerce-react/category/:cid"
            element={<ItemListContainer />}
          />
          <Route
            path="/e-commerce-react/detail/:pid"
            element={<ItemDetailContainer />}
          />
          <Route path="*" element={<Navigate to="/e-commerce-react/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
