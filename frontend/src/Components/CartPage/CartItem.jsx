import React from "react";
import s from "./CartItem.module.css";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Slices/cartSlice";
import { useDispatch } from "react-redux";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

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

  // ---- робота з грошима в "центах", щоб не було хвостів ----
  const toCents = (value) => Math.round(Number(value) * 100);

  const formatPriceFromCents = (cents) => {
    if (!Number.isFinite(cents)) return "0";
    if (cents % 100 === 0) {
      return (cents / 100).toFixed(0); // без копійок
    }
    return (cents / 100).toFixed(2); // 2 знаки після коми
  };

  const basePrice = item.price;
  const discountPrice =
    item.discont_price !== null && item.discont_price !== undefined
      ? item.discont_price
      : null;

  const quantity = item.quantity || 1;

  const effectivePrice = discountPrice ?? basePrice;

  const effectiveCents = toCents(effectivePrice) * quantity;
  const baseCents = toCents(basePrice) * quantity;

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
            <span className={s.quantity}>{quantity}</span>
            <button onClick={handlePlusItem}>+</button>
          </div>
          <div>
            {discountPrice === null ? (
              // без знижки
              <span className={s.dprice}>
                {"$" + formatPriceFromCents(baseCents)}
              </span>
            ) : (
              // є знижка
              <>
                <span className={s.dprice}>
                  {"$" + formatPriceFromCents(effectiveCents)}
                </span>
                <span className={s.price}>
                  {"$" + formatPriceFromCents(baseCents)}
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
