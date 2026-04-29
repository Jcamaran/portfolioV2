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
      image: "/SCAA_2.png",
      tech: ["LLM", "RAG","Python", "PostgreSQL", "TypeScript", "Docker", "Tailwind CSS", "FastAPI", ],
      demo: "https://www.youtube.com/watch?v=yPvSNN3zqzA"
    },
    {
      id: 2,
      title: "RCC Predicitons Using NLP",
      description: "Built an end-to-end NLP classification system in Spark to analyze operator text entries at scale. Trained and evaluated multiple multiclass models for root cause prediction, then deployed the solution via a custom Python application.",
      image: "/asml_proj.jpg",
      tech: ["Azure Databricks", "Python", "Spark", "MLflow", "Scikit-learn", "Streamlit", "CSS"],
      website: ""
    },
    {     
      id: 3,
      title: "First Portfolio Project",
      description: "Just my first attempt at creating a portfolio website to showcase my projects and skills. I created this with Vite and deployed it using GitHub Pages.",
      image: "/first_portfolio.png",
      tech: ["Tailwind CSS", "JavaScript", "JSX", "Vite", "GitHub Pages"],
      github: "https://github.com/Jcamaran/Ring-Facial-Recognition",
      demo: "https://jcamaran.github.io/joaquin-portfolio/"
    },
    {
      id: 4,
      title: "Ring Facial Recognition",
      description: "A facial recognition system using Python and OpenCV to identify individuals in real-time video streams from Ring cameras and unlock doors automatically.",
      image: "/ring.png",
      tech: ["Python", "OpenCV", "Machine Learning", "SQLite", "SeamAPI", "Numpy"],
      github: "https://github.com",
    },
    
    {     
      id: 5,
      title: "Success Predictability Using ML",
      description: "Developed an XGBoost model to predict weightlifting competition success with up to 89% accuracy, trained on 14,000+ athletes across 12 years including 2024 Olympic data. The model helps coaches optimize load-selection strategies by analyzing athlete demographics, weight class, and historical performance.",
      image: "/weightlifting.png",
      tech: ["Python", "XGBoost", "Pandas", "Scikit-learn", "Matplotlib", "R Programming","Numpy"],
      website:"https://dl.acm.org/doi/10.1007/978-3-031-96997-3_12"
    }
  
  
  ];

  return (
    <div className="h-full font-sans flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-0">
      <MemoizedParticles />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-10">
        <section className="pt-4 md:pt-12 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
            My Projects
          </h1>
          <p className="text-xs sm:text-sm md:text-sm lg:text-lg text-gray-300 mb-6 md:mb-10 w-full">
            Here are some of my recent projects & paper contrib that showcase my skills and experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                website={project.website}
              
                index={index}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
