import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import "../../stylesheet/ItemListContainer.css";

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
        />
      ))}
    </div>
  );
}

export default ItemList;
