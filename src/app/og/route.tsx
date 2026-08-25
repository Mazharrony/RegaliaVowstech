import { ImageResponse } from "next/og";
import { MONOGRAM_CREAM } from "./monogram";
import { playfairData } from "./playfair";

export const runtime = "edge";

/**
 * Ramp values are duplicated as literals here on purpose: this route runs on
 * the edge and renders outside the document, so it cannot read the CSS custom
 * properties in globals.css. Keep these in sync with the @theme block.
 */
const RAMP = {
  bloom: "#ffc46b",
  amber: "#ff8a2a",
  vermilion: "#e13d05",
  crimson: "#c0210a",
  maroon: "#6b1403",
  ground: "#160401",
  cream: "#fff4e2",
} as const;

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
          padding: "76px 92px",
          background: `linear-gradient(168deg, ${RAMP.vermilion} 0%, ${RAMP.crimson} 38%, ${RAMP.maroon} 66%, ${RAMP.ground} 100%)`,
          color: RAMP.cream,
          // Playfair is the only face embedded below, so it is the only one
          // satori can shape with. Declared explicitly rather than left as an
          // Inter reference that silently falls back.
          fontFamily: "Playfair Display, serif",
          position: "relative",
        }}
      >
        {/* Warm bloom, upper right — the reference's light source */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -140,
            width: 760,
            height: 520,
            display: "flex",
            background: `radial-gradient(closest-side, ${RAMP.bloom} 0%, ${RAMP.amber} 40%, rgba(255,138,42,0) 76%)`,
            opacity: 0.62,
          }}
        />

        {/* Oversized monogram watermark, bled off the right edge */}
        <div
          style={{
            position: "absolute",
            right: -110,
            bottom: -150,
            width: 760,
            height: 528,
            display: "flex",
            opacity: 0.14,
          }}
        >
          <img src={MONOGRAM_CREAM} width={760} height={528} alt="" />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: RAMP.cream,
            opacity: 0.9,
          }}
        >
          <div style={{ width: 52, height: 1, background: RAMP.cream }} />
          Regalia Vows Tech
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            lineHeight: 1.1,
            fontWeight: 500,
            maxWidth: 880,
            letterSpacing: -0.5,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: RAMP.cream,
            opacity: 0.72,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>Dubai · United Arab Emirates</span>
          <span>regaliavowstech.com</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Playfair Display",
          data: playfairData(),
          weight: 500,
          style: "normal",
        },
      ],
    },
  );
}
