import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e9e9e4",
          color: "#111218",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 0.4,
        }}
      >
        MR
      </div>
    ),
    {
      ...size,
    },
  );
}
