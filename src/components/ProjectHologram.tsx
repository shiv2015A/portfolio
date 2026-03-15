import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function HolographicBox() {
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (boxRef.current) {
      boxRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      boxRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Box ref={boxRef} args={[2, 2, 2]}>
      <MeshDistortMaterial
        color="#06b6d4"
        attach="material"
        distort={0.2}
        speed={1}
        wireframe
        transparent
        opacity={0.6}
      />
    </Box>
  );
}

export function ProjectHologram() {
  return (
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <HolographicBox />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
