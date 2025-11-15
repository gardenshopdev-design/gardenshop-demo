import React from "react";
import { Link } from "react-router-dom";
import s from "./CategoriesPage.module.css";

function CategoryCard({ category }) {
  return (
    <div className={s.categoryItem}>
      {/* clickable "picture" */}
      <Link
        to={`/categories/${category.id}`}
        className={s.thumb}
        style={{
          backgroundImage: `url("http://localhost:3333${category.image}")`,
        }}
        aria-label={category.title}
      />
      {/* separate caption under the image */}
      <p className={s.categoryText}>{category.title}</p>
    </div>
  );
}

export default CategoryCard;
