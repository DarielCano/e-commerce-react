import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ItemDetail from "./ItemDetail";
import Loader from "../Loader/Loader";

import { query, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import "./itemDetailContainer.css";

function ItemDetailContainer() {
  let [product, setProduct] = useState({});
  let [loading, setLoading] = useState(true);
  let { pid } = useParams();

  useEffect(() => {
    const q = query(doc(db, "productos", `${pid}`));
    getDoc(q)
      .then((resp) => setProduct({ id: resp.id, ...resp.data() }))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <div className="loader-content">
        <Loader />
      </div>
    );
  return (
    <div className="itemDetailContainer ">
      <ItemDetail item={product} />
    </div>
  );
}

export default ItemDetailContainer;
