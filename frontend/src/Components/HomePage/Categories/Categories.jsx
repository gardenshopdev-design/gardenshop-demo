import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/categories/all`)
      .then(({ data }) => setCategories(data.slice(0, 4)))
      .catch(() => console.error("Error loading categories"));
  }, []);

  return (
    <section className={styles.categoriesContainer}>
      <header className={styles.categoriesHeader}>
        <h1 className={styles.categoriesTitle}>Categories</h1>
        <div className={styles.separatorLine} />
        <Link to="/categories" className={styles.allCategoriesButton}>
          All&nbsp;Categories
        </Link>
      </header>

      <ul className={styles.categoriesImages}>
        {categories.map((cat) => (
          <li key={cat.id} className={styles.categoriesItem}>
            <Link to={`/categories/${cat.id}`} className={styles.categoryLink}>
              <img
                className={styles.imgCategory}
                src={`${API_URL}/${cat.image}`}
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
