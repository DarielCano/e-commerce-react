import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

import BtnLink from "../Btn/BtnLink";
import ShopProduct from "./ShopProduct";
import Loader from "../Loader/Loader";

import Swal from "sweetalert2";

import { doc, query, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import "./ShopContainer.css";
import "../../stylesheet/gral-styles/site-styles.css";

const ShopContainer = () => {
  const { shopId } = useParams();
  const [showShopping, setShowShopping] = useState(false);
  const [orderToShow, setOrderToShow] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  const getShopping = (id) => {
    setLoading(true);
    const q = query(doc(db, "orders", `${id}`));
    getDoc(q)
      .then((resp) => {
        if (resp.data().isActive) {
          setOrderToShow(resp.data());
        } else {
          setMessage(true);
        }
      })
      .catch((error) => {
        console.log("Ocurrió un error: " + error);
      })
      .finally(() => {
        setLoading(false);
        setShowShopping(true);
      });
  };

  useEffect(() => {
    getShopping(shopId);
  }, []);

  const cancelShopping = async (id) => {
    Swal.fire({
      title: "Su compra será cancelada",
      text: "Presione Ok para confirmar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          updateDoc(doc(db, "orders", `${id}`), { isActive: false }).then(() =>
            Swal.fire({
              title: "Compra cancelada",
              text: "Presione Ok para continuar",
              icon: "success",

              confirmButtonText: "Ok",
            }).then(navigate("/e-commerce-react/cart"))
          );
        } catch (error) {
          console.log("HA ocurrido un error: " + error);
        }
      }
    });
  };

  if (!message) {
    return (
      <div className="shop-container">
        <div className="shop-detail">
          <h2>Detalles de su compra</h2>
          <p> El ID de su compra actual es {shopId}</p>
        </div>
        {showShopping &&
          (loading ? (
            <Loader />
          ) : (
            <div className="shop-detail-container">
              <small className="shop-detail-name">
                Aquí te mostramos tu compra
                <span> {orderToShow.buyer?.name}</span>
              </small>

              <div className="shop-show">
                {orderToShow.cartProducts.map((prod) => {
                  return <ShopProduct key={prod.id} prod={prod} />;
                })}
              </div>
              <div className="amount">
                <p>
                  Importe Total:
                  <strong>$ {orderToShow.totalAmount}</strong>
                </p>
              </div>
            </div>
          ))}
        <div className="shop-btns">
          <button
            className="btn"
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            onClick={() => cancelShopping(shopId)}
          >
            Cancelar compra
          </button>

          <BtnLink btnName={"Regresar"} btnLink={"/e-commerce-react/"} />
        </div>
      </div>
    );
  }
  return (
    <div className="shop-container">
      <h2 className="no-shopping-text">
        <AiOutlineWarning /> Error.
        <strong> La compra con este ID fue CANCELADA</strong>
      </h2>
      <div className="back">
        <BtnLink btnName={"Regresar"} btnLink={"/e-commerce-react/cart"} />
      </div>
    </div>
  );
};

export default ShopContainer;
