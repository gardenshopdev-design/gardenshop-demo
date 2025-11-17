import React from "react";
import s from "./CartItem.module.css";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Slices/cartSlice";
import { useDispatch } from "react-redux";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3333"
    : "https://gardenshop-backend.onrender.com");

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleDeleteButton = () => {
    dispatch(removeFromCart(item.id));
  };
  const handlePlusItem = () => {
    dispatch(increaseQuantity(item.id));
  };
  const handleMinusItem = () => {
    dispatch(decreaseQuantity(item.id));
  };

  return (
    <div className={s.itemCard}>
      <div
        style={{
          backgroundImage: `url(${API_URL}${item.image})`,
          position: "relative",
          width: "12.5rem",
        }}
        className={s.productImg}
      ></div>

      <div className={s.info}>
        <h3>{item.title}</h3>
        <div className={s.controls}>
          <div className={s.quantityBox}>
            <button onClick={handleMinusItem}>-</button>
            <span className={s.quantity}>{item.quantity}</span>
            <button onClick={handlePlusItem}>+</button>
          </div>
          <div>
            {item.discont_price === null ? (
              <span className={s.dprice}>{"$" + item.price * item.quantity}</span>
            ) : (
              <>
                <span className={s.dprice}>
                  {"$" + item.discont_price * item.quantity}
                </span>
                <span className={s.price}>
                  {"$" + item.price * item.quantity}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <span className={s.cross} onClick={handleDeleteButton}>
        &times;
      </span>
    </div>
  );
}

export default CartItem;
