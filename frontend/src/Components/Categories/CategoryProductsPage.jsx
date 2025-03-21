import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./CategoriesPage.module.css";
import ProductCard from "../ProductCard/ProductCard";

const CategoryProductsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  // Фильтры, сортировки и т.д.
  const [sortType, setSortType] = useState("default");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:3333/categories/${id}`)
      .then((response) => {
        console.log("API ответ (CategoryProductsPage):", response.data);
        if (response.data?.category && Array.isArray(response.data?.data)) {
          setCategory(response.data.category);
          setProducts(response.data.data);
        } else {
          console.error("Некорректный формат:", response.data);
        }
      })
      .catch((error) => console.error("Ошибка:", error));
  }, [id]);

  // Пример фильтра по цене
  const filtered = products.filter((p) => {
    const min = priceFilter.min ? Number(priceFilter.min) : 0;
    const max = priceFilter.max ? Number(priceFilter.max) : Infinity;
    return p.price >= min && p.price <= max;
  });

  // Пример сортировки
  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "price") {
      return a.price - b.price;
    }
    if (sortType === "discount") {
      const discountA = (a.oldPrice ?? a.price) - a.price;
      const discountB = (b.oldPrice ?? b.price) - b.price;
      return discountB - discountA;
    }
    return 0;
  });

  return (
    <div className={styles.container}>
      {/* Шапка категории */}
      {category && (
        <div style={{ marginBottom: "20px" }}>
          <img
            src={`http://localhost:3333${category.image}`}
            alt={category.title}
            className={styles.categoryBanner}
          />
          <h2 className={styles.categoryTitle}>{category.title}</h2>
        </div>
      )}

      {/* Фильтр и сортировка */}
      <div className={styles.controls}>
        <div className={styles.filterSort}>
          <label>Price:</label>
          <input
            type="number"
            placeholder="From"
            value={priceFilter.min}
            onChange={(e) => setPriceFilter({ ...priceFilter, min: e.target.value })}
          />
          <input
            type="number"
            placeholder="To"
            value={priceFilter.max}
            onChange={(e) => setPriceFilter({ ...priceFilter, max: e.target.value })}
          />

          <label>Sort by:</label>
          <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="default">Default</option>
            <option value="price">Price</option>
            <option value="discount">Discount</option>
          </select>
        </div>
      </div>

      {/* Сетка товаров */}
      <div className={styles.productsList}>
        {sorted.length > 0 ? (
          sorted.map((product) => {
            // Передаём в ProductCard нужные поля
            const itemForCard = {
              id: product.id,
              image: product.image,
              title: product.title,
              price: product.oldPrice || product.price,
              discont_price: product.oldPrice ? product.price : null,
            };
            return <ProductCard key={product.id} item={itemForCard} />;
          })
        ) : (
          <p className={styles.noProducts}>No products found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
