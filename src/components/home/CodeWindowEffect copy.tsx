"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import figlet from 'figlet';
import { loadFontData } from '@/utils/fontLoader';

interface CodeWindowEffectProps {
  name: string;
  role: string;
  university: string;
  className?: string;
  speed?: number;
  font?: string; // Allow custom font selection
}

export default function CodeWindowEffect(props: CodeWindowEffectProps) {
  const [asciiTexts, setAsciiTexts] = useState<string[]>([]);
  const [displayedTexts, setDisplayedTexts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [commandLine, setCommandLine] = useState("");
  const [showCommand, setShowCommand] = useState(false);
  const [instructionText, setInstructionText] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [showInputPrompt, setShowInputPrompt] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const fontName = props.font || '3d';
  const speed = props.speed || 20; // milliseconds per character
  const commandSpeed = 50; // Speed for typing commands
  
  // Colored prompt component like real terminal
  const PromptComponent = () => (
    <>
      <span className="text-green-400">visitor</span>
      <span className="text-gray-400">@</span>
      <span className="text-cyan-400">joaquins-portfolio</span>
      <span className="text-white">:</span>
      <span className="text-blue-400">~</span>
      <span className="text-white">$</span>
    </>
  );
  const command = " jos-init --verbose";
  const instruction1 = "Type 'info' to learn go to the about me page.";
  const instruction2 = "Type 'xp' to see experience.";
  const instruction3 = "Type 'projects' to get in touch.";
  const or = "Or just use the nav bar if you are feeling too lazy to type :)";
  const fullText = "" + instruction1 + "\n" + instruction2 + "\n" + instruction3 + "\n" + or;

  // Check if terminal has been loaded before
  useEffect(() => {  
    const hasLoaded = sessionStorage.getItem('terminalLoaded');
    const cachedFont = sessionStorage.getItem('terminalFont');
    
    // Only use cached version if the font matches
    if (hasLoaded === 'true' && cachedFont === fontName) {
      // Skip all animations and show final state
      const loadedAscii = sessionStorage.getItem('terminalAscii');
      if (loadedAscii) {
        const texts = [loadedAscii];
        setAsciiTexts(texts);
        setDisplayedTexts(texts);
      }
      setCommandLine(command);
      setInstructionText(fullText);
      setIsLoading(false);
      setShowCommand(true);
      setIsTyping(false);
      setShowInstructions(true);
      setShowInputPrompt(true);
    }
  }, [command, fullText, fontName]);

  // Helper function to load and set ASCII texts
  const finishLoading = useCallback((texts: string[]) => {
    setAsciiTexts(texts);
    setIsLoading(false);
    setShowCommand(true);
    // Store ASCII art and font for future use
    if (texts[0]) {
      sessionStorage.setItem('terminalAscii', texts[0]);
      sessionStorage.setItem('terminalFont', fontName);
    }
  }, [fontName]);

  useEffect(() => {
    // Only run on client-side to avoid SSR fetch issues on Vercel
    if (typeof window === 'undefined') return;
    
    // Skip if already loaded from sessionStorage with the same font
    const cachedFont = sessionStorage.getItem('terminalFont');
    if (sessionStorage.getItem('terminalLoaded') === 'true' && cachedFont === fontName) {
      return;
    }
    
    console.log('Loading font:', fontName);
    
    // Use Standard font directly if it's the default
    if (fontName === 'Standard') {
      const texts: string[] = [];
      
      figlet.text("Welcome To Joaquin's Portfolio", {
        font: 'Standard',
        horizontalLayout: 'default',
      }, (err, data) => {
        if (data) texts.push(data);
        finishLoading(texts);
      });
      return;
    }
    
    // Load font using the utility (works reliably on Vercel)
    loadFontData(fontName)
      .then(fontData => {
        figlet.parseFont(fontName, fontData);
        const texts: string[] = [];
        
        figlet.text("Welcome To Joaquin's Portfolio", {
          font: fontName,
          horizontalLayout: 'default',
        }, (err, data) => {
          console.log('Figlet result:', err, data?.substring(0, 50));
          if (err) {
            console.error('Figlet error:', err);
            fallbackToStandard();
          } else if (data) {
            texts.push(data);
            finishLoading(texts);
          }
        });
      })
      .catch(err => {
        console.error('Font loading error:', err);
        fallbackToStandard();
      });
    
    function fallbackToStandard() {
      const texts: string[] = [];
      
      figlet.text("Welcome To Joaquin's Portfolio", {
        font: 'Standard',
        horizontalLayout: 'default',
      }, (err, data) => {
        if (data) texts.push(data);
        finishLoading(texts);
        
        figlet.text("Joaquín Camaran", {
          font: 'Standard',
          horizontalLayout: 'default',
        }, (err2, data2) => {
          if (data2) texts.push(data2);
          finishLoading(texts);
        });
      });
    }
  }, [fontName, finishLoading]);

  // Type the command
  useEffect(() => {
    if (!showCommand) return;
    // Skip animation if already loaded
    if (sessionStorage.getItem('terminalLoaded') === 'true') return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index <= command.length) {
        setCommandLine(command.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(true);
      }
    }, commandSpeed);
    
    return () => clearInterval(interval);
  }, [showCommand, command, commandSpeed]);

  // Typewriter effect - reveal characters one by one for each text
  useEffect(() => {
    if (!asciiTexts.length || !isTyping) return;
    // Skip animation if already loaded
    if (sessionStorage.getItem('terminalLoaded') === 'true') return;
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    const chunkSize = 10;
    let interval: NodeJS.Timeout;
    const displayed: string[] = new Array(asciiTexts.length).fill("");
    
    const typeText = () => {
      const currentText = asciiTexts[currentTextIndex];
      
      if (currentCharIndex < currentText.length) {
        currentCharIndex = Math.min(currentCharIndex + chunkSize, currentText.length);
        displayed[currentTextIndex] = currentText.substring(0, currentCharIndex);
        setDisplayedTexts([...displayed]);
      } else {
        // Move to next text
        currentTextIndex++;
        currentCharIndex = 0;
        
        if (currentTextIndex >= asciiTexts.length) {
          setIsTyping(false);
          setShowInstructions(true);
          clearInterval(interval);
        }
      }
    };
    
    // Schedule first update asynchronously
    const timeoutId = setTimeout(() => {
      typeText();
      interval = setInterval(typeText, speed);
    }, 0);
    
    return () => {
      clearTimeout(timeoutId);
      if (interval) clearInterval(interval);
    };
  }, [asciiTexts, speed, isTyping]);

  // Instructions typing effect
  useEffect(() => {
    if (!showInstructions) return;
    // Skip animation if already loaded
    if (sessionStorage.getItem('terminalLoaded') === 'true') return;
    
    let index = 0;
    
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setInstructionText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
        setShowInputPrompt(true);
      }
    }, 1); // typing speed
    
    return () => clearInterval(interval);
  }, [showInstructions, fullText]);

  // Focus input when it appears and mark as loaded
  useEffect(() => {
    if (showInputPrompt) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      // Save that terminal has fully loaded
      sessionStorage.setItem('terminalLoaded', 'true');
    }
  }, [showInputPrompt]);

  // Track window size
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setWindowSize({ 
          width: Math.round(rect.width), 
          height: Math.round(rect.height) 
        });
      }
    };

    // Initial size
    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Handle input submit
  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = userInput.toLowerCase().trim();
      
      switch(input) {
        case 'info':
        case 'about':
          router.push('/about');
          break;
        case 'projects':
        case 'project':
          router.push('/projects');
          break;
        case 'xp':
        case 'experience':
          router.push('/xp');
          break;
        case 'contact':
          // Add contact routing if you have a contact page
          alert('Contact page coming soon!');
          break;
        case 'help':
          alert('Available commands: info, projects, xp, contact');
          break;
        default:
          alert(`Command not found: ${userInput}`);
      }
      setUserInput('');
    }
  };

  // Render the code window with ASCII art
  return (
    <div ref={containerRef} className={`rounded-2xl overflow-hidden backdrop-blur-sm bg-linear-to-br from-teal-500/10 via-purple-500/10 to-pink-500/10 border border-white/20 shadow-2xl shadow-purple-500/20 w-full h-full flex flex-col`}>
      {/* Terminal Header */}
      <div className="bg-gray-900/50 px-2 py-1.5 sm:py-2 flex items-center justify-center gap-1 sm:gap-2 border-b w-full border-white/10">
        {/* <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div> */}
       
        
        <span className="text-gray-400 w-full text-[10px] sm:text-xs md:text-sm ml-2 sm:ml-4 font-mono flex items-center justify-center gap-1 sm:gap-2">
           <Image
          src={"/mac_folder.png"}
          width={20}
          height={12}
          alt="folder icon"
          className="opacity-80 w-3 h-2 sm:w-4 sm:h-3 md:w-5 md:h-3"
        />Joaquin -- bash -- {windowSize.width} × {windowSize.height}</span>
      </div>
        
      {/* Code Content */}
      <div className="p-4 max-h-60 sm:min-h-80 sm:max-h-25 font-mono text-xs sm:text-sm md:text-base overflow-x-auto flex-1 bg-black/20 h-full">
        {isLoading && (
          <div className="text-sm">
            <PromptComponent />
            <span className="animate-pulse">_</span>
          </div>
        )}
        {!isLoading && (
          <div className="flex flex-col h-full">
            <div className="flex-[1_0_10px] space-y-4">
              {/* Command line */}
              {showCommand && (
                <div className="text-amber-400">
                  <span className="text-xs sm:text-sm"><PromptComponent /></span>
                  <span className="text-xs sm:text-sm">{commandLine}</span>
                  {commandLine.length < command.length && <span className="animate-pulse">_</span>}
                </div>
              )}
              
              {/* ASCII output */}
              <div className="w-full overflow-hidden">
                <pre className="text-emerald-400 px-0 leading-tight transition-all ease-in-out duration-100 text-[3px] sm:text-[6px] md:text-[7px] lg:text-[8px] origin-top-left" style={{ transform: 'scale(0.8)' }}>
                  {displayedTexts[0]}
                </pre>
              </div>
              
             {/* Instructions that appear after ASCII */}
              {showInstructions && (
                <div className="text-white  mt-4 flex flex-col whitespace-pre-wrap text-xs sm:text-sm">
                  {instructionText}
                  {instructionText.length < fullText.length}
                </div>
              )}
              
              {/* Interactive input prompt */}
              {showInputPrompt && (
                <div className="text-amber-400 mt-2 text-xs sm:text-sm flex items-center">
                  <span><PromptComponent /></span>
                  <input
                    autoFocus 
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleInputSubmit}
                    className="bg-transparent border-none outline-none text-amber-400 ml-1 flex-1 caret-white"
                    placeholder=""
                    autoComplete="off"
                  />
                  
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
