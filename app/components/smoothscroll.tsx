"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(0);

  const resizePageHeight = useCallback((entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      setPageHeight(entry.contentRect.height);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const resizeObserver = new ResizeObserver((entries) =>
        resizePageHeight(entries)
      );
      if (scrollRef.current) {
        resizeObserver.observe(scrollRef.current);
      }
      return () => resizeObserver.disconnect();
    }
  }, [scrollRef, resizePageHeight]);

  const { scrollY } = useScroll();
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <div style={{ height: pageHeight, width: "100%" }} />
      <motion.div
        ref={scrollRef}
        style={{ y: spring }}
        className="fixed top-0 left-0 w-full flex flex-col min-h-screen will-change-transform"
      >
        {children}
      </motion.div>
    </>
  );
};

export default SmoothScroll;