import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

import "../../stylesheet/gral-styles/site-styles.css";
import "../../stylesheet/cards.css";

function Item({ id, title, price, src, description, stock }) {
  const { addToCart } = useContext(CartContext);

  const item = {
    id,
    title,
    price,
    src,
    description,
    stock,
  };

  return (
    <div className={stock > 0 ? "item-card " : "none"}>
      <a className="item-card__img" href="#">
        <img src={src} alt={description} />
      </a>
      <div className="item-card__info">
        <h3>{title}</h3>
        <strong>${price}</strong>
        <div className="item-card__btn">
          {stock == 1 ? (
            <p className="btn " style={{ background: "red", margin: "0 auto" }}>
              última unidad disponible
            </p>
          ) : (
            <Link
              className="btn wd-90 link-btn"
              to={`/e-commerce-react/detail/${id}`}
            >
              <button>Detalle</button>
            </Link>
          )}

          <button
            className="btn wd-90"
            onClick={() => addToCart({ item, quantity: 1 })}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
