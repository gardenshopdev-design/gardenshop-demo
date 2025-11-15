// Components/Footer/Map.jsx
import React from "react";
import styles from "./Map.module.css";

function Map() {
  return (
    <div className={styles.maps}>
      <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.0431865562024!2d13.375945176913637!3d52.49784047206162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851cd7cc19a43%3A0x52e1b8ea5ae3f9f2!2sBerlin!5e0!3m2!1sen!2sde!4v1711469968973!5m2!1sen!2sde"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

export default Map;
