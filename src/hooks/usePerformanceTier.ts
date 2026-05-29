"use client";

import { useState, useEffect } from "react";

export function usePerformanceTier() {
  const [tier, setTier] = useState<1 | 2 | 3>(3);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return;
    }

    let calculatedTier: 1 | 2 | 3 = 3;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    // @ts-ignore
    const deviceMemory = navigator.deviceMemory || 4;
    // @ts-ignore
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection ? ['slow-2g', '2g'].includes(connection.effectiveType) || connection.saveData : false;

    if (prefersReducedMotion || hardwareConcurrency < 4 || deviceMemory < 4) {
      calculatedTier = 1;
    } else if (isSlowConnection || hardwareConcurrency < 8) {
      calculatedTier = 2;
    }

    setTier(calculatedTier);
    setIsLowEnd(calculatedTier === 1);
  }, []);

  return { tier, isLowEnd };
}
