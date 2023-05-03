import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext([]);

export function CartContextProvider({ children }) {
  const [cartList, setCartList] = useState(() => {
    let list = localStorage.getItem("cartList");
    if (list) {
      return (list = JSON.parse(localStorage.getItem("cartList")));
    } else {
      return [];
    }
  });
  const [cantItem, setCantItem] = useState(1);
  const [optionValue, setOptionValue] = useState("");

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  /* agregar producto */
  const addToCart = (product) => {
    let prodIndex = cartList.findIndex(
      (prod) => prod.item.id === product.item.id
    );
    if (prodIndex === -1) {
      product.amount = product.quantity * product.item.price;
      setCartList([...cartList, product]);
    } else {
      cartList[prodIndex].quantity =
        cartList[prodIndex].quantity + product.quantity;
      cartList[prodIndex].amount =
        cartList[prodIndex].quantity * cartList[prodIndex].item.price;
      setCartList([...cartList]);
    }
    setCantItem(1);
    toast("Agregado al Carrito", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "success",
    });
  };

  /* eliminar producto */
  const deleteItem = (id) => {
    setCartList(cartList.filter((el) => el.item.id !== id));
    toast("Eliminado del Carrito", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "error",
    });
  };

  /* eliminar carrito */
  const removeList = () => {
    setCartList([]);
  };

  /* precio total en carrito */
  const Amount = () => {
    let totalAmount = 0;
    cartList.map((prod) => {
      totalAmount += prod.amount;
    });
    return totalAmount;
  };

  /* cantidad en carrito */
  const cartNumProd = () => {
    let numProd = 0;
    if (cartList.length != 0) {
      cartList.map((prod) => {
        numProd += prod.quantity;
      });
    }
    return numProd;
  };

  //////////////////////////////////////////////////////////
  /* Funciones del ItemCount(sumar y rectar productos) */

  const addItem = (stock) => {
    if (cantItem < stock) setCantItem(cantItem + 1);
    else setCantItem(stock);
  };

  const substractItem = () => {
    if (cantItem > 1) setCantItem(cantItem - 1);
    else setCantItem(1);
  };

  ///////////////////////////////////////////////////////////

  /* Funciones selector de productos en el carrito */
  const updateQuantity = (id) => {
    let index = cartList.findIndex((prod) => prod.item.id === id);
    cartList[index].quantity = optionValue;
    setCartList([...cartList]);
  };

  ////////////////////////////////////////////////////////////
  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        deleteItem,
        removeList,
        Amount,
        cartNumProd,
        substractItem,
        addItem,
        cantItem,
        setOptionValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
