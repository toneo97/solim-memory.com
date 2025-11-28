import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';

const heroImages = [
  "https://www.dropbox.com/scl/fi/12g8ui815lnf5xfhxjyft/Girl-field-moonlight.jpg?rlkey=qfu6efpf47gr8un3dohpebakb&st=jn9eh3hm&raw=1", 
  "https://www.dropbox.com/scl/fi/mrnwnq10hbjj7pf72gaww/Fun-Candid-Family-Photos.jpg?rlkey=de4wmb6hygi0758z4v2xspkgy&st=z8e8acft&raw=1", 
  "https://www.dropbox.com/scl/fi/ej1weqddsm09m3eih0i16/Beach-family-running-copy.jpg?rlkey=9u3y4wj1ak3q1yxm40xxpywsf&st=wwo459r7&raw=1",
  "https://www.dropbox.com/scl/fi/4ih1mvjix8wseixnb0jlj/Woman-field.jpg?rlkey=zog3o0z86pf65sufl8jio7yfj&st=73r7pjr6&raw=1"
];

interface HeroProps {
  onGetStarted?: (email: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (!target.src.includes('picsum.photos')) {
      console.warn(`Image failed to load: ${target.src}`);
      target.onerror = null; 
      target.src = `https://picsum.photos/1920/1080?random=${Date.now()}`;
    }
  };

  const handleStartClick = () => {
    // We allow the user to proceed even without email, as the wizard Step 1 collects it.
    // If they entered an invalid email format, we warn them, but if it's empty, we just go.
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    
    if (onGetStarted) {
      onGetStarted(email);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  return (
    <section id="hero" className="relative w-full flex flex-col md:block min-h-screen md:min-h-[700px] md:aspect-video bg-slate-50 md:bg-slate-900 overflow-hidden">
      
      <div className="relative w-full h-[60vh] md:absolute md:inset-0 md:h-full z-0 overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Reconstructed memory scene ${index + 1}`} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        ))}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full md:absolute md:bottom-12 md:left-12 md:w-auto">
        <div className="
          bg-white 
          md:bg-white/70 md:backdrop-blur-xl md:border md:border-white/40 
          p-8 md:p-10 
          rounded-t-[2.5rem] md:rounded-[2.5rem] 
          -mt-8 md:mt-0 
          shadow-none md:shadow-2xl 
          md:max-w-xl lg:max-w-2xl
          text-left
          ring-0 md:ring-1 md:ring-white/50
        ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 mb-6 leading-tight tracking-tight">
            Rebuild your precious <br/>
            <span className="italic text-slate-700">memories</span> in 5 minutes
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 font-light leading-relaxed max-w-lg">
            Describe a memory, and our AI rebuilds it into high-quality photos and dynamic videos.
          </p>

          <div className="relative flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex-1 relative">
              <input 
                type="email" 
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email" 
                className={`w-full h-full px-6 py-4 rounded-full bg-slate-50 md:bg-white/80 border text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white transition-all shadow-sm ${emailError ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-slate-400'}`}
              />
              {emailError && (
                <div className="absolute -bottom-6 left-6 text-xs text-red-500 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-3 h-3" /> {emailError}
                </div>
              )}
            </div>
            <button 
              onClick={handleStartClick}
              className="px-8 py-4 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-slate-900/10 whitespace-nowrap"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-start gap-2 text-sm text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Join 10,000+ families preserving their legacy
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;