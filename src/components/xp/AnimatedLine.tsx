"use client";

import { motion, MotionConfig } from 'framer-motion';
import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import Logo3D from './Logo3D';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';



interface Experience {
  title: string;
  company: string;
  type: "Full-time" | "Capstone" | "Internship";
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
    title: "Full Stack Engineer",
    company: "PetVet Care Centers",
    type: "Full-time",
    date: "Sept, 2026 - Present",
    description: "Designing, building, and maintaining full-stack web applications for PetVet Care Centers' network of veterinary hospitals, from responsive front-end interfaces to scalable APIs and databases.",
    position: "10%",
    verticalPosition: "8%",
    modelPath: "/models/petvet_full.glb",
    modelScale: 1.6,
    baseColor: "#3b82f6",
    skyColor: "#bcdcff"
  },
  {
    title: "Software Engineer",
    company: "Sikorsky",
    type: "Capstone",
    date: "Aug, 2025 - Sept, 2026",
    description: "Architecting the Smart Corrective Action Assistant (SCAA), a production-ready RAG pipeline using FastAPI, pgvector, and locally-hosted LLMs to help Sikorsky engineers instantly diagnose complex aircraft discrepancies.",
    position: "35%",
    verticalPosition: "35%",
    modelPath: "/models/sikorsky.glb",
    modelScale: 1,
    modelOffset: { x: 0, y: -0 },
    baseColor: "#3b82f6",
    skyColor: "#bcdcff"
  },
  {
    title: "Data Analytics Engineer",
    company: "ASML",
    type: "Internship",
    date: "May, 2025 - Aug, 2025",
    description: "Engineered an NLP classification pipeline in Spark to predict root cause codes across 5,000+ operator entries, deploying a Streamlit interface on Azure Databricks for real-time manufacturing insights.",
    position: "60%",
    verticalPosition: "60%",
    modelPath: "/models/asml_3d_logo_3-v2.glb",
    modelScale: 1.6,
    baseColor: "#3b82f6",
    skyColor: "#bcdcff"
  },
  {
    title: "Data Analyst",
    company: "Sacred Heart University",
    type: "Internship",
    date: "May, 2024 - Aug, 2024",
    description: "Developed custom web scrapers and machine learning models to analyze athletic performance data, identifying key performance indicators and progression trends to optimize training outcomes.",
    position: "85%",
    verticalPosition: "85%",
    modelPath: "/models/shu_4.glb",
    modelScale: 2,
    modelOffset: { x: 0, y: -10 },
    baseColor: "#d32f2f",
    skyColor: "#ffd1d1"
  }
];

function AnimatedLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  // Start from the server-rendered width and measure after mount, so hydration matches
  const [viewportWidth, setViewportWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
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
        <Suspense fallback={null}>
          <SpinningHologram />
        </Suspense>
      </Canvas>

      {/* Cards Container */}
      <MotionConfig reducedMotion="user">
      <div className="relative w-full flex flex-col max-w-7xl mx-20 items-center justify-center -translate-y-10 z-10 pt-20 sm:pt-0">
        {/* Timeline section - Flex layout for cards */}
        <div className={`relative w-full ${isMobile ? 'flex flex-col' : 'flex flex-row'}`}>

        <div ref={containerRef} className={`relative w-full flex ${isMobile ? 'flex-col gap-6 py-8' : 'flex-row flex-wrap justify-center gap-6 lg:gap-8 py-8'}`}>

      {/* Timeline rail linking the date chips (single-row desktop layout only) */}
      <motion.div
        aria-hidden
        className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-[2.875rem] h-px origin-left pointer-events-none bg-linear-to-r from-emerald-300/60 via-lilac/40 to-sky-brand/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Experience Cards */}
      {experiences.map((exp, index) => {
        const isExpanded = expandedCardIndex === index;
        const isCurrent = exp.date.includes('Present');
        const toggle = () => setExpandedCardIndex(isExpanded ? null : index);

        return (
        <motion.div
          key={`${exp.company}-${exp.date}`}
          className={`flex flex-col items-center overflow-visible ${isMobile ? 'w-full' : 'w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]'} pointer-events-none`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
        >
          {/* Date label */}
          <div className="relative mb-3 pointer-events-none">
            <span className={`px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider uppercase border backdrop-blur-sm flex items-center justify-center gap-2 whitespace-nowrap ${isCurrent ? 'bg-emerald-400/10 text-emerald-100 border-emerald-300/40' : 'bg-night-deep/80 text-white/70 border-white/10'}`}>
              {isCurrent && <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]" />}
              {exp.date}
            </span>
          </div>
          
          {/* Cards */}
          <motion.div
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            className="flex flex-col overflow-hidden border border-white/10 rounded-2xl bg-origin-border bg-no-repeat md:hover:border-lilac/50 transition-colors group cursor-pointer pointer-events-auto w-full h-64 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                style={{ 
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 24px 48px -24px rgba(0, 0, 0, 0.7), 0 0 36px -10px rgba(139, 122, 224, 0.45)',
                  transformOrigin: 'center center'
                }}
                animate={{
                  scale: isExpanded ? 1.02 : 1,
                  // backgroundImage (not the `background` shorthand) so the border-box origin above sticks;
                  // otherwise the gradient tiles under the bottom border and shows a light line
                  backgroundImage: isExpanded
                    ? 'linear-gradient(to bottom, rgba(43, 42, 76, 0.95) 0%, rgba(30, 29, 56, 0.95) 55%, rgba(23, 22, 44, 0.95) 100%)'
                    : 'linear-gradient(to bottom, rgba(168, 156, 240, 0.62) 0%, rgba(52, 50, 92, 0.9) 50%, rgba(23, 22, 44, 0.94) 100%)',
                }}
                whileHover={isMobile ? undefined : { y: -4 }}
                transition={{ 
                  type: "spring",
                  stiffness: 220,
                  damping: 26
                }}

                onClick={toggle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle();
                  }
                }}
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
                <div className="relative inset-0 bg-linear-to-b from-white/[0.04] from-40% to-transparent backdrop-blur-md rounded-[inherit] h-full w-full">
                  <div className="absolute top-0 left-0 right-0 inset-0 z-0 w-full h-full">
                    {/* Blueprint grid */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: 'linear-gradient(to right, rgba(226, 187, 233, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(226, 187, 233, 0.09) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 25%, black 30%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 25%, black 30%, transparent 100%)',
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent from-50% to-black/20 pointer-events-none" />
                  
                    {/* Neon glow layers emanating from logo */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                      {/* Inner intense glow */}
                      <div 
                        className="absolute inset-0 "
                        style={{
                          background: `radial-gradient(ellipse 60% 30% at 50% 18%,
                            rgba(236, 232, 255, 0.85) 0%,
                            rgba(139, 122, 224, 0.35) 45%,
                            transparent 100%)`,
                          filter: 'blur(12px)',
                          mixBlendMode: 'screen',
                          opacity: isExpanded ? 0.15 : 0.75,
                          transition: 'opacity 400ms ease'
                        }}
                      />
                      
                      {/* Outer soft glow */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at center,
                            rgba(119, 190, 240, 0.25) 0%,
                            rgba(139, 122, 224, 0.1) 40%,
                            transparent 90%)`,
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
                      className="shrink-0 absolute left-1/2 top-0"
                      style={{ 
                        x: "-50%",
                        transformOrigin: "top center",
                        ...(exp.modelOffset && {
                          marginLeft: `${exp.modelOffset.x}px`,
                          marginTop: `${exp.modelOffset.y}px`
                        })
                      }}
                      initial={false}
                      animate={{
                        x: "-50%",
                        scale: isExpanded ? 0.35 : 1,
                        opacity: isExpanded ? 0.12 : 1,
                        y: isExpanded ? 40 : 0,
                        filter: isExpanded ? 'blur(4px)' : 'blur(0px)',
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 180,
                        damping: 24
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
                      className="flex flex-col shrink-0 w-full px-2 sm:px-4"
                      animate={{
                        y: isExpanded ? 10 : logoDimensions.height,
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 180,
                        damping: 24,
                        delay: isExpanded ? 0.1 : 0
                      }}
                    >
                      <h3 className="text-base lg:text-lg font-semibold tracking-tight text-white leading-tight whitespace-nowrap">
                        {exp.title}
                      </h3>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-lilac/80 mt-0.5 mb-1.5 sm:mb-2">
                        {exp.company}
                      </p>
                      <p className={`text-sm leading-normal text-white/70 ${isExpanded ? 'line-clamp-6' : 'line-clamp-3'}`}>
                        {exp.description}
                      </p>
                    </motion.div>
                    
                  </div>

                  {/* Employment type tag - bottom left, level with the expand toggle */}
                  <motion.div
                    className={`absolute bottom-2 left-3 sm:left-4 z-20 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/15 shadow-lg ${exp.type === 'Full-time' ? 'bg-emerald-500/70' : 'bg-violet-brand/70'}`}
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      y: isExpanded ? 0 : 10,
                      scale: isExpanded ? 1 : 0.8,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: isExpanded ? 0.3 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ pointerEvents: 'none' }}
                  >
                    <span className="font-mono text-[11px] text-white tracking-wider uppercase flex items-center gap-1.5">
                      <svg 
                        className="w-3 h-3" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                        />
                      </svg>
                      {exp.type}
                    </span>
                  </motion.div>

                  {/* Expand affordance - bottom right */}
                  <span className="absolute bottom-2.5 right-3 z-20 flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-white/50 group-hover:text-lilac transition-colors duration-200 pointer-events-none">
                    {isExpanded ? 'Less' : 'More'}
                    <svg className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </motion.div>
        </motion.div>
        );
      })}

        </div>
      </div>
      </div>
      </MotionConfig>
    </>
  );
}


export default AnimatedLine;



// Spinning Hologram Globe Component
const GLOBE_SCALE = 3;

// Per-bone motion (rad/s), with spin rates measured from the model's 12 s clip.
// The clip doesn't end where it starts, so looping it snapped every ring back to
// its first pose; driving the motion from elapsed time keeps it seamless.
type Axis = [number, number, number];
const BONE_MOTION: Record<string, { spin: Axis; rate: number; precess?: Axis; precessRate?: number }> = {
  Planet: { spin: [0, 1, 0], rate: 0.22 },
  Clouds: { spin: [0, 1, 0], rate: 0.45, precess: [1, 0, 0], precessRate: 0.08 },
  Ring1: { spin: [1, 0, 0], rate: 0.2, precess: [0, 1, 0], precessRate: 0.06 },
  Ring2: { spin: [1, 0, 0], rate: 0.42, precess: [0, 1, 0], precessRate: -0.08 },
  Ring3: { spin: [1, 0, 0], rate: 0.22, precess: [0, 0, 1], precessRate: 0.1 },
  Ring4: { spin: [1, 0, 0], rate: 0.37, precess: [0, 1, 0], precessRate: -0.05 },
  Ring5: { spin: [1, 0, 0], rate: 0.28, precess: [0, 0, 1], precessRate: -0.07 },
  Ring6: { spin: [1, 0, 0], rate: 0.45, precess: [0, 1, 0], precessRate: 0.09 },
};
const tmpQuat = new THREE.Quaternion();

function SpinningHologram() {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/models/animated_hologram_planet_earth_sci_fi_3d_model/HologramEarthAnimated/HologramEarthAnimated.glb');
  
  // Apply colors to different parts of the globe
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Get the material(s)
        const materials = Array.isArray(mesh.material) 
          ? mesh.material 
          : [mesh.material];
        
        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
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
  
  // Bones the clip animates, starting from the clip's first pose
  const bones = useMemo(
    () => (gltf.animations[0]?.tracks ?? [])
      .filter((track) => track.name.endsWith('.quaternion'))
      .flatMap((track) => {
        const name = track.name.slice(0, -'.quaternion'.length);
        const motion = BONE_MOTION[name.replace(/_\d+$/, '')];
        const bone = gltf.scene.getObjectByName(name);
        if (!motion || !bone) return [];
        return [{
          bone,
          start: new THREE.Quaternion().fromArray(track.values, 0),
          spin: new THREE.Vector3(...motion.spin).normalize(),
          rate: motion.rate,
          precess: motion.precess ? new THREE.Vector3(...motion.precess).normalize() : null,
          precessRate: motion.precessRate ?? 0,
        }];
      }),
    [gltf]
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      // Ease in from slightly smaller on first appearance
      const s = THREE.MathUtils.damp(groupRef.current.scale.x, GLOBE_SCALE, 2.5, delta);
      groupRef.current.scale.setScalar(s);
    }
    // Each bone spins on its own axis while that axis slowly precesses;
    // driven by elapsed time, so the motion never loops or resets
    const t = state.clock.elapsedTime;
    bones.forEach(({ bone, start, spin, rate, precess, precessRate }) => {
      bone.quaternion.copy(start).multiply(tmpQuat.setFromAxisAngle(spin, rate * t));
      if (precess) bone.quaternion.premultiply(tmpQuat.setFromAxisAngle(precess, precessRate * t));
    });
  });
  
  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={GLOBE_SCALE * 0.8}>
      <primitive object={gltf.scene} />
    </group>
  );
}

