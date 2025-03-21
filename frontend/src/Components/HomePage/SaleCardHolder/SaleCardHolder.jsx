import React, { useEffect, useState } from "react";
import CardHolder from "../../CardHolder/CardHolder";
import ProductCard from "../../ProductCard/ProductCard";

function SaleCardHolder() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchItems = async () => {
			try {
				setLoading(true);
				setError("");

				// Запрос на сервер
				const response = await fetch(`http://localhost:3333/products/all`);
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}

				const data = await response.json();
				setItems(data);
			} catch (err) {
				setError(err.message || "Произошла ошибка");
			} finally {
				setLoading(false);
			}
		};

		fetchItems();
	}, []);

	if (loading) return <p>Загрузка изображения...</p>;
	if (error) return <p>Ошибка: {error}</p>;
	// console.log(items);

	const saleItems = items.filter((item) => item.discont_price !== null);

	const getRandomElements = (arr, count) => {
		return arr.sort(() => Math.random() - 0.5).slice(0, count);
	};

	return (
		<CardHolder
			title="Sale"
			Card={ProductCard}
			buttonTitle="All sales"
			items={getRandomElements(saleItems, 4)}
			nav="/sales"
		/>
	);
}

export default SaleCardHolder;
