import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useContext } from "react";

import { CartContext } from "../../context/CartContext";
import AddSubstractCant from "../AddSubstractCant/AddSubstractCant";

import "./ItemCount.css";
import "../../stylesheet/gral-styles/site-styles.css";

function ItemCount({ stock, onAdd }) {
  const { cantItem } = useContext(CartContext);

  return (
    <div className="item-action">
      <AddSubstractCant stock={stock} />

      <button className="btn btn-50" onClick={() => onAdd(true, cantItem)}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ItemCount;
