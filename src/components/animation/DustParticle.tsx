"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DustParticle({ count = 3000 }) {
  const pointsRef = useRef<THREE.Points>(null!);

  // 둥근 입자 텍스처 생성
  const circleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const [particles] = useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 25;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const brightness = 0.2 + Math.random() * 0.5;
      colors[i * 3] = brightness;
      colors[i * 3 + 1] = brightness;
      colors[i * 3 + 2] = brightness;
    }
    return { positions, colors };
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // 부유 효과 유지
    pointsRef.current.rotation.y = Math.sin(time * 0.05) * 0.03;
    pointsRef.current.rotation.x = Math.cos(time * 0.04) * 0.02;
    pointsRef.current.position.y = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef} position={[0, 0, -5]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        map={circleTexture}
        transparent={true}
        alphaTest={0.01}
        opacity={0.5}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
