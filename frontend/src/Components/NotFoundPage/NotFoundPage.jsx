import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import notFound4 from "./notFound-4.png";
import notFoundCactus from "./notFound-cactus.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.errorBlock}>
        <img src={notFound4} alt="4" className={styles.four} />
        <img src={notFoundCactus} alt="Cactus" className={styles.cactus} />
        <img src={notFound4} alt="4" className={styles.four} />
      </div>
      <p className={styles.errorText}>Page Not Found</p>
      <p className={styles.errorDescription}>
        We're sorry, the page you requested could not be found.
        Please go back to the homepage.
      </p>
      <button className={styles.goHome} onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
