import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Mariano F. Ricoy, Fullstack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [headingFont, bodyFont, photo] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/BebasNeue-Regular.ttf")),
    readFile(
      join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf"),
    ),
    readFile(join(process.cwd(), "public/mfr.jpg")),
  ]);

  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#e9e9e4",
          color: "#111218",
          padding: "64px 72px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 740,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Geist",
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(17, 18, 24, 0.62)",
              marginBottom: 20,
            }}
          >
            Mariano F. Ricoy
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Bebas Neue",
              fontSize: 128,
              lineHeight: 0.84,
              letterSpacing: -3,
            }}
          >
            <div style={{ display: "flex" }}>FULLSTACK</div>
            <div style={{ display: "flex" }}>DEVELOPER</div>
          </div>
        </div>
        <img
          src={photoSrc}
          alt=""
          width={268}
          height={268}
          style={{
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: 134,
            border: "1px solid rgba(17, 18, 24, 0.15)",
            flexShrink: 0,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Bebas Neue",
          data: headingFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "Geist",
          data: bodyFont,
          weight: 500,
          style: "normal",
        },
      ],
    },
  );
}
