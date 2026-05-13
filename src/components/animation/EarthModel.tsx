"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Color } from "three";
import { useTexture } from "@react-three/drei";

export default function EarthModel({
  hazardLevel = 0,
}: {
  hazardLevel?: number;
}) {
  const earthRef = useRef<Mesh>(null!);
  const cloudRef = useRef<Mesh>(null!);

  const [colorMap, normalMap, cloudsMap] = useTexture([
    "/textures/earth_color.jpg",
    "/textures/earth_normal.jpg",
    "/textures/earth_clouds.png",
  ]);

  useFrame((state, delta) => {
    // 지면 자전
    earthRef.current.rotation.y += delta * 0.08;

    // 구름 자전 (지면보다 약간 더 빠르게 설정하여 입체감 부여)
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.11;
    }
  });

  const emissiveColor = new Color("#000000").lerp(
    new Color("#ff4d00"),
    hazardLevel > 0.5 ? (hazardLevel - 0.5) * 2 : 0,
  );

  return (
    <group>
      {/* 지구 본체 */}
      <mesh ref={earthRef} receiveShadow castShadow>
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

      {/* 구름 (지구보다 아주 살짝만 크게 설정) */}
      <mesh ref={cloudRef} scale={1.015}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.5}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
