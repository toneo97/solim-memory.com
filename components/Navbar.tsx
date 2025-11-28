import React, { useState, useEffect } from 'react';
import { Menu, X, Brain } from 'lucide-react';

const logoAssets = {
  dark: "https://www.dropbox.com/scl/fi/yruygvw5vv4p8c1ppk2os/Solim-brain-logo-1.png?rlkey=wfs4c7hjrhisjetsf0nq8gnig&st=uppd1ooo&raw=1"    
};

interface NavbarProps {
  onGetStarted?: () => void;
  onPricingClick?: () => void;
  onLoginClick?: () => void;
  onNavigate?: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGetStarted, onPricingClick, onLoginClick, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const textColorClass = 'text-slate-900';
  const buttonClass = 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg';
  const ghostButtonClass = 'bg-transparent border border-slate-900 text-slate-900 hover:bg-slate-50';
  const currentLogoSrc = logoAssets.dark;

  useEffect(() => {
    setLogoError(false);
  }, [currentLogoSrc]);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      // Fallback for direct scrolling if onNavigate isn't provided
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
     if (onNavigate) {
       onNavigate('top');
     } else {
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }
  };

  return (
    <nav
      className="fixed w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm h-24 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center h-full relative">
        
        {/* Logo - Scrolls to top */}
        <div className="relative h-full flex items-center group cursor-pointer" onClick={handleLogoClick}>
          <div className="w-56 md:w-80 h-full flex-shrink-0"></div>

          <div className="absolute top-1/2 left-0 flex items-center h-32 -translate-y-1/2">
            {!logoError ? (
              <img 
                src={currentLogoSrc} 
                alt="Solim Logo" 
                className="h-full w-auto object-contain transition-opacity duration-300 drop-shadow-sm" 
                onError={() => setLogoError(true)} 
              />
            ) : (
              <div className={`flex items-center gap-1 ${textColorClass} mt-4`}>
                <span className="text-6xl font-sans font-medium tracking-tight">s</span>
                <div className="relative flex items-center justify-center w-20 h-20 mx-0.5">
                   <Brain className="w-full h-full" strokeWidth={2} />
                </div>
                <span className="text-6xl font-sans font-medium tracking-tight">lim</span>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleNavClick('how-it-works')} className={`text-sm font-medium transition-colors ${textColorClass} hover:opacity-70`}>How it works</button>
          <button onClick={onPricingClick} className={`text-sm font-medium transition-colors ${textColorClass} hover:opacity-70`}>Pricing</button>
          <button onClick={() => handleNavClick('testimonials')} className={`text-sm font-medium transition-colors ${textColorClass} hover:opacity-70`}>Testimonials</button>
          
          {/* Divider */}
          <div className="h-4 w-px bg-slate-200 mx-2"></div>

          <button 
            onClick={onLoginClick} 
            className={`${ghostButtonClass} px-6 py-2.5 rounded-full text-sm font-medium transition-all`}
          >
            Login
          </button>
          <button 
            onClick={onGetStarted}
            className={`${buttonClass} px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105`}
          >
            Get Started
          </button>
        </div>

        <button 
          className="md:hidden text-slate-900" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-5">
          <div className="h-6"></div> 
          <button onClick={() => handleNavClick('how-it-works')} className="text-lg text-slate-800 font-medium text-left">How it works</button>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (onPricingClick) onPricingClick();
            }} 
            className="text-lg text-slate-800 font-medium text-left"
          >
            Pricing
          </button>
          <button onClick={() => handleNavClick('testimonials')} className="text-lg text-slate-800 font-medium text-left">Testimonials</button>
          <button onClick={() => handleNavClick('contact')} className="text-lg text-slate-800 font-medium text-left">Contact</button>
          
          <div className="h-px bg-slate-100 w-full my-2"></div>
          
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (onLoginClick) onLoginClick();
            }} 
            className="text-lg text-slate-800 font-medium text-left border border-slate-200 rounded-lg py-2 px-4"
          >
            Login
          </button>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (onGetStarted) onGetStarted();
            }}
            className="bg-slate-900 text-white w-full py-3 rounded-lg font-medium shadow-lg shadow-slate-200"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;