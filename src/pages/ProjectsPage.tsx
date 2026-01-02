import ParticlesBackground from "@/components/ParticlesBackground";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application with payment integration, user authentication, and admin dashboard.",
      image: "/project1.jpg",
      tech: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Real-time task management tool with drag-and-drop functionality and team collaboration features.",
      image: "/project2.jpg",
      tech: ["React", "Node.js", "Socket.io", "PostgreSQL"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Interactive weather application with forecasts, maps, and weather alerts using multiple APIs.",
      image: "/project3.jpg",
      tech: ["React", "OpenWeather API", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "Analytics dashboard for social media metrics with data visualization and export capabilities.",
      image: "/project4.jpg",
      tech: ["Next.js", "Chart.js", "Python", "FastAPI"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 5,
      title: "Portfolio Builder",
      description: "Drag-and-drop portfolio website builder with customizable templates and hosting integration.",
      image: "/project5.jpg",
      tech: ["React", "TypeScript", "Firebase", "Vercel"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "Mobile-responsive fitness tracking app with workout plans, progress charts, and calorie counter.",
      image: "/project6.jpg",
      tech: ["Next.js", "MongoDB", "Chart.js", "JWT"],
      github: "https://github.com",
      demo: "https://demo.com"
    }
  ];

  return (
    <div className="min-h-screen font-sans">
      <ParticlesBackground />

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <section className="pt-16">
          <h1 className="text-5xl font-bold text-blue-400 mb-4">My Projects</h1>
          <p className="text-xl text-gray-300 mb-16">
            Here are some of my recent projects that showcase my skills and experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-blue-400 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Project Image */}
                <div className="relative w-full h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                  <div className="absolute inset-0 flex items-center justify-center text-white/30 text-6xl font-bold">
                    {project.id}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex-1 text-center py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
                    >
                      GitHub
                    </Link>
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="flex-1 text-center py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                    >
                      Live Demo
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
