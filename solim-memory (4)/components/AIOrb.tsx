import React, { useEffect, useState, useRef } from 'react';
import { Brain } from 'lucide-react';

interface AIOrbProps {
  textToSpeak?: string;
  autoPlay?: boolean;
  idle?: boolean;
}

const AIOrb: React.FC<AIOrbProps> = ({ textToSpeak, autoPlay = true, idle = false }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (synthRef.current && textToSpeak && autoPlay) {
      // Small delay to ensure component is mounted and ready
      const timeout = setTimeout(() => speak(textToSpeak), 600);
      return () => clearTimeout(timeout);
    }
  }, [textToSpeak]);

  const speak = (text: string) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English')) || voices.find(v => v.lang === 'en-US');
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.rate = 1.0; 
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const handleOrbClick = () => {
    if (textToSpeak) {
      if (isSpeaking) {
        synthRef.current?.cancel();
        setIsSpeaking(false);
      } else {
        speak(textToSpeak);
      }
    }
  };

  return (
    <div className="relative flex justify-center items-center py-2 cursor-pointer group z-50" onClick={handleOrbClick}>
      {/* Speaking Pulse */}
      <div 
        className={`absolute w-20 h-20 rounded-full bg-blue-500/20 blur-xl transition-all duration-300 ease-in-out ${
          isSpeaking ? 'scale-125 opacity-100 animate-pulse' : 'scale-100 opacity-0'
        }`}
      ></div>
      
      {/* Idle Glow (New) */}
      <div 
        className={`absolute w-20 h-20 rounded-full bg-blue-400/10 blur-xl transition-all duration-1000 ease-in-out ${
          !isSpeaking && idle ? 'scale-110 opacity-100 animate-pulse' : 'opacity-0'
        }`}
      ></div>

      <div 
        className={`absolute w-16 h-16 rounded-full border border-blue-400/30 transition-all duration-1000 ${
          isSpeaking ? 'animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50' : 'opacity-0'
        }`}
      ></div>
      <div 
        className={`relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-lg border border-white/60 flex items-center justify-center overflow-hidden transition-transform duration-300 ${
          isSpeaking ? 'scale-110 shadow-blue-400/40' : 'group-hover:scale-105'
        }`}
      >
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent transition-opacity duration-300 ${
            isSpeaking ? 'opacity-100' : 'opacity-20'
          }`}
        ></div>
        <div className="relative w-full h-full flex items-center justify-center">
             <Brain 
              className={`w-7 h-7 transition-colors duration-300 ${
                isSpeaking ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-400'
              }`} 
              strokeWidth={1.5}
            />
        </div>
      </div>
    </div>
  );
};

export default AIOrb;