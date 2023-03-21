import React from "react";
import "../../stylesheet/ItemListContainer.css";

function ItemListContainer({ greeting }) {
  return (
    <div className="ppal-container">
      <h1>{greeting}</h1>
    </div>
  );
}

export default ItemListContainer;
