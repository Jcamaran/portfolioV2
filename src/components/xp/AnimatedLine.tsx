"use client";

import { motion } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Logo3D from './Logo3D';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';



interface Experience {
  title: string;
  company?: string;
  date: string;
  description: string;
  position: string;
  verticalPosition: string;
  modelPath: string;
  modelScale: number;
  modelOffset?: { x: number; y: number };
  baseColor: string;
  skyColor: string;
}

const experiences: Experience[] = [
  {
    title: "Software Engineer Capstone",
    date: " August, 2025 - Present",
    description: "Building a retrieval-augmented generation (RAG) LLM web application that enables Sikorsky engineers to diagnose and resolve discrepancies more efficiently.",
    position: "10%", // Position along horizontal line
    verticalPosition: "8%", // Position for vertical layout
    modelPath: "/models/sikorsky.glb",
    modelScale: 1,
    modelOffset: { x: 0, y: -0 }, // Offset to center Sikorsky model
    baseColor: "#3b82f6", // metallic blue
    skyColor: "#bcdcff"
  },
  {
    title: "Data Analytics Engineer Intern",
    company: "ASML",
    date: "May, 2025 - Aug, 2025",
    description: "Developed ML-driven predictive analytics and a Python + Streamlit app using Azure Databricks to optimize manufacturing workflows.",
    position: "35%", // Position along horizontal line
    verticalPosition: "35%",
    modelPath: "/models/asml_3d_logo_3-v2.glb",
    modelScale: 1.6,
    baseColor: "#3b82f6", // metallic blue
    skyColor: "#bcdcff"
  },
  {
    title: "Data Analyst Intern",
    date: "May, 2024 - Aug, 2024",
    description: "Applied machine learning, statistical analysis, and web scraping to analyze weightlifting performance data, uncovering key indicators, and progression trends",
    position: "60%", // Position along horizontal line
    verticalPosition: "60%",
    modelPath: "/models/shu_4.glb",
    modelScale: 2,
    modelOffset: { x: 0, y: -10 },
    baseColor: "#d32f2f", // metallic red
    skyColor: "#ffd1d1"
  },
  {
    title: "Software Engineer Intern",
    date: "May, 2023 - Aug, 2023",
    description: "Built reusable Python-based ETL pipelines with SQL/MongoDB to automate Excel data ingestion and led a Monday.com implementation",
    position: "85%", // Position along horizontal line
    verticalPosition: "85%",
    modelPath: "/models/sikorsky.glb",
    modelScale: 1,
    modelOffset: { x: 0, y: -10 }, 
    baseColor: "#3b82f6", // metallic blue
    skyColor: "#bcdcff"
  }
];

function AnimatedLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if mobile layout (vertical)
  const isMobile = viewportWidth < 768;

  // Responsive Logo3D dimensions
  const getLogoDimensions = () => {
    if (viewportWidth < 640) return { width: 180, height: 80, scale: 1 }; // mobile
    if (viewportWidth < 768) return { width: 240, height: 85, scale: 0.85 }; // sm
    return { width: 300, height: 90, scale: 1 }; // md and up
  };
  const logoDimensions = getLogoDimensions();
  
  // Stable refs for per-card mouse positions (no re-renders)
  const mouseRefs = useMemo(
    () => experiences.map(() => ({ current: { x: 0, y: 0 } })),
    []
  );

  return (
    <>
      {/* 3D Background - Spinning Globe (Fixed to viewport) */}
      <Canvas 
        dpr={[1, 1.5]}  // Let device choose optimal pixel ratio (better performance)
        gl={{ 
          antialias: true,
          powerPreference: 'high-performance'
        }}
        className="fixed inset-0 pointer-events-none "
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
        camera={{ position: [0, 0, 8], fov: 90 }}
      >
        <ambientLight intensity={1.2} color="#ffffff" />
        <pointLight 
          position={[5, 5, 0]} 
          intensity={15} 
          color="#ffffff"
          distance={20}
        />
        <pointLight 
          position={[-5, -5, 0]} 
          intensity={15} 
          color="#ffffff"
          distance={20}
        />
        <directionalLight position={[0, 10, 5]} intensity={3} color="#ffffff" />
        <SpinningHologram />
      </Canvas>

      {/* Cards Container */}
      <div className="relative w-full flex flex-col max-w-7xl mx-20 items-center justify-center -translate-y-10 z-10 pt-20 sm:pt-0">
        {/* Timeline section - Flex layout for cards */}
        <div className={`relative w-full ${isMobile ? 'flex flex-col' : 'flex flex-row'}`}>

        <div ref={containerRef} className={`relative w-full flex ${isMobile ? 'flex-col gap-6 py-4' : 'flex-row flex-wrap justify-center gap-6 lg:gap-8 py-8'}`}>

      {/* Experience Cards */}
      {experiences.map((exp, index) => (
        <div
          key={index}
          className={`flex flex-col items-center overflow-visible ${isMobile ? 'w-full' : 'w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]'} pointer-events-none`}
        >
          {/* Date label */}
          <div className="mb-3 pointer-events-none">
            <span className="px-3 py-1.5 rounded-full text-xs tracking-widest uppercase bg-black/40 text-slate-200 border border-white/10 backdrop-blur-sm shadow flex items-center justify-center whitespace-nowrap">
              {exp.date}
            </span>
          </div>
          
          {/* Cards */}
          <motion.div
            className="flex flex-col overflow-hidden border border-white/50 sm:border-white/60 rounded-lg shadow-lg shadow-blue-500/20 bg-linear-to-b from-[#8F87F1] to-90% to-blue-400/20 md:hover:border-purple-400/60 md:hover:shadow-sm md:hover:shadow-purple-500/40 transition-all group cursor-pointer pointer-events-auto w-full h-64"
                style={{ 
                  boxShadow: '0 0 20px rgba(96, 165, 250, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
                  transformOrigin: 'center center'
                }}
                initial={{ opacity: 0, filter: 'blur(2px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}

                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                  const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                  mouseRefs[index].current = {
                    x: Math.max(-0.9, Math.min(0.9, x)),
                    y: Math.max(-0.9, Math.min(0.9, y))
                  };
                }}
                onMouseOut={() => {
                  mouseRefs[index].current = { x: 0, y: 0 };
                }}
              >
                <div className="relative inset-0 bg-linear-to-b from-white/5 from-40% to-black/60 backdrop-blur-sm rounded-lg border border-white/20 h-full w-full">
                  <div className="absolute top-0 left-0 right-0 inset-0 z-0 w-full h-full">
                    <ReactFlow 
                      nodes={[]} 
                      edges={[]} 
                      fitView={false} 
                      panOnDrag={false} 
                      zoomOnScroll={false} 
                      zoomOnPinch={false} 
                      zoomOnDoubleClick={false}
                      nodesDraggable={false}
                      nodesConnectable={false}
                      elementsSelectable={false}
                      proOptions={{ hideAttribution: true }}
                    >
                      <Background 
                        variant={BackgroundVariant.Lines} 
                        gap={20} 
                        size={0.5} 
                        color="rgba(132, 140, 207, 1)" 
                      />
                    </ReactFlow>
                    <div className="absolute inset-0 bg-linear-to-b from-transparent from-50% to-black/20 pointer-events-none" />
                  
                    {/* Neon glow layers emanating from logo */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                      {/* Inner intense glow */}
                      <div 
                        className="absolute inset-0 "
                        style={{
                          background: `radial-gradient(circle at center, 
                            rgba(205, 209, 228) 15%, 
                            rgba(139, 92, 246, 0.4) 15%, 
                            transparent 40%)`,
                          filter: 'blur(15px)',
                          mixBlendMode: 'screen',
                          opacity: 0.3
                        }}
                      />
                      
                      {/* Outer soft glow */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at center, 
                            rgba(45, 85, 255, 0.3) 0%, 
                            rgba(43, 44, 170, 0.1) 40%, 
                            transparent 90%)`,
                          filter: 'blur(0px)',
                          mixBlendMode: 'screen',
                          opacity: 0.2
                        }}
                      />
                    </div>
                    
                  </div>
                  
                  <div className="relative flex flex-col items-center justify-start h-50 w-full z-20 p-2 sm:p-3">
                    <motion.div 
                      className="shrink-0" 
                      style={{ 
                        transform: exp.modelOffset ? `translate(${exp.modelOffset.x}px, ${exp.modelOffset.y}px)` : undefined 
                      }}
                    >
                      <Logo3D 
                        modelPath={exp.modelPath} 
                        width={logoDimensions.width} 
                        height={logoDimensions.height} 
                        modelScale={exp.modelScale * logoDimensions.scale}
                        isHovered={hoveredCardIndex === index}
                        useHDR={false}
                        baseColor={exp.baseColor}
                        skyColor={exp.skyColor}
                        dpr={viewportWidth < 640 ? [1, 1.5] : [1, 2]}
                        mouseRef={mouseRefs[index]}
                        
                      />
                    </motion.div>
                    
                    <div 
                      className="flex flex-col shrink-0 px-2 sm:px-4 mt-2 sm:mt-3"
                    >
                      <h3 className="text-md sm:text-base lg:text-lg font-bold text-white mb-1 sm:mb-2">{exp.title}</h3>
                      <p className="text-sm sm:text-sm text-gray-200 line-clamp-3">{exp.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
        </div>
      ))}

        </div>
      </div>
      </div>
    </>
  );
}


export default AnimatedLine;



// Spinning Hologram Globe Component
function SpinningHologram() {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/models/animated_hologram_planet_earth_sci_fi_3d_model/HologramEarthAnimated/HologramEarthAnimated.glb');
  
  // Apply colors to different parts of the globe
  useEffect(() => {
    console.log('🎨 Applying colors to globe parts...');
    
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        console.log('Found mesh:', mesh.name || 'unnamed');
        
        // Get the material(s)
        const materials = Array.isArray(mesh.material) 
          ? mesh.material 
          : [mesh.material];
        
        materials.forEach((mat, index) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            console.log(`  Material ${index}:`, mat.name);
            
            // Example: Color different parts based on name or index
            // You can customize these colors for different meshes
            
            // Default: Bright cyan/blue for hologram effect
            mat.color.setHex(0x00eeff); // Bright cyan
            mat.emissive.setHex(0x0088ff); // Blue glow
            mat.emissiveIntensity = 2.5; // Strong glow
            
            // Make it semi-transparent for hologram look
            mat.transparent = true;
            mat.opacity = 0.9;
            
            // Apply DISTINCT colors to different parts
            // Example based on mesh name:
            if (mesh.name.toLowerCase().includes('planet')) {
              mat.color.setHex(0x00ff88); // Bright green-cyan for planet
              mat.emissive.setHex(0x00dd66); // Green glow
              mat.emissiveIntensity = 3.0;
            } else if (mesh.name.toLowerCase().includes('cloud')) {
              mat.color.setHex(0xff00ff); // Bright magenta for clouds
              mat.emissive.setHex(0xcc00cc); // Purple glow
              mat.emissiveIntensity = 2.5;
            } else if (mesh.name.toLowerCase().includes('ring') || mesh.name.toLowerCase().includes('orbit')) {
              mat.color.setHex(0xffff00); // Bright yellow for rings
              mat.emissive.setHex(0xffaa00); // Orange glow
              mat.emissiveIntensity = 3.5;
              mat.opacity = 0.85;
            } else if (mesh.name.toLowerCase().includes('grid') || mesh.name.toLowerCase().includes('line')) {
              mat.color.setHex(0x00ffff); // Cyan for grid lines
              mat.emissive.setHex(0x00ccff);
              mat.emissiveIntensity = 4.0;
              mat.opacity = 0.7;
            }
            
            mat.needsUpdate = true;
          }
        });
      }
    });
  }, [gltf]);
  
  // Simple rotation in useFrame
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * .25;
      
      // Debug log every second
      if (Math.floor(state.clock.elapsedTime) % 2 === 0 && state.clock.elapsedTime % 1 < delta) {
        console.log('🌍 Rotating:', groupRef.current.rotation.y.toFixed(2), 'degrees');
      }
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={3}>
      <primitive object={gltf.scene} />
    </group>
  );
}

