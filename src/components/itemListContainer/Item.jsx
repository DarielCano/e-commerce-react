import { Link } from "react-router-dom";
import "../../stylesheet/gral-styles/site-styles.css";
import "../../stylesheet/cards.css";

function Item({ id, title, price, src, description }) {
  return (
    <div className="item-card">
      <a className="item-card__img" href="#">
        <img src={src} alt={description} />
      </a>
      <div className="item-card__info">
        <h3>{title}</h3>
        <strong>${price}</strong>
        <div className="item-card__btn">
          <Link
            className="btn wd-90 link-btn"
            to={`/e-commerce-react/detail/${id}`}
          >
            <button className="">Detalle</button>
          </Link>
          <button className="btn wd-90">Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
}

export default Item;
