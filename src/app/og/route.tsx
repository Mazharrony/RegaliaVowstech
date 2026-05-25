import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title") ??
    "Regalia Vows Tech — Brand, Technology & Experiences";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background:
            "linear-gradient(135deg,#0a0a0a 0%,#1a1408 55%,#2a1f10 100%)",
          color: "#f5f1e8",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#b8893a",
          }}
        >
          <div style={{ width: 48, height: 1, background: "#b8893a" }} />
          Regalia Vows Tech
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.05,
            fontWeight: 600,
            maxWidth: 980,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#a09486",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>Dubai · United Arab Emirates</span>
          <span>regaliavowstech.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
