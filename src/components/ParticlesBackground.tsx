"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: [
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgb(139 122 224 / 0.35), transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 100% 100%, rgb(119 190 240 / 0.14), transparent 60%)",
            "radial-gradient(ellipse 50% 40% at 0% 80%, rgb(226 187 233 / 0.10), transparent 60%)",
            "linear-gradient(180deg, var(--night) 0%, var(--night-deep) 100%)",
          ].join(", "),
          zIndex: -2,
        }}
      />
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
        fpsLimit: 120,
        particles: {
          number: {
            value: 120,
            density: {
              enable: true,
            },
          },
          color: {
            value: ["#FFFFFF", "#E2BBE9", "#B9AEF0", "#77BEF0"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: {
              enable: true,
              speed: 3,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "top",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
            onClick: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            bubble: {
              distance: 200,
              size: 6,
              duration: 2,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
    </>
  );
}
