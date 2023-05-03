import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import CartProd from "./CartProd";
import BtnLink from "../Btn/BtnLink";
import { CartContext } from "../../context/CartContext";

import { auth } from "../../firebase/config";
import { doc, addDoc, collection, query, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import Swal from "sweetalert2";

import "./Cart.css";
import "../../stylesheet/gral-styles/site-styles.css";

export default function Cart() {
  const { cartList, removeList, Amount } = useContext(CartContext);
  const navigate = useNavigate();
  const [viewShop, setViewShop] = useState(false);
  const [shopIdInput, setShopIdInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  let amount = Amount();
  console.log(cartList);

  const setOrder = async () => {
    let order = {
      buyer: {
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
        phone: auth.currentUser.phoneNumber,
      },
      cartProducts: cartList.map((prod) => {
        return {
          id: prod.item.id,
          title: prod.item.title,
          price: prod.item.price,
          quantity: prod.quantity,
        };
      }),
      totalAmount: amount,
      isActive: true,
    };

    try {
      const orderId = await addDoc(collection(db, "orders"), order);
      Swal.fire({
        title: "Compra enviada",
        text: "Presione Ok para continuar",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          removeList();
          navigate(`/e-commerce-react/my-shop/${orderId.id}`);
        }
      });
    } catch (error) {
      console.log("Ocurrió un error: " + error);
    }
  };

  const getOrder = (id) => {
    const q = query(doc(db, "orders", `${id}`));
    getDoc(q)
      .then((resp) => {
        if (resp.data() === undefined) throw error;
        navigate(`/e-commerce-react/my-shop/${id}`);
      })
      .catch(() => {
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
      });
  };
  const searchId = () => {
    if (shopIdInput && shopIdInput != "") {
      getOrder(shopIdInput);
    }
  };
  if (cartList.length === 0) {
    return (
      <div className="cartEmpty ">
        <h3 className="cart-user">
          Usuario:
          <strong>
            {auth.currentUser.displayName} <p>{auth.currentUser.email}</p>
          </strong>
        </h3>
        <h2>No hay productos en su carrito</h2>;
        <div className="cartBtn">
          <BtnLink
            btnName={"Ir a comprar"}
            btnLink={"/e-commerce-react/inicio"}
            mgt={true}
          />
          <button
            className="btn"
            style={{ marginTop: "1rem" }}
            onClick={() => setViewShop(true)}
          >
            Consultar compras
          </button>
        </div>
        {viewShop && (
          <div className="shop-Id">
            <p>
              Para consultar su orden de compra inserte su Id de la compra:{" "}
            </p>
            <div className="shop-Id-search">
              <input
                type="text"
                value={shopIdInput}
                name="searchShopId"
                onChange={(e) => {
                  setShopIdInput(e.target.value);
                }}
              />
              <button className="btn" onClick={() => searchId()}>
                Ir
              </button>
            </div>
            {errorMessage && (
              <p className="searchShopId-error">
                No existe ninguna orden de compra con ese ID
              </p>
            )}
            <button
              className="btn"
              style={{ width: "25rem", marginTop: "1rem" }}
              onClick={() => setViewShop(false)}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="cartView">
      <h3 className="cart-user">
        Usuario:
        <strong>
          {auth.currentUser.displayName} <p>{auth.currentUser.email}</p>
        </strong>
      </h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Importe</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((el) => (
            <CartProd key={el.item.id} prod={el} />
          ))}
        </tbody>
      </table>

      <div className="amount">
        <p>
          Importe Total: <strong>${amount}</strong>
        </p>
      </div>
      <div className="cartBtn">
        <button
          onClick={setOrder}
          className="btn"
          style={{ marginBottom: "2rem" }}
        >
          Comprar
        </button>
        <BtnLink
          btnName={"Seguir comprando"}
          btnLink={"/e-commerce-react/Inicio"}
          mgt={true}
        />
        <button
          className="btn"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
          onClick={() => removeList()}
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}
