import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi";

const socialLinks = [
  {
    href: "https://github.com/Jcamaran",
    icon: FaGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/joaquincamarena/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "#",
    icon: HiDocumentText,
    label: "Resume",
  },
  {
    href: "#",
    icon: MdEmail,
    label: "Email",
  },
];

export default function SocialLinks() {
  return (
    <div className="mt-3 flex gap-3">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-3 group w-12 h-12 flex items-center justify-center border-b-purple-400 border-b-2 border-r-purple-400 border-r-2 hover:border-b-0 hover:border-r-0 transition-all duration-150 relative"
            title={social.label}
          >
            <Icon className="text-white text-2xl group-hover:text-purple-400 transition-colors" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {social.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
