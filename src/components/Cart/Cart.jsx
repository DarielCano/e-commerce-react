import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

import CartProd from "./CartProd";
import BtnLink from "../Btn/BtnLink";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../Modal/Modal";

import { auth } from "../../firebase/config";
import { doc, addDoc, collection, query, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import Swal from "sweetalert2";

import "./Cart.css";
import "../../stylesheet/gral-styles/site-styles.css";

const initialFormCart = {
  name: "",
  email: "",
  phone: "",
};

const validationsFormCart = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexPhone =
    /^\+?([0-9]{2})\)?[-]?([0-9]{3})[ ]?([0-9]{3})?[-]?([0-9]{4})$/;

  if (!form.email.trim()) {
    errors.email = "El campo email es requerido";
  } else if (regexEmail.test(form.email.trim()) == false) {
    errors.email = "Email incorrecto";
  }

  if (!form.name.trim()) {
    errors.name = "El campo nombre es requerido ";
  } else if (regexName.test(form.name.trim()) == false) {
    errors.name = "El nombre solo acepta letras y espacios en blanco";
  }

  if (!form.phone) {
    errors.phone = "El campo teléfono es requerido ";
  } else if (isNaN(form.phone)) {
    errors.phone = "Solo se aceptan números en el teléfono ";
  } else if (regexPhone.test(form.phone.trim()) == false) {
    errors.phone = "Número inválido ";
  }

  return errors;
};

export default function Cart() {
  const { cartList, removeList, Amount } = useContext(CartContext);
  const { setUserLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [viewShop, setViewShop] = useState(false);
  const [shopIdInput, setShopIdInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formCart, setFormCart] = useState(initialFormCart);
  const [errors, setErrors] = useState({});
  const [emailConfirm, setEmailConfirm] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  let amount = Amount();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handelSubmitShop = (e) => {
    e.preventDefault();
    setErrors(validationsFormCart(formCart));

    if (!errors.name && !errors.phone && !errors.email) {
      if (!emailConfirm || formCart.email !== emailConfirm) {
        setErrorEmail("Los email no coinciden");
      } else {
        setIsOpen(false);
        setOrder();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormCart({
      ...formCart,
      [name]: value,
    });
  };

  const endOrder = () => {
    if (auth.currentUser) {
      setOrder();
    } else {
      Swal.fire({
        title: "Información",
        text: "Desea continuar su compra sin autenticación?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Iniciar Sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsOpen(true);
        } else {
          setUserLogin(false);
          navigate("/e-commerce-react/login");
        }
      });
    }
  };

  const setOrder = async () => {
    let order = {
      buyer: {
        email: auth.currentUser?.email || formCart.email,
        name: auth.currentUser?.displayName || formCart.name,
        phone: auth.currentUser?.phoneNumber || formCart.phone,
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

    removeList(true);
    try {
      const orderId = await addDoc(collection(db, "orders"), order);
      Swal.fire({
        title: "Compra enviada",
        text: "Presione Ok para continuar",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
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
        {auth.currentUser !== null && (
          <h3 className="cart-user">
            Usuario:
            <strong>
              {auth.currentUser.displayName} <p>{auth.currentUser.email}</p>
            </strong>
          </h3>
        )}
        <AiOutlineWarning className="warn-btn" />
        <h2>No hay productos en su carrito</h2>;
        <div className="cartBtn">
          <BtnLink
            btnName={"Ir a comprar"}
            btnLink={"/e-commerce-react/"}
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
            <p>Para consultar su orden de compra inserte su Id de la compra:</p>
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
    <>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <h2 style={{ textAlign: "center" }}>Ingrese sus datos</h2>
        <form
          onSubmit={handelSubmitShop}
          className="login-inputs"
          style={{ marginTop: "4rem" }}
        >
          <input
            type="text"
            name="name"
            value={formCart.name}
            onChange={handleChange}
            placeholder="Jhon Doe"
          />
          {errors.name && <p className="input-errors">{errors.name}</p>}
          <input
            type="text"
            name="phone"
            value={formCart.phone}
            onChange={handleChange}
            placeholder="+123456789456"
          />
          {errors.phone && <p className="input-errors">{errors.phone}</p>}
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="john@gmail.com"
            value={formCart.email}
          />
          {errors.email && <p className="input-errors">{errors.email}</p>}

          <input
            name="email"
            onChange={(e) => setEmailConfirm(e.target.value)}
            type="email"
            placeholder="john@gmail.com"
            value={emailConfirm}
          />
          {errorEmail && (
            <p className="input-errors">Los emails no coinciden</p>
          )}

          <div className="login-buttons">
            <input
              type="submit"
              className="btn"
              value="Finalizar Compra"
              style={{ marginTop: "2rem" }}
            />
          </div>
        </form>
      </Modal>
      <div className="cartView">
        {auth.currentUser !== null && (
          <h3 className="cart-user">
            Usuario:
            <strong>
              {auth.currentUser.displayName} <p>{auth.currentUser.email}</p>
            </strong>
          </h3>
        )}
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
            onClick={endOrder}
            className="btn"
            style={{ marginBottom: "2rem" }}
          >
            Comprar
          </button>
          <BtnLink
            btnName={"Seguir comprando"}
            btnLink={"/e-commerce-react/"}
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
    </>
  );
}
