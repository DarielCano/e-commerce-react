import { useState, useContext } from "react";

import ItemCount from "../itemCount/itemCount";
import { CartContext } from "../../context/CartContext";
import BtnLink from "../Btn/BtnLink";

import "./itemDetail.css";
import "../../stylesheet/gral-styles/site-styles.css";

function ItemDetail({ item }) {
  const [endShop, setEndShop] = useState(false);

  const { addToCart } = useContext(CartContext);

  function onAdd(val, cant) {
    setEndShop(val);

    addToCart({ item, quantity: cant });
  }

  return (
    <div className="itemDetail">
      <h2 className="itemDetail-name">{item.title}</h2>
      <div className="itemDetail-info">
        <div className="itemDetail-img">
          <img src={item.src} alt="camisa" />
        </div>
        <div className="itemDetail-action">
          <p>{item.description}</p>

          {endShop === false ? (
            <>
              <ItemCount stock={item.stock} onAdd={onAdd} />
            </>
          ) : (
            <div className="altBtn">
              <BtnLink
                btnName={"Terminar Compra"}
                btnLink={"/e-commerce-react/cart"}
              />

              <BtnLink
                btnName={"Seguir comprando"}
                btnLink={"/e-commerce-react/Inicio"}
                mgt={true}
              />
            </div>
          )}

          <strong className="itemDetail-action__price">$ {item.price}</strong>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
