"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';

interface Model3DProps {
  modelPath: string;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scale: number;
}

// Component that loads and renders the 3D model
function Model3D({ modelPath, mouseRef, scale }: Model3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  // Animate based on mouse position using unprojection
  useFrame(({ camera, clock }) => {
    if (meshRef.current) {
      // Source - https://stackoverflow.com/a
      // Posted by uhura, modified by community. See post 'Timeline' for change history
      // Retrieved 2026-01-10, License - CC BY-SA 3.0
      const { x, y } = mouseRef.current;
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Calculate rotation based on unprojected position
      const targetRotationY = THREE.MathUtils.clamp(pos.x * 0.3, -0.3, 0.3);
      const targetRotationX = THREE.MathUtils.clamp(-pos.y * 0.3, -0.3, 0.3);
      
      // Smooth rotation based on mouse position
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.08
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.08
      );
      
      // Optional: Add subtle floating animation
      meshRef.current.position.y = Math.sin(clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Center>
      <primitive 
        ref={meshRef} 
        object={scene.clone()} 
        scale={scale}
      />
    </Center>
  );
}

interface Logo3DProps {
  modelPath: string;
  width?: number;
  height?: number;
  modelScale?: number;  // Scale of the 3D model itself
  isHovered?: boolean;  // Whether the parent card is being hovered
  mouseRef?: React.MutableRefObject<{ x: number; y: number }>; // Mouse coords from parent card
}

export default function Logo3D({ 
  modelPath, 
  width = 150, 
  height = 100,
  modelScale = 1.5,
  isHovered = false,
  mouseRef: providedMouseRef
}: Logo3DProps) {
  const internalMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseRef = providedMouseRef ?? internalMouseRef;
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(isHovered);
  const rafRef = useRef<number | undefined>(undefined);

  // Update ref when hover state changes
  useEffect(() => {
    isHoveredRef.current = isHovered;
    if (!isHovered) {
      mouseRef.current = { x: 0, y: 0 };
    }
  }, [isHovered]);


  return (
    <div 
      ref={containerRef}
      style={{ width, height }}
      className="relative mt-2"
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="flex items-center justify-center w-full h-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <spotLight position={[0, 10, 10]} angle={0.45} penumbra={1} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={1.2} />
          <pointLight position={[10, 10, 10]} intensity={4} color="#4D2FB2" />
          
          <Model3D modelPath={modelPath} mouseRef={mouseRef} scale={modelScale} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload models for better performance
useGLTF.preload('/models/sega_logo.glb');
