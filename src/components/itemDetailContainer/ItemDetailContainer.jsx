import ItemDetail from "./ItemDetail";
import "../../stylesheet/itemDetailContainer.css";
import { mockFetch } from "../../js/mock";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ItemDetailContainer() {
  let [product, setProduct] = useState({});
  let { pid } = useParams();
  useEffect(() => {
    async function getItem(id) {
      const allProd = await mockFetch();
      const selectProd = await allProd.find((el) => el.id === parseInt(id));
      setProduct((product = selectProd));
      console.log("aqui");
    }
    getItem(pid);
  }, []);
  console.log(product);
  return (
    <div className="itemDetailContainer ">
      <ItemDetail item={product} />
    </div>
  );
}

export default ItemDetailContainer;
