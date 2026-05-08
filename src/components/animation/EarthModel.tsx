"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Color, BackSide } from "three";
import { useTexture, Text } from "@react-three/drei";

export default function EarthModel({
  hazardLevel = 0,
}: {
  hazardLevel?: number;
}) {
  const earthRef = useRef<Mesh>(null!);
  const cloudRef = useRef<Mesh>(null!);
  const atmosphereRef = useRef<Mesh>(null!);

  // ✨ 더 안정적인 Three.js 공식 예제 텍스트 경로로 변경 (CORS 문제 해결)
  const [colorMap, cloudsMap, normalMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
  ]);

  useFrame((state, delta) => {
    const { x, y } = state.pointer;
    earthRef.current.rotation.y += delta * 0.1;
    cloudRef.current.rotation.y += delta * 0.13;

    // 마우스 반응
    earthRef.current.rotation.x = y * 0.15;
    earthRef.current.rotation.z = -x * 0.05;
    cloudRef.current.rotation.x = y * 0.15;
    atmosphereRef.current.rotation.x = y * 0.15;
  });

  const emissiveColor = new Color("#000000").lerp(
    new Color("#ff4d00"),
    hazardLevel > 0.5 ? (hazardLevel - 0.5) * 2 : 0,
  );
  const atmosphereColor = new Color("#4299e1").lerp(
    new Color("#ff0000"),
    hazardLevel,
  );

  return (
    // 💡 절대 이 안에 <div> 같은 HTML 태그를 넣으면 안 됩니다!
    <group>
      {/* 1. 지구 */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughness={0.8}
          metalness={0.2}
          emissive={emissiveColor}
          emissiveIntensity={hazardLevel * 3}
        />
      </mesh>

      {/* 2. 구름 */}
      <mesh ref={cloudRef} scale={1.015}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* 3. 대기 */}
      <mesh ref={atmosphereRef} scale={1.15}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color={atmosphereColor}
          transparent={true}
          opacity={0.15 + hazardLevel * 0.2}
          side={BackSide}
        />
      </mesh>

      {/* 4. 텍스트 (font 속성 제거 - 기본 폰트 사용) */}
      <Text position={[0, 2.8, 0]} fontSize={0.15} color="white">
        {hazardLevel > 0.7 ? "CRITICAL STATUS" : "PLANET STATUS: STABLE"}
      </Text>
    </group>
  );
}
