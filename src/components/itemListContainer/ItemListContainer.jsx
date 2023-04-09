import { useEffect, useState } from "react";
import "../../stylesheet/ItemListContainer.css";
import ItemList from "./ItemList";
import { mockFetch } from "../../js/mock";
import loaderIcon from "../../assets/loader.svg";
import { CiSearch } from "react-icons/ci";
import "../../stylesheet/Filter.css";
import { useParams } from "react-router-dom";

function ItemListContainer() {
  let isCid = "";
  let { cid } = useParams();

  let [productos, setProductos] = useState([]);
  const [filterState, setFilterState] = useState("");

  useEffect(() => {
    if (!cid) {
      mockFetch()
        .then((resp) => setProductos(resp))
        .catch((err) => console.log(err));
    } else {
      mockFetch()
        .then((resp) =>
          setProductos(resp.filter((prod) => prod.category === cid))
        )
        .catch((err) => console.log(err));
    }
  }, [cid]);

  const handleFilterChange = (e) => {
    setFilterState(e.target.value);
  };

  if (productos.length === 0) {
    return (
      <div className="loaderIcon">
        <img src={loaderIcon} alt="icono de carga" />
      </div>
    );
  } else {
    return (
      <div className="ppal-container">
        <div className="filter">
          <input
            type="text"
            value={filterState}
            onChange={handleFilterChange}
          />
          <CiSearch className="searchIcon" />
        </div>

        <ItemList
          productos={
            filterState === ""
              ? productos
              : productos.filter((prod) =>
                  prod.title.toLowerCase().includes(filterState.toLowerCase())
                )
          }
        />
      </div>
    );
  }
}

export default ItemListContainer;
