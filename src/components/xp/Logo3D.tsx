"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Environment } from '@react-three/drei';
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

  // Enable reflections on all meshes in the model
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          // Enable environment mapping for reflections
          material.envMapIntensity = 1.5;
          material.metalness = 0.8;
          material.roughness = 0.2;
          material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

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
  dpr?: [number, number]; // Device pixel ratio [min, max] for resolution quality
  hdrPath?: string; // Path to HDR environment file
  isHovered?: boolean;  // Whether the parent card is being hovered
  mouseRef?: React.MutableRefObject<{ x: number; y: number }>; // Mouse coords from parent card
}

export default function Logo3D({ 
  modelPath, 
  width = 150, 
  height = 100,
  modelScale = 1.5,
  dpr = [1, 2],
  hdrPath = "/liquid_bg_asml.hdr",
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
        dpr={dpr}
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="flex items-center justify-center w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Environment preset or custom HDR for realistic lighting and reflections */}
          <Environment 
            preset={hdrPath.startsWith('/') ? undefined : hdrPath as any}
            files={hdrPath.startsWith('/') ? hdrPath : undefined}
            background={false} 
          />
          
          {/* Bright lighting */}
          <ambientLight intensity={0.3} />
          <spotLight position={[0, 10, 10]} angle={0.7} penumbra={0.5} intensity={50} castShadow />
          <pointLight position={[0, 10, 10]} intensity={12} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={8} />
          
          <Model3D modelPath={modelPath} mouseRef={mouseRef} scale={modelScale} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload models for better performance
useGLTF.preload('/models/asml_3d_logo_3-v2.glb');
useGLTF.preload('/models/shu_4.glb');
useGLTF.preload('/models/sikorsky.glb');
