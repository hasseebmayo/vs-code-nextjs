"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./texMain.scss";

import { AnimatePresence } from "framer-motion";
import ShortCuts from "../ShortCuts/ShortCuts";
import { useRouter } from "next/navigation";
import useOutsideClick from "@/hooks/useOutsideClick/useOutsideClick";

const TextMain = () => {
  const heading = useMemo(() => ["Coffee", "Think", "Create"], []);
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick(ref, () => {
    console.log("clicked ouside!");
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % heading.length);
    }, 3000); // Change slides every 5 seconds

    // Clean up the interval on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearInterval(interval);
  }, []); // Empty dependency array, and rule disabled for this line

  return (
    <>
      <AnimatePresence>
        {showModal ? (
          <ShortCuts
            onClick={() => {
              setShowModal(false);
            }}
            ref={ref}
          />
        ) : null}
      </AnimatePresence>
      <div className="text-hero-main">
        <div className="text-hero">
          <span className="plus-one plus-icon">+</span>
          <span className="plus-two plus-icon">+</span>
          <span className="plus-three plus-icon">+</span>
          <span className="plus-four plus-icon">+</span>
          {heading.map((h, i) => (
            <h1
              key={h}
              className={
                i === currentIndex ? `active-heading-${currentIndex}` : ""
              }
            >
              {h}
            </h1>
          ))}
        </div>
        <div className="text-hero-btn">
          <button
            onClick={() => {
              setShowModal((PREV) => !PREV);
            }}
          >
            View Shortcuts
          </button>
          <button
            onClick={() => {
              router.push("/code");
            }}
          >
            Go to Code
          </button>
        </div>
      </div>
    </>
  );
};

export default TextMain;
