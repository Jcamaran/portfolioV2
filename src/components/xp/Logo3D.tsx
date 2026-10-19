"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Environment } from '@react-three/drei';
import { useRef, useEffect, Suspense, useMemo } from 'react';
import * as THREE from 'three';

interface Model3DProps {
  modelPath: string;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scale: number;
  useHDR: boolean;
  baseColor?: string;
  perMeshColors?: Record<string, string>;
  addCenterLight?: boolean;
  centerLightIntensity?: number;
  centerLightColor?: string | number;
  centerLightOffset?: [number, number, number];
}

// Component that loads and renders the 3D model
function Model3D({ modelPath, mouseRef, scale, useHDR, baseColor, perMeshColors, addCenterLight, centerLightIntensity = 1.6, centerLightColor = 0xffffff, centerLightOffset = [0, 0, 8] }: Model3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath, true); // Enable Draco compression

  // Clone scene once and cache it using useMemo to avoid re-cloning
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          // Tune material for HDR vs direct lights
          if (useHDR) {
            material.envMapIntensity = 1.5;
            material.metalness = 0.9;
            material.roughness = 0.2;
          } else {
            // Make materials read as more metallic under direct lights
            material.envMapIntensity = 0;
            material.metalness = 0.9;
            material.roughness = 0.25;
          }

          // Optional color overrides
          const name = mesh.name || '';
          const overrideColor = perMeshColors?.[name] || baseColor;
          if (overrideColor){
            material.color = new THREE.Color(overrideColor);
          }
          material.needsUpdate = true;
        }
      }
    });
    return cloned;
  }, [scene, useHDR, baseColor, perMeshColors]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clonedScene?.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(material => material.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
    };
  }, [clonedScene]);

  // Animate based on mouse position using unprojection
  useFrame(({ camera, clock }) => {
    if (meshRef.current) {
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
      {/* Centered light to highlight the metallic logo from its origin */}
      {!useHDR && addCenterLight && (
        <pointLight position={centerLightOffset} intensity={centerLightIntensity} color={centerLightColor} />
      )}
      <primitive 
        ref={meshRef} 
        object={clonedScene} 
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
  mouseRef?: React.RefObject<{ x: number; y: number }>; // Mouse coords from parent card
  useHDR?: boolean; // Enable/disable HDR environment
  baseColor?: string; // Simple color applied to all meshes if provided
  perMeshColors?: Record<string, string>; // Optional per-mesh color overrides by mesh name
  skyColor?: string; // Optional sky color for the environment
  centerLight?: boolean; // Place a point light at model center when not using HDR
  centerLightIntensity?: number;
  centerLightColor?: string | number;
  centerLightOffset?: [number, number, number];
}

export default function Logo3D({ 
  modelPath, 
  width = 300, 
  height = 90,
  modelScale = 1.5,
  dpr = [1, 2],
  hdrPath = "/liquid_bg_asml.hdr",
  isHovered = false,
  mouseRef: providedMouseRef,
  useHDR = false,
  baseColor,
  perMeshColors,
  skyColor,
  centerLight = true,
  centerLightIntensity = 1.6,
  centerLightColor = 0xffffff,
  centerLightOffset = [0, 0, 2]
}: Logo3DProps) {
  const internalMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseRef = providedMouseRef ?? internalMouseRef;
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(isHovered);

  // Update ref when hover state changes
  useEffect(() => {
    isHoveredRef.current = isHovered;
    if (!isHovered) {
      mouseRef.current = { x: 0, y: 0 };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered]);


  return (
    <div 
      ref={containerRef}
      style={{ width, height }}
      className="relative mt-2"
    >
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance'
        }}
        dpr={dpr}
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="flex items-center justify-center w-full h-full"
        onCreated={({ gl }) => {
          // Handle WebGL context loss
          const canvas = gl.domElement;
          canvas.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            console.warn('WebGL context lost in Logo3D');
          });
          
          canvas.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored in Logo3D');
          });
        }}
      >
        <Suspense fallback={null}>
          {/* Environment preset or custom HDR for realistic lighting and reflections */}
          {useHDR && (
            <Environment 
              preset={hdrPath.startsWith('/') ? undefined : (hdrPath as 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby')}
              files={hdrPath.startsWith('/') ? hdrPath : undefined}
              background={false} 
            />
          )}
          
          {/* Bright lighting */}
          {useHDR ? (
            <>
              <ambientLight intensity={0.7} />
              <spotLight position={[20,0 , 8]} angle={0} penumbra={0.5} intensity={20} castShadow />
              <pointLight position={[0, 10, 10]} intensity={12} color="#ffffff" />
              <pointLight position={[-10, -10, -10]} intensity={8} />
            </>
          ) : (
            <>
              <hemisphereLight color={skyColor ?? 0xb1e1ff} groundColor={0x444444} intensity={0.8} />
              <ambientLight intensity={0.7} />
              <directionalLight position={[10, 2, 20]} intensity={0.25} castShadow />
              <directionalLight position={[-10, 2, 20]} intensity={0.2} />
              <pointLight position={[0, 5, 8]} intensity={2} />
              <directionalLight position={[2, -4, 20]} intensity={0.3} />
            </>
          )}
          
          <Model3D 
            modelPath={modelPath} 
            mouseRef={mouseRef} 
            scale={modelScale} 
            useHDR={useHDR}
            baseColor={baseColor}
            perMeshColors={perMeshColors}
            addCenterLight={!useHDR && centerLight}
            centerLightIntensity={centerLightIntensity}
            centerLightColor={centerLightColor}
            centerLightOffset={centerLightOffset}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload models for better performance with Draco compression
useGLTF.preload('/models/asml_3d_logo_3-v2.glb', true);
useGLTF.preload('/models/shu_4.glb', true);
useGLTF.preload('/models/sikorsky.glb', true);
useGLTF.preload('/models/petvet_full.glb', true);
