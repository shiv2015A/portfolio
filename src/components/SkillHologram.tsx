import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function HolographicTorus() {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      torusRef.current.rotation.y = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <Torus ref={torusRef} args={[1.5, 0.4, 16, 100]}>
      <MeshDistortMaterial
        color="#06b6d4"
        attach="material"
        distort={0.3}
        speed={1.5}
        wireframe
        transparent
        opacity={0.5}
      />
    </Torus>
  );
}

export function SkillHologram() {
  return (
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <HolographicTorus />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
