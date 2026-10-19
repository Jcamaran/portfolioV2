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
    href: "https://www.linkedin.com/in/joaquin-camaran-69b858247/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://docs.google.com/document/d/1L1dAS9MGIaFz49GbANovmaPnUDYTZEW7SF06BNDxCmk/edit?usp=sharing",
    icon: HiDocumentText,
    label: "Resume",
  },
  {
    href: "mailto:joaquin.camaran@example.com",
    icon: MdEmail,
    label: "Email",
  },
];

export default function SocialLinks() {
  return (
    <div className="-mt-3 md:mt-2 lg:tall:mt-3 flex gap-2 md:gap-2 lg:tall:gap-3 md:flex-row flex-wrap max-w-[120px] md:max-w-none">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-night-deep/50 backdrop-blur-sm border border-white/15 rounded-lg p-2 lg:tall:p-3 group w-12 h-10 md:w-12 md:h-9 lg:tall:w-14 lg:tall:h-10 flex items-center justify-center border-b-violet-brand border-b-2 border-r-violet-brand border-r-2 hover:border-b hover:border-r hover:border-lilac/60 hover:translate-x-px hover:translate-y-px transition-all duration-100 relative"
            title={social.label}
          >
            <Icon className="text-white text-lg md:text-xl lg:tall:text-2xl group-hover:text-lilac transition-colors" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-night-deep border border-white/10 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {social.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
