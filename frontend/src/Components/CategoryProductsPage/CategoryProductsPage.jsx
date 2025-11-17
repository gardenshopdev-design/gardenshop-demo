// src/Components/CategoryProductsPage/CategoryProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./CategoryProductsPage.module.css";
import ProductCard from "../ProductCard/ProductCard";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3333"
    : "https://gardenshop-backend.onrender.com");

const CategoryProductsPage = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  const [sortType, setSortType] = useState("default");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [onlyDiscounts, setOnlyDiscounts] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/categories/${id}`)
      .then((res) => {
        if (res.data?.category && Array.isArray(res.data?.data)) {
          setCategory(res.data.category);
          setProducts(res.data.data);
        }
      })
      .catch((e) => console.error("API error:", e));
  }, [id]);

  const filtered = products
    .filter((p) => {
      if (onlyDiscounts && !p.oldPrice) return false;
      const min = priceFilter.min ? +priceFilter.min : 0;
      const max = priceFilter.max ? +priceFilter.max : Infinity;
      return p.price >= min && p.price <= max;
    })
    .sort((a, b) => {
      if (sortType === "price") return a.price - b.price;
      if (sortType === "discount") {
        const dA = (a.oldPrice ?? a.price) - a.price;
        const dB = (b.oldPrice ?? b.price) - b.price;
        return dB - dA;
      }
      return 0;
    });

  return (
    <div className={styles.container}>
      {category && <h2 className={styles.categoryTitle}>{category.title}</h2>}

      <div className={styles.filterBox}>
        <span>Price</span>
        <input
          type="number"
          placeholder="from"
          className={styles.priceInput}
          value={priceFilter.min}
          onChange={(e) =>
            setPriceFilter({ ...priceFilter, min: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="to"
          className={styles.priceInput}
          value={priceFilter.max}
          onChange={(e) =>
            setPriceFilter({ ...priceFilter, max: e.target.value })
          }
        />

        <label>
          Discounted items&nbsp;
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={onlyDiscounts}
            onChange={() => setOnlyDiscounts(!onlyDiscounts)}
          />
        </label>

        <span>Sorted&nbsp;</span>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="default">by default</option>
          <option value="price">by price</option>
          <option value="discount">by discount</option>
        </select>
      </div>

      <div className={styles.productsList}>
        {filtered.length ? (
          filtered.map((p) => (
            <ProductCard
              key={p.id}
              item={{
                id: p.id,
                image: p.image,
                title: p.title,
                price: p.oldPrice || p.price,
                discont_price: p.oldPrice ? p.price : null,
              }}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
