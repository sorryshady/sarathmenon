import React from "react";
import styles from "./carousel.module.css";
import Image from "next/image";
import { imagesData1, imagesData2 } from "./data";

const Carousel = () => {
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.slider}>
        <div className={styles.slidetrackone}>
          {imagesData1.map((image, index) => (
            <div key={index} className={styles.slide}>
              <Image
                priority
                src={image}
                alt={`Image ${image}`}
                placeholder="blur"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.slider}>
        <div className={styles.slidetracktwo}>
          {imagesData2.map((image, index) => (
            <div key={index + 12} className={styles.slide}>
              <Image
                src={image}
                alt={`Image ${image}`}
                placeholder="blur"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
