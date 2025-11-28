import React, { useState } from 'react';
import { Instagram, Twitter, Facebook, Brain } from 'lucide-react';

interface FooterProps {
  onPricingClick?: () => void;
  onNavigate?: (sectionId: string) => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPricingClick, onNavigate, onTermsClick, onPrivacyClick }) => {
  const [logoError, setLogoError] = useState(false);
  const logoSrc = "https://www.dropbox.com/scl/fi/yruygvw5vv4p8c1ppk2os/Solim-brain-logo-1.png?rlkey=wfs4c7hjrhisjetsf0nq8gnig&st=uppd1ooo&raw=1";

  const handleNavClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
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
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            {/* Logo Section */}
            <div className="flex items-center mb-8 cursor-pointer" onClick={handleLogoClick}>
              {!logoError ? (
                <img 
                  src={logoSrc} 
                  alt="Solim Logo" 
                  className="h-24 w-auto object-contain"
                  onError={() => setLogoError(true)} 
                />
              ) : (
                /* Fallback Text Logo */
                <div className="flex items-center gap-1 text-slate-900">
                  <span className="text-5xl font-sans font-medium tracking-tight">s</span>
                  <div className="relative flex items-center justify-center w-12 h-12 mx-0.5">
                      <Brain className="w-full h-full" strokeWidth={2} />
                  </div>
                  <span className="text-5xl font-sans font-medium tracking-tight">lim</span>
                </div>
              )}
             </div>
            
            <p className="text-slate-500 max-w-sm mb-6">
              Rebuilding memories, one story at a time. We use ethical AI to help families reconnect with their past.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><button onClick={() => handleNavClick('how-it-works')} className="text-slate-500 hover:text-slate-900 transition-colors">How it works</button></li>
              <li>
                <button onClick={onPricingClick} className="text-slate-500 hover:text-slate-900 transition-colors text-left">
                  Pricing
                </button>
              </li>
              <li><button onClick={() => handleNavClick('testimonials')} className="text-slate-500 hover:text-slate-900 transition-colors">Testimonials</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><button onClick={() => handleNavClick('contact')} className="text-slate-500 hover:text-slate-900 transition-colors text-left">Contact Us</button></li>
              <li><button onClick={onPrivacyClick} className="text-slate-500 hover:text-slate-900 transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={onTermsClick} className="text-slate-500 hover:text-slate-900 transition-colors text-left">Terms of Service</button></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Solim Memory. All rights reserved.
          </p>
          <a href="mailto:support@solimhealth.com" className="text-slate-400 text-sm hover:text-slate-900 transition-colors">
            support@solimhealth.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;