import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
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
          background: "#001E42",
          borderRadius: 14,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
          <path
            d="M9 12 L24 26 L39 12"
            stroke="#F4F7FB"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M24 26 L24 40"
            stroke="#FC6500"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
