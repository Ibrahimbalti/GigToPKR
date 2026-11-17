import Link from "next/link";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link>;

export function AppLink({ href, ...props }: LinkProps) {
  return <Link href={href} {...props} />;
}
