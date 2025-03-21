// Footer.js
import React from "react";
import styles from "./Footer.module.css"; 
import Map from "./Map"; 
import { FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <h1 className={styles.contact}>Contact</h1>
        <div className={styles.container}>
          <div className={styles.info}>
            <p>Phone</p>
            <h2>+49 999 999 99 99</h2>
          </div>
          <div className={styles.info}>
            <p>Socials</p>
            <div className={styles.socials}>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} /> 
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={30} />
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <p>Address</p>
            <h2>Linkstraße 2, 8 OG, 10785, Berlin, Deutschland</h2>
          </div>
          <div className={styles.info}>
            <p>Working Hours</p>
            <h2>24 hours a day</h2>
          </div>
        </div>
        <div className={styles.mapContainer}>
          <Map />
        </div>
      </div>
    </div>
  );
}

export default Footer;