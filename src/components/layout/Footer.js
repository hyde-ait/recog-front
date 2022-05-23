import React from "react";
import Image from "next/image";
import styles from "/src/styles/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Powered by{" "}
      <span className={styles.logo}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </span>
    </footer>
  );
}
