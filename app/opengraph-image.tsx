import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GigToPKR freelancer fee calculator for Pakistan";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F8FAFC",
          color: "#0F172A",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#2563EB", fontWeight: 700 }}>GigToPKR</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Calculate freelance earnings in Pakistan
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#64748B" }}>
          Fiverr and Upwork assumptions, Payoneer, USD to PKR, illustrative tax
        </div>
      </div>
    ),
    size,
  );
}
