import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

import "./Select.css";

const Select = ({ prodData }) => {
  const { quantity, stock } = prodData;
  const { setOptionValue } = useContext(CartContext);
  let numList = [];
  {
    for (let i = 1; i < stock; i++) {
      numList.push(i);
    }
  }

  return (
    <>
      <select name="select" onChange={(e) => setOptionValue(e.target.value)}>
        <option
          selected
          key={quantity}
          value={`${quantity}`}
        >{`${quantity}`}</option>

        {numList.map((n) => {
          if (n != quantity) {
            return <option key={n} value={`${n + 1}`}>{`${n + 1}`}</option>;
          }
        })}
      </select>
    </>
  );
};

export default Select;
