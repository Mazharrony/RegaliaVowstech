import { ImageResponse } from "next/og";
import { MONOGRAM_CREAM } from "./og/monogram";

// Apple touch icons must be raster, so this is generated rather than shipped
// as a file. The mark itself is real Playfair outlines embedded as a data URI
// — see ./og/monogram.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #ff8a2a 0%, #e13d05 45%, #2a0803 100%)",
        }}
      >
        {/* iOS applies its own mask, so the mark is inset to stay clear of it */}
        <img src={MONOGRAM_CREAM} width={116} height={81} alt="" />
      </div>
    ),
    size,
  );
}
