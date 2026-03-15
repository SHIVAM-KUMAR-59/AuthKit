import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2563EB",
          borderRadius: 8,
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2L4 7V16C4 22.627 9.373 28 16 28C22.627 28 28 22.627 28 16V7L16 2Z"
            fill="white"
            fillOpacity="0.2"
            stroke="white"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle
            cx="14"
            cy="14"
            r="3.5"
            stroke="white"
            strokeWidth="1.8"
            fill="none"
          />
          <path
            d="M17 14H22M20 14V16.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}