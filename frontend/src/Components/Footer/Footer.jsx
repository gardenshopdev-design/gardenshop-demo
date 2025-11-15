// src/Components/Footer/Footer.jsx
import React from "react";
import styles from "./Footer.module.css";
import Map from "./Map";
import { FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <h1 className={styles.contact}>Contact</h1>

        {/* */}
        <div className={styles.grid}>
          <div className={styles.info}>
            <p>Phone</p>
            <h2 className={styles.hFooter}>+49 999 999 99 99</h2>
          </div>

          <div className={styles.info}>
            <p>Socials</p>
            <div className={styles.socials}>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram size={30} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook size={30} />
              </a>
            </div>
          </div>

          <div className={styles.info}>
            <p>Address</p>
            <h2 className={styles.hFooter}>Garden Products GmbH, Berlin, Germany</h2>
          </div>

          <div className={styles.info}>
            <p>Working Hours</p>
            <h2 className={styles.hFooter}>24 hours a day</h2>
          </div>
        </div>

        {/* */}
        <div className={styles.map}>
          <Map />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
