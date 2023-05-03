import "./ShopContainer.css";

const ShopProduct = ({ prod }) => {
  const { title, price, quantity } = prod;

  return (
    <div className="shop-products">
      <h3>{title}</h3>
      <div className="shop-products__number">
        <p>
          Precio: <strong>$ {price}</strong>
        </p>
        <p>
          Cantidad: <strong>{quantity}</strong>
        </p>
      </div>
    </div>
  );
};

export default ShopProduct;
