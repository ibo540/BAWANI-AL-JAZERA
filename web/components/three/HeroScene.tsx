'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type { Mesh } from 'three';

function BuildingBlock({ position }: { position: [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });
  return (
    <mesh ref={ref} position={position} castShadow receiveShadow>
      <boxGeometry args={[1.2, 1.8, 0.8]} />
      <meshStandardMaterial color="#00bbbe" metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function CentralTower() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1.5, 2.5, 1.5]} />
      <meshStandardMaterial color="#00bbbe" metalness={0.5} roughness={0.3} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <pointLight position={[-3, 2, 2]} color="#00bbbe" intensity={0.8} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 0, -2]}>
          <CentralTower />
          <BuildingBlock position={[-2, 0.2, 0]} />
          <BuildingBlock position={[2.2, -0.1, 0.3]} />
          <BuildingBlock position={[0.5, -1.5, -1]} />
          <BuildingBlock position={[-1.2, 0.8, -1.2]} />
        </group>
      </Float>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  );
}
