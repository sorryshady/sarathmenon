"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./Parallax.module.css";
import { images } from "./Gallery";
import Image from "next/image";
import { useTransform, useScroll, motion } from "framer-motion";
import { useWindowSize } from "rooks";

const Parallax = () => {
  const { innerHeight: height, innerWidth: width } = useWindowSize();
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Create two separate useTransform hooks
  const ySmallScreen = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * -0.1]
  );
  const y2SmallScreen = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * 0.15]
  );

  const yLargeScreen = useTransform(scrollYProgress, [0, 1], [0, height * 1.5]);
  const y2LargeScreen = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * 1.25]
  );

  const [y, setY] = useState(0);
  const [y2, setY2] = useState(0);

  useEffect(() => {
    // Set different values based on screen width
    if (width <= 1024) {
      setY(ySmallScreen);
      setY2(y2SmallScreen);
    } else {
      setY(yLargeScreen);
      setY2(y2LargeScreen);
    }
  }, [
    scrollYProgress,
    height,
    width,
    ySmallScreen,
    y2SmallScreen,
    yLargeScreen,
    y2LargeScreen,
  ]);
  return (
    <>
      <section ref={container} className={styles.gallery}>
        <Column images={[images[5], images[8], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[0]]} y={y2} />
        <Column images={[images[10], images[7], images[1]]} y={y} />
        <Column images={[images[9], images[6], images[11]]} y={y2} />
      </section>
    </>
  );
};

const Column = ({ images, y = 0 }) => {
  return (
    <motion.div style={{ y }} className={styles.column}>
      {images.map((src, index) => {
        return (
          <div key={index} className={styles.imageContainer}>
            <Image
              src={src}
              fill
              alt="image"
              // priority
              sizes="(100vw, 100vh)"
              quality={100}
              placeholder="blur"
            />
          </div>
        );
      })}
    </motion.div>
  );
};

export default Parallax;
