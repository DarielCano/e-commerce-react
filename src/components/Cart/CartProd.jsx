import { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { CartContext } from "../../context/CartContext";
import Select from "../Select/Select";

import "./Cart.css";

function CartProd({ prod }) {
  const { deleteItem, updateQuantity } = useContext(CartContext);
  const { item, quantity, amount } = prod;

  let prodData = {
    quantity,
    stock: item.stock,
  };

  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.price}</td>
      <td>
        <Select prodData={prodData} />
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
