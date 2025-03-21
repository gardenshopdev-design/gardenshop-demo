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
		let newErrors = {};

		if (formData.Name.trim().length < 2) {
			newErrors.Name = "Имя должно содержать минимум 2 буквы";
		}

		if (!/^\d{10,}$/.test(formData.Phone)) {
			newErrors.Phone = "Введите корректный номер (10+ цифр)";
		}

		if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.Email)) {
			newErrors.Email = "Введите корректный email";
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

	return (
		<div>
			<div className={s.title}>
				<h2>Shopping cart</h2>
				<div
					className={s.dash}
					style={{
						borderTop: "1px solid #DDDDDD",
						width: "100%",
					}}
				></div>
				<button className={s.navButton} onClick={handleClick}>
					Back to the store
				</button>
			</div>
			{/* Если корзина пуста, показываем надпись и кнопку, иначе - страница корзины */}
			{cart.length === 0 ? (
				<div className={s.emptyCartContainer}>
					<p className={s.emptyCart}>
						Looks like you have no items in your basket currently.
					</p>
					<button className={s.getBackBtn} onClick={handleClick}>
						Contunue Shopping
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
						<p>{cart.length} items</p>
						<span
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginBottom: "1rem",
							}}
						>
							<p>Total</p>
							<h1>
								$
								{cart.reduce(
									(acc, item) =>
										acc + (item.discount_price || item.price) * item.quantity,
									0
								)}
							</h1>
						</span>
						{errors.Name && <span className={s.errorMsg}>{errors.Name}</span>}
						<input
							name="Name"
							type="text"
							placeholder="Name"
							value={formData.Name}
							onChange={handleChange}
						/>
						{errors.Phone && <span className={s.errorMsg}>{errors.Phone}</span>}
						<input
							name="Phone"
							type="tel"
							placeholder="Phone"
							value={formData.Phone}
							onChange={handleChange}
						/>
						{errors.Email && <span className={s.errorMsg}>{errors.Email}</span>}
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
						<h3>Congratulations! </h3>
						<p>
							Your order has been successfully placed on the website. <br />{" "}
							<br />
							A manager will contact you shortly to confirm your order.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default CartPage;
