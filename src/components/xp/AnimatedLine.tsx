"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Logo3D from './Logo3D';


function AnimatedLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to line height (0 to 100%)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["5%", "100%"]);

  // Experience data (your last two experiences first, then first two)
  const experiences = [
    {
      title: "Software Engineer Capstone",
      company: "Sikorsky Aircraft",
      date: "2024 - Present",
      description: "Building a retrieval-augmented generation (RAG) LLM web application that enables Sikorsky engineers to diagnose and resolve discrepancies more efficiently.",
      position: "2%", // Position along the line (first screen)
      modelPath: "/models/sega_logo.glb" // Add your 3D model path
    },
    {
      title: "Data Visualization & Analytics Engineering Intern",
      company: "ASML",
      date: "2023 - 2024",
      description: "Developed ML-driven predictive analytics and a Python + Streamlit app using Azure Databricks to optimize manufacturing workflows.",
      position: "18%", // Position along the line (first screen)
      modelPath: "/models/sega_logo.glb" // Add your 3D model path
    },
    {
      title: "Intern",
      company: "Data Analyst Intern",
      date: "2022 - 2023",
      description: "Applied machine learning, statistical analysis, and web scraping to analyze weightlifting performance data, uncovering key indicators, category disparities, and progression trends",
      position: "65%", // Second screen
      modelPath: "/models/sega_logo.glb" // Add your 3D model path
    },
    {
      title: "Software Engineer Intern",
      company: "Company D",
      date: "2021 - 2022",
      description: "Built reusable Python-based ETL pipelines with SQL/MongoDB to automate Excel data ingestion and led a Monday.com implementation that improved task tracking and organizational efficiency.",
      position: "80%", // Second screen
      modelPath: "/models/sega_logo.glb" // Add your 3D model path
    }
  ];

  // Stable refs for per-card mouse positions (no re-renders)
  const mouseRefs = useMemo(
    () => experiences.map(() => ({ current: { x: 0, y: 0 } } as { current: { x: number; y: number } })),
    []
  );

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "200vh" }}>
      {/* Vertical Line Container */}
      <div className="sticky top-0 left-1/2 -translate-x-1/2 w-1 h-screen">
        {/* Background line (gray) */}
        <div className="absolute top-0 left-0 w-full h-full bg-gray-600/30" />
        
        {/* Animated line (colored) that grows with scroll */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-blue-200"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Experience Cards */}
      {experiences.map((exp, index,) => (
        <motion.div
          key={index}
          className={`absolute ${index % 2 === 0 ? 'left-[52%]' : 'right-[52%]'} w-96 max-w-96 h-64 flex flex-row overflow-y-hidden border border-white/60 rounded-lg shadow-lg shadow-blue-500/20 bg-linear-to-b from-violet-500/50 to-slate-900/10 to-75% duration-400 hover:border-purple-400/60 hover:shadow-sm hover:shadow-purple-500/40 backdrop-hue-rotate-0 transition-all  group-hover:backdrop-hue-rotate-15`}
          style={{ 
            top: exp.position,
            boxShadow: '0 0 20px rgba(96, 165, 250, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)'
          }}
          initial={{ opacity: 0, filter: 'blur(2px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{
            scale: 1.00,
            boxShadow: '0 0 30px rgba(96, 165, 250, 0.5), 0 0 60px rgba(139, 92, 246, 0.4), 0 0 10px rgba(167, 139, 250, 0.3)',
            transition: { duration: 0.2 }
          }}
          onMouseEnter={() => setHoveredCardIndex(index)}
          onMouseLeave={() => setHoveredCardIndex(null)}
          onMouseMove={(e) => {
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            // clamp to reduce edge jitter
            mouseRefs[index].current = {
              x: Math.max(-0.9, Math.min(0.9, x)),
              y: Math.max(-0.9, Math.min(0.9, y))
            };
          }}
          onMouseOut={() => {
            mouseRefs[index].current = { x: 0, y: 0 };
          }}
        >
          <div className="relative inset-0 bg-linear-to-b from-white/5 from-40% to-black/60 backdrop-blur-sm rounded-lg border border-white/20 h-full w-full" >
          

            <div className="absolute inset-0 z-0 w-full h-full">
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
                  variant={index % 2 === 0 ? BackgroundVariant.Lines : BackgroundVariant.Dots} 
                  gap={16} 
                  size={1} 
                  color="rgba(148, 163, 184, 0.3)" 
                />
              </ReactFlow>
            </div>
            {/* 3D Logo positioned in top-right corner */}
            <div className=" flex items-center justify-center right-2 z-20">
              <Logo3D 
                modelPath={exp.modelPath} 
                width={150} 
                height={100} 
                modelScale={0.23}
                isHovered={hoveredCardIndex === index}
                // pass the per-card mouse ref
                mouseRef={mouseRefs[index] as any}
              />
            </div>
            
            
            <div className="relative z-10 p-4">
              <h3 className="text-md font-bold text-white mb-2">{exp.title}</h3>
              <p className="text-sm text-gray-300">{exp.description}</p>
            </div>
          </div>
          
          {/* Connecting dot on the line */}
         
        </motion.div>
      ))}
    </div>
  );
}

export default AnimatedLine;