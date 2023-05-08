import { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { CartContext } from "../../context/CartContext";
import SelectEl from "../SelectEl/SelectEl";

import "./Cart.css";

function CartProd({ prod }) {
  const { deleteItem } = useContext(CartContext);
  const { item, quantity, amount } = prod;

  let prodData = {
    quantity,
    stock: item.stock,
    id: item.id,
  };

  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.price}</td>
      <td>
        <SelectEl prodData={prodData} />
      </td>
      <td>$ {amount}</td>
      <td>
        <AiOutlineDelete
          className="deleteBtn"
          onClick={() => deleteItem(item.id)}
        />
      </td>
    </tr>
  );
}

export default CartProd;
