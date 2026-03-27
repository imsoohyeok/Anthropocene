"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DustParticlesProps } from "@/types/DustParticles";

const MAX_PARTICLES = 10000; // 메모리에 올려둘 최대 입자 수 고정

export default function DustParticles({
  hazardLevel,
  co2,
}: DustParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null); // GPU에 그릴 범위를 지시할 Ref

  // 지연 초기화 (Lazy Initialization)
  // useState에 함수를 넣으면 컴포넌트가 처음 나타날 때 딱 1번만 실행됩니다.
  // 이 방법은 렌더링 과정에서 순수성을 해치지 않으므로 Math.random()을 써도 에러가 나지 않습니다.
  const [positions] = useState(() => {
    const pos = new Float32Array(MAX_PARTICLES * 3);
    for (let i = 0; i < MAX_PARTICLES * 3; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  });

  // 현재 CO2에 맞춰 "보여줄" 입자의 개수만 계산합니다.
  const currentCount = useMemo(() => {
    const baseCount = 1000;
    const co2Multiplier = Math.max(0, co2 - 280) * 30;
    return Math.min(MAX_PARTICLES, Math.round(baseCount + co2Multiplier));
  }, [co2]);

  // React의 상태(State)가 아니라 외부 시스템(Three.js)에 직접 변경을 지시합니다.
  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setDrawRange(0, currentCount);
    }
  }, [currentCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const speed = 0.05 + hazardLevel * 0.2;
    pointsRef.current.position.y += speed * delta;

    if (pointsRef.current.position.y > 5) {
      pointsRef.current.position.y = -5;
    }

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.mouse.x * 0.5,
      0.1,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.mouse.y * 0.5,
      0.1,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={MAX_PARTICLES}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={new THREE.Color().setHSL(0.6 - hazardLevel * 0.6, 1, 0.5)}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6 + hazardLevel * 0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
