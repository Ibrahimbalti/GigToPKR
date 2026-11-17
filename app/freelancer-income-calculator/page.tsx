import type { Metadata } from "next";
import { ToolScreen, toolMetadata } from "@/components/tools/ToolScreen";

const path = "/freelancer-income-calculator";

export const metadata: Metadata = toolMetadata(path);

export default function Page() {
  return (
    <ToolScreen
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Income calculator", path },
      ]}
    />
  );
}
