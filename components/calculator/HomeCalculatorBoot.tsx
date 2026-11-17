"use client";

import { useEffect } from "react";

export function HomeCalculatorBoot() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-home-calc]");
    if (!root) return;

    const onSubmit = (event: Event) => event.preventDefault();
    const load = () => {
      if (root.getAttribute("data-booted") === "1") return;
      root.setAttribute("data-booted", "1");
      const script = document.createElement("script");
      script.src = "/home-calculator.js";
      script.async = true;
      document.body.appendChild(script);
    };

    root.addEventListener("submit", onSubmit);
    root.addEventListener("pointerdown", load, { capture: true, once: true });
    root.addEventListener("focusin", load, { once: true });
    root.addEventListener("pointerover", load, { once: true });

    return () => {
      root.removeEventListener("submit", onSubmit);
      root.removeEventListener("pointerdown", load, true);
      root.removeEventListener("focusin", load);
      root.removeEventListener("pointerover", load);
    };
  }, []);

  return null;
}
