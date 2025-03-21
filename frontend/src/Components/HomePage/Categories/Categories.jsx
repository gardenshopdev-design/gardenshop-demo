// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./Categories.module.css"; // Импортируем стили как объект
// import { Link } from "react-router-dom";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:3333/categories/all");
//         console.log('response.data', response.data);
//         setCategories(response.data); // Устанавливаем категории
//       } catch (err) {
//         setError("Error by loading categories");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={styles.categoriesContainer}>
//       <div className={styles.categoriesContent}>
//         <div className={styles.categoriesHeader}>
//           <h1 className={styles.categoriesTitle}>Categories</h1>
//           <div className={styles.separatorLine}></div> {/* Линия */}
//           <Link to="/allcategories" className={styles.allCategoriesButton}>All Categories</Link> {/* Кнопка "All Categories" */}
//         </div>
       
//         <div className={styles.categoriesImages}>
//           {categories.slice(0, 4).map((category) => ( // Отображаем только первые 4 категории
//             <div key={category.id} className={styles.categoriesItem}>
//               <Link to={`/categories/${category.id}`} className={styles.categoryLink}>
//                 <img
//                   className={styles.imgCategory}
//                   src={`http://localhost:3333/${category.image}`}
//                   alt={category.title}
//                 />
//                 <h3 className={styles.categoriesText}>{category.title}</h3>
            
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Categories.module.css"; // Импортируем стили как объект
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3333/categories/all");
        console.log('response.data', response.data);
        setCategories(response.data); // Устанавливаем категории
      } catch (err) {
        setError("Error by loading categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.categoriesContent}>
        <div className={styles.categoriesHeader}>
          <h1 className={styles.categoriesTitle}>Categories</h1>
          <div className={styles.separatorLine}></div> {/* Линия */}
          <Link to="/categories" className={styles.allCategoriesButton}>All Categories</Link> {/* Кнопка "All Categories" */}
        </div>
       
        <div className={styles.categoriesImages}>
          {categories.slice(0, 4).map((category) => ( // Отображаем только первые 4 категории
            <div key={category.id} className={styles.categoriesItem}>
              <Link to={`/categories/${category.id}`} className={styles.categoryLink}>
                <img
                  className={styles.imgCategory}
                  src={`http://localhost:3333/${category.image}`}
                  alt={category.title}
                />
                <h3 className={styles.categoriesText}>{category.title}</h3>
            
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;