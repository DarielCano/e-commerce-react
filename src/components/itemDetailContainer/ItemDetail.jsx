import ItemCount from "../itemCount/itemCount";
import "../../stylesheet/itemDetail.css";

function ItemDetail({ item }) {
  function onAdd(quantityToAdd) {
    console.log(`Cantidad en carrito: ${quantityToAdd}`);
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
          <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
          <strong className="itemDetail-action__price">$ {item.price}</strong>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
