import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// 프로젝트 톤(우주에서 바라본, 위기에 처한 지구)에 맞춘 파비콘
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          display: "flex",
          background:
            "radial-gradient(circle at 32% 28%, #67e8f9 0%, #0891b2 30%, #0a2233 62%, #000 100%)",
          border: "1.5px solid #ef4444",
        }}
      />
    </div>,
    size,
  );
}
