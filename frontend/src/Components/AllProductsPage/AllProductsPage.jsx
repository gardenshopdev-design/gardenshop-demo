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
  sortByDiscountDesc, // 🔥 нове
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

  const { filteredProducts, loading, error, products } = useSelector(
    (state) => state.products
  );

  // 1) завантаження товарів
  useEffect(() => {
    dispatch(fetchProducts());

    return () => {
      dispatch(resetSort());
    };
  }, [dispatch]);

  // 2) застосування фільтрів/сортування
  useEffect(() => {
    // якщо ще немає товарів – нічого не робимо
    if (!products || !products.length) return;

    // починаємо з повного списку
    dispatch(resetSort());

    // фільтр за ціною
    dispatch(filterByPrice({ minPrice, maxPrice }));

    // фільтр "тільки знижені"
    if (onlyDiscounted || discounted) {
      dispatch(filterDiscounted());
    }

    // сортування
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
      default:
        // 👉 на сторінці All sales "by default" = від найбільшої знижки
        if (discounted || onlyDiscounted) {
          dispatch(sortByDiscountDesc());
        }
        break;
    }
  }, [
    sortBy,
    onlyDiscounted,
    minPrice,
    maxPrice,
    discounted,
    products,
    dispatch,
  ]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    // додаткових dispatch тут не треба —
    // усе робить useEffect вище
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

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
              value={minPrice === 0 ? "" : minPrice}
              onChange={(e) => {
                const value = e.target.value === "" ? 0 : Number(e.target.value);
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
              onChange={() => setOnlyDiscounted((prev) => !prev)}
            />
          </label>
        )}

        <div>
          Sorted
          <select
            onChange={handleSortChange}
            value={sortBy}
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
