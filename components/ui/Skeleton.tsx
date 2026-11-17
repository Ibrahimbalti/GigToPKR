import { cn } from "@/lib/utils";

const shapes = {
  text: "",
  rect: "",
  circle: "!rounded-full",
} as const;

export function Skeleton({
  className,
  variant = "rect",
}: {
  className?: string;
  variant?: "text" | "rect" | "circle";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block animate-pulse bg-gray-200 dark:bg-gray-700 rounded",
        shapes[variant],
        className,
      )}
    />
  );
}
