import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./CategoriesPage.module.css";

function CategoryCard({ category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Переход на /categories/:id
    navigate(`/categories/${category.id}`);
  };

  return (
    <div className={s.categoryCard} onClick={handleClick}>
      {/* Верхняя часть: background-image */}
      <div
        className={s.categoryCardImg}
        style={{
          backgroundImage: `url(http://localhost:3333${category.image})`,
        }}
      />
      {/* Нижняя часть: текст */}
      <div className={s.categoryInfo}>
        <h3>{category.title}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
