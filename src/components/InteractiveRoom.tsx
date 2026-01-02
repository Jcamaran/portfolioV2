"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text, Box } from "@react-three/drei";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Interactive zone component
function InteractiveZone({ 
  position, 
  color, 
  label, 
  onHover, 
  onLeave, 
  onClick,
  isHovered 
}: any) {
  return (
    <group position={position}>
      <Box 
        args={[2, 2, 0.5]} 
        onClick={onClick}
        onPointerOver={onHover}
        onPointerOut={onLeave}
      >
        <meshStandardMaterial 
          color={isHovered ? "#8b5cf6" : color} 
          emissive={isHovered ? "#8b5cf6" : color}
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </Box>
      <Text
        position={[0, 0, 0.3]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// Room structure
function Room({ onZoneClick }: { onZoneClick: (zone: string) => void }) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const zones = [
    { 
      id: "desk", 
      position: [0, 0, -4], 
      color: "#3b82f6", 
      label: "💻 Work Desk",
      title: "My Workspace",
      content: "Here's where I code, build projects, and explore new technologies. Currently working with React, Next.js, and diving into AI/ML."
    },
    { 
      id: "bookshelf", 
      position: [-4, 1, 0], 
      color: "#8b5cf6", 
      label: "📚 Bookshelf",
      title: "Reading & Learning",
      content: "My collection of sci-fi novels and tech books. Currently reading about distributed systems and AI ethics."
    },
    { 
      id: "sports", 
      position: [4, 0, 0], 
      color: "#10b981", 
      label: "⚽ Sports Corner",
      title: "Athletics & Fitness",
      content: "When I'm not coding, I love staying active through sports. Basketball, soccer, and hitting the gym keep me energized."
    },
    { 
      id: "motorcycle", 
      position: [0, -1, 4], 
      color: "#f59e0b", 
      label: "🏍️ Garage",
      title: "Motorcycle & Adventures",
      content: "My motorcycle is more than transport—it's freedom. Weekend rides help me clear my mind and find inspiration."
    },
  ];

  return (
    <>
      {/* Room walls */}
      <Box args={[12, 8, 0.1]} position={[0, 0, -6]}>
        <meshStandardMaterial color="#1e293b" />
      </Box>
      <Box args={[0.1, 8, 12]} position={[-6, 0, 0]}>
        <meshStandardMaterial color="#1e293b" />
      </Box>
      <Box args={[0.1, 8, 12]} position={[6, 0, 0]}>
        <meshStandardMaterial color="#1e293b" />
      </Box>
      <Box args={[12, 0.1, 12]} position={[0, -4, 0]}>
        <meshStandardMaterial color="#0f172a" />
      </Box>
      <Box args={[12, 0.1, 12]} position={[0, 4, 0]}>
        <meshStandardMaterial color="#0f172a" />
      </Box>

      {/* Interactive zones */}
      {zones.map((zone) => (
        <InteractiveZone
          key={zone.id}
          position={zone.position}
          color={zone.color}
          label={zone.label}
          isHovered={hoveredZone === zone.id}
          onHover={() => setHoveredZone(zone.id)}
          onLeave={() => setHoveredZone(null)}
          onClick={() => onZoneClick(zone.id)}
        />
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 3, 0]} intensity={1} />
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} />
    </>
  );
}

// Info Modal
function InfoModal({ zone, onClose }: { zone: any; onClose: () => void }) {
  if (!zone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/20 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-white">{zone.title}</h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">{zone.content}</p>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Continue Exploring
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function InteractiveRoom() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const zones = [
    { 
      id: "desk", 
      title: "My Workspace",
      content: "Here's where I code, build projects, and explore new technologies. Currently working with React, Next.js, and diving into AI/ML. My setup includes multiple monitors for efficient development and a mechanical keyboard for that satisfying typing experience."
    },
    { 
      id: "bookshelf", 
      title: "Reading & Learning",
      content: "My collection of sci-fi novels and tech books. Currently reading about distributed systems and AI ethics. From classics like Dune to modern tech manifestos, this shelf represents my curiosity about both imagined futures and practical implementations."
    },
    { 
      id: "sports", 
      title: "Athletics & Fitness",
      content: "When I'm not coding, I love staying active through sports. Basketball, soccer, and hitting the gym keep me energized. Physical activity isn't just exercise—it's how I problem-solve, staying mentally sharp and maintaining work-life balance."
    },
    { 
      id: "motorcycle", 
      title: "Motorcycle & Adventures",
      content: "My motorcycle is more than transport—it's freedom. Weekend rides help me clear my mind and find inspiration. There's something about the open road that parallels debugging code: you have to stay present, trust your instincts, and enjoy the journey."
    },
  ];

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(zoneId);
  };

  const selectedZoneData = zones.find(z => z.id === selectedZone);

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-white/20 bg-slate-900">
      {/* Instructions overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm border border-white/20 rounded-lg p-4 max-w-xs">
        <p className="text-white text-sm font-medium mb-2">🎮 Interactive Room</p>
        <p className="text-gray-300 text-xs">
          Click and drag to rotate • Scroll to zoom • Click zones to learn more
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={20}
        />
        <Room onZoneClick={handleZoneClick} />
      </Canvas>

      {/* Info Modal */}
      {selectedZoneData && (
        <InfoModal 
          zone={selectedZoneData} 
          onClose={() => setSelectedZone(null)} 
        />
      )}
    </div>
  );
}
