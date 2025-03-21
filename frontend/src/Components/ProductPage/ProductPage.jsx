import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../Slices/cartSlice";

import s from "./ProductPage.module.css";
import { useDispatch } from "react-redux";

function ProductPage() {
	const dispatch = useDispatch();
	const { id } = useParams();
	console.log(id);

	const [item, setItem] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const [quantity, setQuantity] = useState(1);

	const handleAddToCard = () => {
		for (let index = 0; index < quantity; index++) {
			dispatch(addToCart(item));
		}

		//console.log("Added to cart:", item);
	};

	const handleIncreaseQuantity = () => {
		setQuantity((prev) => prev + 1);
	};

	const handleDereaseQuantity = () => {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};

	useEffect(() => {
		const fetchItems = async () => {
			try {
				setLoading(true);
				setError("");

				// Запрос на сервер
				const response = await fetch(`http://localhost:3333/products/${id}`);
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}

				const data = await response.json();
				console.log(data[0]);

				setItem(data[0]);
			} catch (err) {
				setError(err.message || "Произошла ошибка");
			} finally {
				setLoading(false);
			}
		};

		fetchItems();
	}, []);

	if (loading) return <p>Загрузка товаров...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div className={s.container}>
			<div
				className={s.productImg}
				style={{
					backgroundImage: `url(http://localhost:3333${item.image})`,
					width: "780px",
					height: "572px",
					position: "relative",
				}}
			></div>
			<div className={s.info}>
				<h2>{item.title}</h2>
				<div className={s.priceBox}>
					{/* Цена */}
					<div >
						{item.discont_price === null ? (
							<span className={s.dprice}>{"$" + item.price}</span>
						) : (
							<>
								<span className={s.dprice}>{"$" + item.discont_price}</span>
								<span className={s.price}>{"$" + item.price}</span>
							</>
						)}
					</div>
					{/* Скидочная наклейка */}
					{item.discont_price !== null && (
						<div className={s.salePercent}>
							{"-" +
								Math.round(
									((item.price - item.discont_price) / item.price) * 100
								) +
								"%"}
						</div>
					)}
				</div>
				<div  className={s.controls}>
					<div className={s.quantityBox}>
						<button onClick={handleDereaseQuantity}>-</button>
						<span className={s.quantity}>{quantity}</span>
						<button onClick={handleIncreaseQuantity}>+</button>
					</div>
					<button className={s.addToCart} onClick={handleAddToCard}>
						Add to cart
					</button>
				</div>
                <div className={s.description}>
                    <h4>Description</h4>
                    <p>{item.description}</p>
                </div>
			</div>
		</div>
	);
}

export default ProductPage;
