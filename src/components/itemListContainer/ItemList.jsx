import { useContext } from "react";

import Item from "./Item";
import { CartContext } from "../../context/CartContext";

import "./ItemListContainer.css";

function ItemList({ products }) {
  const { lastItem } = useContext(CartContext);

  return (
    <div className="item-container">
      {products.map((prod) => (
        <Item
          key={prod.id}
          id={prod.id}
          title={prod.title}
          price={prod.price}
          src={prod.src}
          description={prod.description}
          stock={
            prod.id != lastItem.id || lastItem.id == ""
              ? prod.stock
              : lastItem.stock
          }
        />
      ))}
    </div>
  );
}

export default ItemList;
