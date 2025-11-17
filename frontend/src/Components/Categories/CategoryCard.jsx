import React from "react";
import { Link } from "react-router-dom";
import s from "./CategoriesPage.module.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3333"
    : "https://gardenshop-backend.onrender.com");

function CategoryCard({ category }) {
  return (
    <div className={s.categoryItem}>
      <Link
        to={`/categories/${category.id}`}
        className={s.thumb}
        style={{
          backgroundImage: `url(${API_URL}${category.image})`,
        }}
        aria-label={category.title}
      />
      <p className={s.categoryText}>{category.title}</p>
    </div>
  );
}

export default CategoryCard;
