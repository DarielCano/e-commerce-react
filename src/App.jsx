import { useState } from "react";
import "./App.css";
import Navbar from "./components/navBar/NavBar";
import ItemListContainer from "./components/itemListContainer/ItemListContainer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="myApp">
      <Navbar />
      <ItemListContainer greeting="Hola Mundo" />
    </div>
  );
}

export default App;
