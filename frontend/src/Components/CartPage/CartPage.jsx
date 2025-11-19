import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../Slices/cartSlice";
import CartItem from "./CartItem";
import s from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Email: "",
  });
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const validate = () => {
    const newErrors = {};

    if (formData.Name.trim().length < 2) {
      newErrors.Name = "The name must contain at least 2 letters";
    }

    if (!/^\d{10,}$/.test(formData.Phone)) {
      newErrors.Phone = "Please enter a valid number (10+ digits)";
    }

    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.Email)) {
      newErrors.Email = "Enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(clearCart());
      setShowConfirmation(true);
      setFormData({ Name: "", Phone: "", Email: "" });
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // ---- гроші в центах ----
  const toCents = (value) => Math.round(Number(value) * 100);

  const formatPriceFromCents = (cents) => {
    if (!Number.isFinite(cents)) return "0";
    if (cents % 100 === 0) {
      return (cents / 100).toFixed(0);
    }
    return (cents / 100).toFixed(2);
  };

  // сумарна сума в центах
  const totalCents = cart.reduce((acc, item) => {
    const basePrice = item.price;
    const discountPrice =
      item.discont_price !== null && item.discont_price !== undefined
        ? item.discont_price
        : null;

    const effectivePrice = discountPrice ?? basePrice;
    const quantity = item.quantity || 1;

    return acc + toCents(effectivePrice) * quantity;
  }, 0);

  const itemsCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div>
      <div className={s.title}>
        <h2>Shopping cart</h2>
        <div
          className={s.dash}
          style={{
            borderTop: "1px solid var(--divider)",
            width: "100%",
          }}
        ></div>
        <button className={s.navButton} onClick={handleClick}>
          Back to the store
        </button>
      </div>

      {cart.length === 0 ? (
        <div className={s.emptyCartContainer}>
          <p className={s.emptyCart}>
            Looks like you have no items in your basket currently.
          </p>
          <button className={s.getBackBtn} onClick={handleClick}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className={s.container}>
          <div
            style={{
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            {cart.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>

          <form className={s.form} onSubmit={handleSubmit}>
            <h2>Order details</h2>
            <p>{itemsCount} items</p>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <p>Total</p>
              <h1>${formatPriceFromCents(totalCents)}</h1>
            </span>

            {errors.Name && <span className={s.errorMsg}>{errors.Name}</span>}
            <input
              name="Name"
              type="text"
              placeholder="Name"
              value={formData.Name}
              onChange={handleChange}
            />

            {errors.Phone && (
              <span className={s.errorMsg}>{errors.Phone}</span>
            )}
            <input
              name="Phone"
              type="tel"
              placeholder="Phone"
              value={formData.Phone}
              onChange={handleChange}
            />

            {errors.Email && (
              <span className={s.errorMsg}>{errors.Email}</span>
            )}
            <input
              name="Email"
              type="email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
            />

            <button type="submit">Order</button>
          </form>
        </div>
      )}

      {showConfirmation && (
        <div className={s.shader}>
          <div className={s.confirmationCard}>
            <span onClick={handleCloseConfirmation}>&times;</span>
            <h3>Congratulations!</h3>
            <p>
              Your order has been successfully placed on&nbsp;the website.
              <br />
              <br />
              A&nbsp;manager will contact you shortly to&nbsp;confirm your
              order.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
