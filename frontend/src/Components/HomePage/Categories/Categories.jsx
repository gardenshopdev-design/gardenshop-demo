import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/categories/all")
      .then(({ data }) => setCategories(data.slice(0, 4)))   // 🆕
      .catch(() => console.error("Error loading categories"));
  }, []);

  return (
    <section className={styles.categoriesContainer}>
      {/* ───────── title ───────── */}
      <header className={styles.categoriesHeader}>
        <h1 className={styles.categoriesTitle}>Categories</h1>
        <div className={styles.separatorLine} />
        <Link to="/categories" className={styles.allCategoriesButton}>
          All&nbsp;Categories
        </Link>
      </header>

      {/* ───────── 4 pictures ───────── */}
      <ul className={styles.categoriesImages}>
        {categories.map(cat => (
          <li key={cat.id} className={styles.categoriesItem}>
            <Link to={`/categories/${cat.id}`} className={styles.categoryLink}>
              <img
                className={styles.imgCategory}
                src={`http://localhost:3333/${cat.image}`}
                alt={cat.title}
              />
              <span className={styles.categoriesText}>{cat.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
