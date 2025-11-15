import React from "react";
import s from "./ProductCard.module.css";
import { addToCart } from "../../Slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductCard({ item: product }) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goToProductPage = () => {
    navigate(`/products/${product.id}`);
  };

  if (!product || typeof product !== "object") {
    return <p>Product loading error</p>;
  }

  const handleAddToCard = () => {
    dispatch(addToCart(product));
    console.log("Added to cart:", product);
  };

  return (
    <div className={s.container}>
      {/* */}
      <div
        style={{
          backgroundImage: `url(http://localhost:3333${product.image})`,
          position: "relative",
        }}
        className={s.productImg}
      >
        {/* */}
        {product.discont_price !== null && (
          <div className={s.salePercent}>
            {"-" +
              Math.round(
                ((product.price - product.discont_price) / product.price) * 100
              ) +
              "%"}
          </div>
        )}
        <button className={s.addToCart} onClick={handleAddToCard}>
          Add to cart
        </button>
      </div>

      {/* */}
      <div className={s.productInfo}>
        <h4
          onClick={goToProductPage}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "1.25rem",
            fontWeight: "500",
            color: "var(--text)",
            marginBottom: "1rem",
          }}
        >
          {product.title}
        </h4>

        {/* */}
        <div>
          {product.discont_price === null ? (
            <span className={s.dprice}>{"$" + product.price}</span>
          ) : (
            <>
              <span className={s.dprice}>{"$" + product.discont_price}</span>
              <span className={s.price}>{"$" + product.price}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
