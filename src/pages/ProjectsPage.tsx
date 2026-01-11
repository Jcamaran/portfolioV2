import ParticlesBackground from "@/components/ParticlesBackground";
import ProjectCard from "@/components/projects/ProjectCard";
import { memo } from "react";

const MemoizedParticles = memo(ParticlesBackground);

export default function ProjectsPage() {

  const projects = [
    {
      id: 1,
      title: "SCAA Capstone Project",
      description: "A full-stack RAG + LMM application created for Sikorsky Aircrafts engineers to understand technical documents and obtain actionable steps towards solving their problems.",
      image: "/SCAA.png",
      tech: ["Python", "PostgreSQL", "TypeScript", "React", "Tailwind CSS", "FastAPI", "Langchain"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 2,
      title: "RCC Predicitons Using NLP",
      description: "Built an NLP-based classification pipeline in Spark to process large volumes of operator text entries and predict root cause codes.",
      image: "/asml_proj.jpg",
      tech: ["Azure Databricks", "Python", "Spark", "MLflow", "Scikit-learn", "Streamlit", "CSS"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    // {
    //   id: 3,
    //   title: "Ring Facial Recognition",
    //   description: "A facial recognition system using Python and OpenCV to identify individuals in real-time video streams from Ring cameras and unlock doors automatically.",
    //   image: "/project3.jpg",
    //   tech: ["Python", "OpenCV", "face_recognition", "SQLite"],
    //   github: "https://github.com",
    //   demo: "https://demo.com"
    // },
    {
      id: 3,
      title: "First Portfolio Project",
      description: "Just my first attempt at creating a portfolio website to showcase my projects and skills.",
      image: "/first_portfolio.png",
      tech: ["React","Tailwind CSS", "JavaScript", "JSX", "Vite", "GitHub Pages"],
      github: "https://github.com/Jcamaran/Ring-Facial-Recognition",
      demo: "https://jcamaran.github.io/joaquin-portfolio/"
    }
  
  
  ];

  return (
    <div className="min-h-screen font-sans">
      <MemoizedParticles />

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <section className="pt-16 mb-7">
          <h1 className="text-5xl font-bold text-white mb-4">
            My Projects
          </h1>
          <p className="text-lg text-gray-300 mb-16 max-w-2xl">
            Here are some of my recent projects that showcase my skills and experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tech={project.tech}
                github={project.github}
                demo={project.demo}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
