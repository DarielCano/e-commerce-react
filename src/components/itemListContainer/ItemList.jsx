import Item from "./Item";

import "./ItemListContainer.css";

function ItemList({ productos }) {
  return (
    <div className="item-container">
      {productos.map((prod) => (
        <Item
          key={prod.id}
          id={prod.id}
          title={prod.title}
          price={prod.price}
          src={prod.src}
          description={prod.description}
          stock={prod.stock}
        />
      ))}
    </div>
  );
}

export default ItemList;
