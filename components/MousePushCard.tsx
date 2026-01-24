"use client";

import { useEffect, useRef, useCallback, type MouseEvent as ReactMouseEvent } from "react";

interface MousePushCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  smoothing?: number;
  as?: "div" | "a";
  href?: string;
  onClick?: () => void;
}

/**
 * A card wrapper that applies a "mouse push" 3D tilt effect.
 * The card tilts as if being pressed by the mouse with a heavy, weighty feel.
 * Only activates on desktop (pointer: fine, min-width: 1024px).
 * Uses refs for zero re-renders.
 */
export default function MousePushCard({
  children,
  className = "",
  maxTilt = 8,
  smoothing = 0.05,
  as = "div",
  href,
  onClick,
}: MousePushCardProps) {
  const cardRef = useRef<HTMLDivElement | HTMLAnchorElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const isDesktopRef = useRef(false);
  const rafRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  const animate = useCallback(() => {
    const tx = isHoveringRef.current ? targetRef.current.x : 0;
    const ty = isHoveringRef.current ? targetRef.current.y : 0;

    currentRef.current.x += (tx - currentRef.current.x) * smoothing;
    currentRef.current.y += (ty - currentRef.current.y) * smoothing;

    const { x, y } = currentRef.current;

    if (cardRef.current) {
      const rotateX = y * -maxTilt;
      const rotateY = x * -maxTilt;
      const pushZ = Math.abs(x * y) * -5;

      cardRef.current.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${pushZ}px)`;
    }

    // Stop when at rest and not hovered
    const isAtRest = Math.abs(currentRef.current.x) < 0.002 && Math.abs(currentRef.current.y) < 0.002;
    if (!isHoveringRef.current && isAtRest) {
      if (cardRef.current) {
        cardRef.current.style.transform =
          "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      }
      isRunningRef.current = false;
      return;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [maxTilt, smoothing]);

  const startAnimation = useCallback(() => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  // Desktop detection + cleanup
  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    isDesktopRef.current = mediaQuery.matches;

    const handleMediaChange = (e: MediaQueryListEvent) => {
      isDesktopRef.current = e.matches;
      if (!e.matches && cardRef.current) {
        isHoveringRef.current = false;
        targetRef.current = { x: 0, y: 0 };
        startAnimation();
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    if (cardRef.current) {
      cardRef.current.style.willChange = "transform";
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      cancelAnimationFrame(rafRef.current);
    };
  }, [startAnimation]);

  // React event handlers - guaranteed to work regardless of ref timing
  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    if (!isDesktopRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    targetRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
    startAnimation();
  }, [startAnimation]);

  const handleMouseEnter = useCallback(() => {
    if (!isDesktopRef.current) return;
    isHoveringRef.current = true;
    startAnimation();
  }, [startAnimation]);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    targetRef.current = { x: 0, y: 0 };
    startAnimation();
  }, [startAnimation]);

  if (as === "a") {
    return (
      <a
        ref={cardRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
