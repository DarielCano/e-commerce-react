import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

import "./Select.css";

const Select = ({ quant, stock }) => {
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
        <option selected key={100} value={`${quant}`}>{`${quant}`}</option>

        {numList.map((n) => {
          if (n != quant) {
            return <option key={n} value={`${n}`}>{`${n}`}</option>;
          }
        })}
      </select>
    </>
  );
};

export default Select;
