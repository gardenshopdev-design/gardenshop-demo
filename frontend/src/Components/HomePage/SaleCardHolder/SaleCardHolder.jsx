import React, { useEffect, useState } from "react";
import CardHolder from "../../CardHolder/CardHolder";
import ProductCard from "../../ProductCard/ProductCard";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

function SaleCardHolder() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/products/all`);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message || "An error has occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p>Loading image...</p>;
  if (error) return <p>Error: {error}</p>;

  const saleItems = items.filter((item) => item.discont_price !== null);

  const getRandomElements = (arr, count) => {
    return arr.sort(() => Math.random() - 0.5).slice(0, count);
  };

  return (
    <CardHolder
      title="Sale"
      Card={ProductCard}
      buttonTitle="All sales"
      items={getRandomElements(saleItems, 4)}
      nav="/sales"
    />
  );
}

export default SaleCardHolder;
