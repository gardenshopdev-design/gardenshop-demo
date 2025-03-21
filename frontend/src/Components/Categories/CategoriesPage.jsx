// src/Components/Categories/CategoriesPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import styles from "./CategoriesPage.module.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/categories/all") 
      .then((response) => {
        console.log("ОТВЕТ API (CategoriesPage):", response.data);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Ошибка: Неверный формат:", response.data);
        }
      })
      .catch((error) => console.error("Ошибка загрузки категорий:", error));
  }, []);

  return (
    <div className={styles.container}>
      {/* Заголовок - смотрим макет: ширина 1360px, font-size 64px/700, line-height 70px */}
      <h2 className={styles.categoryTitle}>Categories</h2>

      {/* Список карточек */}
      <div className={styles.categoriesRow}>
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
