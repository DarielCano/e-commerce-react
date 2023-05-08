import { createContext, useEffect, useState } from "react";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

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
  const [lastItem, setLastItem] = useState({ id: "", stock: 0 });

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  /* actualizar base de datos */
  const updateStock = (id, stock) => {
    updateDoc(doc(db, "productos", `${id}`), {
      stock: stock,
    });
  };

  /* agregar producto */
  const addToCart = (product) => {
    let prodIndex = cartList.findIndex(
      (prod) => prod.item.id === product.item.id
    );
    if (prodIndex === -1) {
      product.item.stock = product.item.stock - product.quantity;

      if (product.item.stock >= 0) {
        product.amount = product.quantity * product.item.price;
        setLastItem({ id: product.item.id, stock: product.item.stock });
        updateStock(product.item.id, product.item.stock);
        setCartList([...cartList, product]);
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
      }
    } else {
      cartList[prodIndex].item.stock =
        cartList[prodIndex].item.stock - cartList[prodIndex].quantity;

      if (cartList[prodIndex].item.stock >= 0) {
        cartList[prodIndex].quantity =
          cartList[prodIndex].quantity + product.quantity;
        cartList[prodIndex].amount =
          cartList[prodIndex].quantity * cartList[prodIndex].item.price;
        setLastItem({
          id: cartList[prodIndex].item.stock,
          stock: cartList[prodIndex].item.stock,
        });
        updateStock(
          cartList[prodIndex].item.id,
          cartList[prodIndex].item.stock
        );
        setCartList([...cartList]);
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
      }
    }
  };

  /* eliminar producto */
  const deleteItem = (id) => {
    const prodToDelete = cartList.find((el) => el.item.id == id);
    prodToDelete.item.stock = prodToDelete.item.stock + prodToDelete.quantity;

    updateStock(id, prodToDelete.item.stock);

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
  const removeList = (compra = false) => {
    if (!compra) {
      cartList.forEach((el) => {
        el.item.stock = el.item.stock + el.quantity;
        setLastItem({
          id: el.item.id,
          stock: el.item.stock,
        });
        updateStock(el.item.id, el.item.stock);
      });
    }
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
  const updateQuantity = (e, id) => {
    let index = cartList.findIndex((prod) => prod.item.id === id);

    const newQuantity = parseInt(e.target.value);

    if (newQuantity < cartList[index].quantity) {
      cartList[index].item.stock =
        cartList[index].item.stock + (cartList[index].quantity - newQuantity);
      cartList[index].quantity = newQuantity;
    } else if (newQuantity > cartList[index].quantity) {
      cartList[index].item.stock =
        cartList[index].item.stock - (newQuantity - cartList[index].quantity);
      cartList[index].quantity = newQuantity;
    }
    cartList[index].amount =
      cartList[index].quantity * cartList[index].item.price;
    setCartList([...cartList]);
    updateStock(id, cartList[index].item.stock);
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
        lastItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
