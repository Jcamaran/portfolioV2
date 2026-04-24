"use client";

import { motion } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import { ReactFlow, Background, BackgroundVariant, ReactFlowProvider } from '@xyflow/react';
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
    title: "Software Engineer",
    date: "August, 2025 - Present",
    description: "Architecting the Smart Corrective Action Assistant (SCAA), a production-ready RAG pipeline using FastAPI and pgvector. This system leverages locally-hosted LLMs to help Sikorsky engineers instantly diagnose and resolve complex aircraft discrepancies.",
    position: "10%",
    verticalPosition: "8%",
    modelPath: "/models/sikorsky.glb",
    modelScale: 1,
    modelOffset: { x: 0, y: -0 },
    baseColor: "#3b82f6",
    skyColor: "#bcdcff"
  },
  {
    title: "Data Analytics Engineer",
    company: "ASML",
    date: "May, 2025 - Aug, 2025",
    description: "Engineered an NLP classification pipeline in Spark to process 5,000+ operator entries, predicting root cause codes with high accuracy. Deployed a Python and Streamlit interface on Azure Databricks to provide real-time predictive insights for manufacturing workflows.",
    position: "35%",
    verticalPosition: "35%",
    modelPath: "/models/asml_3d_logo_3-v2.glb",
    modelScale: 1.6,
    baseColor: "#3b82f6",
    skyColor: "#bcdcff"
  },
  {
    title: "Data Analyst",
    date: "May, 2024 - Aug, 2024",
    description: "Developed custom web scrapers and machine learning models to analyze athletic performance data. Identified key performance indicators (KPIs) and progression trends through rigorous statistical analysis to optimize training outcomes.",
    position: "60%",
    verticalPosition: "60%",
    modelPath: "/models/shu_4.glb",
    modelScale: 2,
    modelOffset: { x: 0, y: -10 },
    baseColor: "#d32f2f",
    skyColor: "#ffd1d1"
  },
  {
    title: "Software Engineer",
    date: "May, 2023 - Aug, 2023",
    description: "Automated legacy data migration at the Sikorsky Historical Archives by building Python-based ETL pipelines. Developed scripts to map complex Excel datasets to Monday.com via REST API, streamlining digital record management.",
    position: "85%",
    verticalPosition: "85%",
    modelPath: "/models/sikorsky.glb",
    modelScale: 1,
    modelOffset: { x: 0, y: -10 }, 
    baseColor: "#3b82f6",
    skyColor: "#bcdcff"
  }
];

function AnimatedLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
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

        <div ref={containerRef} className={`relative w-full flex ${isMobile ? 'flex-col gap-6 py-8' : 'flex-row flex-wrap justify-center gap-6 lg:gap-8 py-8'}`}>

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
            className="flex flex-col overflow-hidden border border-white/50 sm:border-white/60 rounded-lg shadow-lg shadow-blue-500/20  md:hover:border-purple-200/60 md:hover:shadow-sm md:hover:shadow-purple-500/40 group cursor-pointer pointer-events-auto w-full h-64"
                style={{ 
                  boxShadow: '0 0 20px rgba(96, 165, 250, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
                  transformOrigin: 'center center'
                }}
                initial={{ opacity: 0, filter: 'blur(2px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                animate={{
                  scale: expandedCardIndex === index ? 1.02 : 1,
                  background: expandedCardIndex === index 
                    ? 'linear-gradient(to bottom, #31315a 0%, #31315a 90%, rgba(59, 130, 246, 0.5) 100%)'
                    : 'linear-gradient(to bottom, #8F87F1 0%, #8F87F1 90%, rgba(96, 165, 250, 0.2) 100%)',
                }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.34, 1.56, 0.64, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}

                onClick={() => setExpandedCardIndex(expandedCardIndex === index ? null : index)}
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
                    <ReactFlowProvider>
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
                    </ReactFlowProvider>
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
                    {/* Logo - animate to background when expanded */}
                    <motion.div 
                      key={`logo-${index}-${logoDimensions.width}`}
                      className="shrink-0 absolute left-1/2 top-0 -translate-x-1/2"
                      style={{ 
                        ...(exp.modelOffset && {
                          marginLeft: `${exp.modelOffset.x}px`,
                          marginTop: `${exp.modelOffset.y}px`
                        })
                      }}
                      animate={{
                        scale: expandedCardIndex === index ? 0.35 : 1,
                        opacity: expandedCardIndex === index ? 0.12 : 1,
                        y: expandedCardIndex === index ? 40 : 0,
                        filter: expandedCardIndex === index ? 'blur(4px)' : 'blur(0px)',
                      }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.34, 1.56, 0.64, 1],
                        type: "spring",
                        stiffness: 80,
                        damping: 12
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
                    
                    {/* Text - animate to center/top when expanded */}
                    <motion.div 
                      key={`text-${index}-${logoDimensions.width}`}
                      className="flex flex-col shrink-0 px-2 sm:px-4"
                      animate={{
                        y: expandedCardIndex === index ? 10 : logoDimensions.height + 0,
                        scale: expandedCardIndex === index ? 1 : 1,
                      }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.34, 1.56, 0.64, 1],
                        type: "spring",
                        stiffness: 80,
                        damping: 12,
                        delay: expandedCardIndex === index ? 0.1 : 0
                      }}
                    >
                      <motion.h3 
                        className="text-md sm:text-base lg:text-lg font-bold text-white mb-1 sm:mb-2"
                        animate={{
                          scale: expandedCardIndex === index ? 1 : 1,
                        }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.34, 1.56, 0.64, 1],
                          delay: 0.15
                        }}
                      >
                        {exp.title}
                      </motion.h3>
                      <motion.p 
                        className={`text-sm sm:text-sm text-white ${expandedCardIndex === index ? 'line-clamp-6' : 'line-clamp-4'}`}
                        animate={{
                          opacity: expandedCardIndex === index ? 1 : 0.95,
                        }}
                        transition={{ 
                          duration: 0.5,
                          delay: 0.2
                        }}
                      >
                        {exp.description}
                      </motion.p>
                    </motion.div>
                    
                    {/* Internship Tag - bottom left */}
                    <motion.div
                      className="absolute -bottom-9 left-7 px-4 py-1.5 rounded-full bg-purple-400/70 backdrop-blur-sm border border-white/10 shadow-xl"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{
                        opacity: expandedCardIndex === index ? 1 : 0,
                        y: expandedCardIndex === index ? 0 : 10,
                        scale: expandedCardIndex === index ? 1 : 0.8,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: expandedCardIndex === index ? 0.4 : 0,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      style={{ pointerEvents: 'none' }}
                    >
                      <span className="text-xs font-semibold text-gray-200 tracking-wide uppercase flex items-center gap-1.5">
                        <svg 
                          className="w-3 h-3" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                          />
                        </svg>
                        Internship
                      </span>
                    </motion.div>
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

