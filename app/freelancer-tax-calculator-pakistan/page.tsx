import type { Metadata } from "next";
import { ToolScreen, toolMetadata } from "@/components/tools/ToolScreen";

const path = "/freelancer-tax-calculator-pakistan";

export const metadata: Metadata = toolMetadata(path);

export default function Page() {
  return (
    <ToolScreen
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Tax calculator", path },
      ]}
    />
  );
}
