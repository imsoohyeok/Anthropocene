import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background:
          "radial-gradient(circle at 78% 50%, #1a0505 0%, #050505 45%, #000 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#ef4444",
          }}
        />
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#ef4444",
          }}
        >
          Save Energy in Life
        </span>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 108,
          fontWeight: 900,
          letterSpacing: -3,
          color: "#fff",
        }}
      >
        SavEnergy
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 32,
          fontWeight: 400,
          color: "#a1a1aa",
        }}
      >
        우주에서 바라본 지구, 미니게임으로 배우는 에너지 절약
      </div>

      {/* 우측의 지구 그래픽 */}
      <div
        style={{
          position: "absolute",
          top: 95,
          right: 90,
          width: 300,
          height: 300,
          borderRadius: "50%",
          display: "flex",
          background:
            "radial-gradient(circle at 32% 28%, #67e8f9 0%, #0891b2 28%, #0a2233 58%, #000 100%)",
          border: "3px solid #ef4444",
        }}
      />
    </div>,
    size,
  );
}
