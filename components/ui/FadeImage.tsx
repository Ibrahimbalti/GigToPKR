"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function FadeImage({ className, onLoad, alt, ...props }: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const image = ref.current;
    if (!image || image.complete) return;
    setPending(true);
    const markReady = () => setPending(false);
    image.addEventListener("load", markReady);
    return () => image.removeEventListener("load", markReady);
  }, []);

  return (
    <>
      {pending ? (
        <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      ) : null}
      <Image
        {...props}
        ref={ref}
        alt={alt}
        onLoad={(event) => {
          setPending(false);
          onLoad?.(event);
        }}
        className={cn(pending ? "opacity-0" : "opacity-100", "transition-opacity duration-300", className)}
      />
    </>
  );
}
