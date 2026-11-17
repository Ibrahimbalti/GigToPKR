import type { Metadata } from "next";
import { ToolScreen, toolMetadata } from "@/components/tools/ToolScreen";

const path = "/calculator";

export const metadata: Metadata = toolMetadata(path);

export default function Page() {
  return (
    <ToolScreen
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Calculator", path },
      ]}
    />
  );
}
