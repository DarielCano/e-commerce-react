import { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useParams } from "react-router-dom";

import ItemList from "./ItemList";
import Loader from "../Loader/Loader";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import "./ItemListContainer.css";
import "../../stylesheet/Filter.css";
import { CartContext } from "../../context/CartContext";

function ItemListContainer() {
  let { cid } = useParams();
  const { cartNumProd } = useContext(CartContext);

  const numProd = cartNumProd();

  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  const [filterState, setFilterState] = useState("");

  useEffect(() => {
    if (!cid) {
      const q = query(collection(db, "productos"));
      getDocs(q)
        .then((resp) => {
          const nresp = resp.docs.filter((prod) => prod.data().stock > 0);

          setProducts(nresp.map((prod) => ({ id: prod.id, ...prod.data() })));
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      const q = query(
        collection(db, "productos"),
        where("category", "==", `${cid}`)
      );

      getDocs(q)
        .then((resp) => {
          const nresp = resp.docs.filter((prod) => prod.data().stock > 0);
          setProducts(nresp.map((prod) => ({ id: prod.id, ...prod.data() })));
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [cid, numProd]);

  const handleFilterChange = (e) => {
    setFilterState(e.target.value);
  };

  if (loading) {
    return (
      <div className="loader-content">
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="ppal-container">
        <div className="filter">
          <input
            type="text"
            placeholder="Buscar producto"
            value={filterState}
            onChange={handleFilterChange}
          />
          <CiSearch className="searchIcon" />
        </div>

        <ItemList
          products={
            filterState === ""
              ? products
              : products.filter((prod) =>
                  prod.title.toLowerCase().includes(filterState.toLowerCase())
                )
          }
        />
      </div>
    );
  }
}

export default ItemListContainer;
