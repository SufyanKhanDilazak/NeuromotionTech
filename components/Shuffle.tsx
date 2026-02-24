"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface ShuffleProps {
  text: string;
  className?: string;
  shuffleDirection?: "left" | "right";
  duration?: number;
  animationMode?: "evenodd" | "sequential";
  shuffleTimes?: number;
  ease?: string;
  stagger?: number;
  threshold?: number;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  loop?: boolean;
  loopDelay?: number;
}

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  className = "",
  shuffleDirection = "right",
  duration = 0.35,
  shuffleTimes = 1,
  stagger = 0.03,
  threshold = 0.1,
  triggerOnce = true,
  respectReducedMotion = true,
  loop = false,
  loopDelay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, amount: threshold });
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  useEffect(() => {
    // Check for reduced motion preference
    if (respectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    if (!isInView) {
      if (!hasAnimated) {
        setDisplayText(text.split("").map(() => " ").join(""));
      }
      return;
    }

    if (triggerOnce && hasAnimated) {
      return;
    }

    const animate = () => {
      let iteration = 0;
      const maxIterations = text.length * shuffleTimes;
      
      const interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((char, index) => {
              const charDelay = shuffleDirection === "right" ? index : text.length - 1 - index;
              const iterationThreshold = charDelay * shuffleTimes;

              if (iteration > iterationThreshold) {
                return text[index];
              }

              if (char === " ") {
                return " ";
              }

              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        iteration += 1;

        if (iteration > maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setHasAnimated(true);

          if (loop && loopDelay > 0) {
            setTimeout(() => {
              setHasAnimated(false);
            }, loopDelay * 1000);
          }
        }
      }, (duration * 1000) / maxIterations);

      return () => clearInterval(interval);
    };

    const timeout = setTimeout(animate, 100);
    return () => clearTimeout(timeout);
  }, [
    isInView,
    text,
    shuffleDirection,
    duration,
    shuffleTimes,
    hasAnimated,
    triggerOnce,
    respectReducedMotion,
    loop,
    loopDelay,
    chars,
  ]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {displayText}
    </div>
  );
};

export default Shuffle;