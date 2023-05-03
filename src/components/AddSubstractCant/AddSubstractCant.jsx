import { useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { CartContext } from "../../context/CartContext";

import "./AddSubstractCant.css";

const AddSubstractCant = ({ stock }) => {
  const { substractItem, addItem, cantItem } = useContext(CartContext);
  return (
    <div className="addDeleteCant">
      <AiOutlineMinus className="cant" onClick={() => substractItem()} />
      {cantItem}
      <AiOutlinePlus className="cant" onClick={() => addItem(stock)} />
    </div>
  );
};

export default AddSubstractCant;
