import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.css";

// img
import logo from "./logo.png";
import cart from "./shop_cart.png";
import { useSelector } from "react-redux";

function Header() {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const [menuOpen, setMenuOpen] = useState(false);

	// Функция для отслеживания ширины экрана
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // Проверяем сразу при загрузке

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className={s.header}>
			<Link to="/" className={s.navLink} >
				<img src={logo} alt="logo" className={s.logo} />
			</Link>

			<nav className={menuOpen ? s.open : ""}>
				<ul className={`${s.nav} ${menuOpen ? s.open : ""}`}>
					{menuOpen && <div className={s.crossBtn} onClick={()=>{setMenuOpen(false)}}>&times;</div>}
					
					<li>
						<Link to="/" className={s.navLink} onClick={()=>{setMenuOpen(false)}}>
							Main page
						</Link>
					</li>
					<li>
						<Link to="/categories" className={s.navLink} onClick={()=>{setMenuOpen(false)}}>
							Categories
						</Link>
					</li>
					<li>
						<Link to="/products" className={s.navLink} onClick={()=>{setMenuOpen(false)}}>
							All products
						</Link>
					</li>
					<li>
						<Link to="/sales" className={s.navLink} onClick={()=>{setMenuOpen(false)}}>
							All sales
						</Link>
					</li>
				</ul>
			</nav>
			<div className={s.hamburgerHolder}>
				{/*Корзина и гружочек с кол-вом товаров */}
				<Link to="/cart" className={s.navLink} style={{ position: "relative" }}>
					<img src={cart} alt="cart" className={s.cart} />
					{cartItems.length > 0 && (
						<div className={s.counter}>{cartItems.length}</div>
					)}
				</Link>
				<div className={s.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	);
}

export default Header;
