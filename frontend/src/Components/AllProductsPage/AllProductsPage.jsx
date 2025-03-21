import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	filterByPrice,
	fetchProducts,
	sortByPriceAsc,
	sortByPriceDesc,
	sortByTitleAsc,
	sortByTitleDesc,
	filterDiscounted,
	resetSort,
} from "../../Slices/AllProductsSlice";
import ProductCard from "../ProductCard/ProductCard";
import CardHolder from "../CardHolder/CardHolder";
import s from "./AllProductsPage.module.css";

function AllProductsPage({ title = "", discounted = false }) {
	const dispatch = useDispatch();
	const [onlyDiscounted, setOnlyDiscounted] = useState(discounted);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(Infinity);
	const [sortBy, setSortBy] = useState("default");
	const { filteredProducts, loading, error } = useSelector(
		(state) => state.products
	);
	useEffect(() => {
		dispatch(fetchProducts()).then(() => {
			dispatch(resetSort());
			dispatch(filterByPrice({ minPrice, maxPrice }));
			if (onlyDiscounted) dispatch(filterDiscounted());
		}); // Загружаем товары при монтировании и фильтруем, если нужно

		return () => {
			// console.log("unmount", title);
			dispatch(resetSort()); // Очистка сортировки при размонтировании
		};
	}, [dispatch]);

	const handleSortChange = (e) => {
		let value = e.target.value;

		switch (value) {
			case "priceAsc":
				dispatch(sortByPriceAsc());
				break;
			case "priceDesc":
				dispatch(sortByPriceDesc());
				break;
			case "titleAsc":
				dispatch(sortByTitleAsc());
				break;
			case "titleDesc":
				dispatch(sortByTitleDesc());
				break;
			case "default":
				break;
			default:
				dispatch(resetSort());
		}
		setSortBy(value);
	};

	useEffect(() => {
		dispatch(resetSort());
		dispatch(filterByPrice({ minPrice, maxPrice }));
		//console.log(filteredProducts);

		if (onlyDiscounted) {
			dispatch(filterDiscounted());
			// console.log('filter disc', filteredProducts);
		}
		switch (sortBy) {
			case "priceAsc":
				dispatch(sortByPriceAsc());
				break;
			case "priceDesc":
				dispatch(sortByPriceDesc());
				break;
			case "titleAsc":
				dispatch(sortByTitleAsc());
				break;
			case "titleDesc":
				dispatch(sortByTitleDesc());
				break;
			case "default":
				break;

			default:
			// dispatch(resetSort());
		}
	}, [sortBy, dispatch, onlyDiscounted, minPrice, maxPrice]);

	// console.log(filteredProducts);

	if (loading) return <p>Загрузка товаров...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div>
			<h2 className={s.h2}>{title}</h2>
			<div className={s.filterBox}>
				<div className={s.price}>
					Price
					<label>
						<input
							className={s.priceInput}
							placeholder="from"
							type="number"
							value={minPrice === 0 ? "" : minPrice} // Если 0, то пустая строка
							onChange={(e) => {
								const value =
									e.target.value === "" ? 0 : Number(e.target.value);
								setMinPrice(value);
							}}
						/>
					</label>
					<label>
						<input
							className={s.priceInput}
							placeholder="to"
							type="number"
							value={maxPrice === Infinity ? "" : maxPrice}
							onChange={(e) => {
								const value =
									e.target.value === "" ? Infinity : Number(e.target.value);
								setMaxPrice(value);
							}}
						/>
					</label>
				</div>
				{!discounted && (
					<label>
						Discounted items
						<input
							type="checkbox"
							checked={onlyDiscounted}
							onChange={() => {
								setOnlyDiscounted((prev) => !prev);
							}}
						/>
					</label>
				)}

				<div>
					Sorted
					<select
						onChange={handleSortChange}
						defaultValue="default"
						className={s.sort}
					>
						<option value="default">by default</option>
						<option value="priceAsc">Price: low to high</option>
						<option value="priceDesc">Price: high to low</option>
						<option value="titleAsc">Name: A-z</option>
						<option value="titleDesc">Name: Z-a</option>
					</select>
				</div>
			</div>
			<CardHolder items={filteredProducts} Card={ProductCard} />
		</div>
	);
}

export default AllProductsPage;
