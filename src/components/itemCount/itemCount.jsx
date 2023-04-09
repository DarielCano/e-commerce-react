import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "../../stylesheet/ItemCount.css";
import "../../stylesheet/gral-styles/site-styles.css";

function ItemCount({ stock, initial, onAdd }) {
  let [cantItem, setCantItem] = useState(initial);

  /* funciones de agregar y restar item */
  const addItem = () => {
    if (cantItem < stock) setCantItem(cantItem + 1);
    else setCantItem(stock);
  };

  const substractItem = () => {
    if (cantItem > 1) setCantItem(cantItem - 1);
    else setCantItem(initial);
  };
  return (
    <div className="item-action">
      <div className="addDeleteCant">
        <AiOutlineMinus className="cant" onClick={substractItem} />
        {cantItem}
        <AiOutlinePlus className="cant" onClick={addItem} />
      </div>
      <button className="btn btn-50" onClick={() => onAdd(cantItem)}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ItemCount;
