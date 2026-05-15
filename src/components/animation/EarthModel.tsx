"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const BLACK = new THREE.Color("#000000");
const DANGER_RED = new THREE.Color("#ff4d00");

export default function EarthModel({
  hazardLevel = 0,
}: {
  hazardLevel?: number;
}) {
  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudRef = useRef<THREE.Mesh>(null!);

  const [colorMap, normalMap, cloudsMap] = useTexture([
    "/textures/earth_color.webp",
    "/textures/earth_normal.webp",
    "/textures/earth_clouds.webp",
  ]);

  const emissiveColor = useMemo(() => {
    return BLACK.clone().lerp(
      DANGER_RED,
      hazardLevel > 0.5 ? (hazardLevel - 0.5) * 2 : 0,
    );
  }, [hazardLevel]);

  useFrame((state, delta) => {
    // 지면 자전
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.08;
    }

    // 구름 자전
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.11;
    }
  });

  return (
    <group>
      {/* 지구 본체 */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughness={0.8}
          metalness={0.2}
          emissive={emissiveColor}
          emissiveIntensity={hazardLevel * 3}
        />
      </mesh>

      {/* 구름 */}
      <mesh ref={cloudRef} scale={1.015}>
        <sphereGeometry args={[2, 32, 32]} />
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
