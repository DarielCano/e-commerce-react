import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

import "./SelectEl.css";

const SelectEl = ({ prodData }) => {
  const { quantity, stock, id } = prodData;
  const { updateQuantity } = useContext(CartContext);
  let numList = [];

  for (let i = 1; i <= stock + quantity; i++) {
    numList.push(i);
  }

  return (
    <>
      <select name="select" onChange={(e) => updateQuantity(e, id)}>
        <option key={quantity} value={`${quantity}`}>{`${quantity}`}</option>

        {numList.map((n) => {
          if (n != quantity) {
            return <option key={n} value={`${n}`}>{`${n}`}</option>;
          }
        })}
      </select>
    </>
  );
};

export default SelectEl;
