import React, { useState, useEffect } from 'react';
import { Heart, ExternalLink, Activity } from 'lucide-react';

// ----------------------------------------------------------------------
// CAROUSEL IMAGES
// ----------------------------------------------------------------------
// Add your Dropbox links (ending in raw=1) or other image URLs here.
// ----------------------------------------------------------------------
const missionImages = [
  "https://www.dropbox.com/scl/fi/hx2qed3aruee25f7w389j/replicate-prediction-1ddtab4m49rmc0ct29vbwp0cxm.png?rlkey=b67moohpsi9d3sfnxa2o05cwb&st=61myg3px&raw=1",
  "https://www.dropbox.com/scl/fi/dmc4fmfjne8jsezrzevzn/replicate-prediction-5ash4vwj7xrme0ct29raf0xnm8.png?rlkey=c9p7udhobqokzut7nh4njaxcn&st=73s3s9sj&raw=1", // Placeholder 2
  "https://www.dropbox.com/scl/fi/44f136c97j92so6q8ompm/replicate-prediction-w7rex8z9x5rma0ct29srxpgmhc.png?rlkey=nw0ocs5up6oxp7s6i8wd72aw9&st=7my8voe5&raw=1"  // Placeholder 3
];

const Mission: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % missionImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="mission" className="py-24 bg-white relative overflow-hidden border-t border-slate-50">
       {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side - Carousel */}
            <div className="relative order-2 lg:order-1">
                 <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 aspect-[4/5] group bg-slate-100">
                    
                    {/* Carousel Images */}
                    {missionImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Mission carousel image ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10"></div>
                    
                    <div className="absolute bottom-8 left-8 right-8 text-white z-20">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-white/90">Solim Health</span>
                        </div>
                        <p className="font-serif text-2xl leading-snug">
                            "Preserving the past to heal the future."
                        </p>
                    </div>
                 </div>
                 
                 {/* Decor elements */}
                 <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
                 <div className="absolute -top-8 -right-8 w-64 h-64 bg-amber-50/50 rounded-full blur-3xl -z-10"></div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2 space-y-8">
                <div>
                     <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">Our Purpose</span>
                     <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                        Your memories power a larger mission.
                     </h2>
                </div>

                <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
                    <p>
                        At Solim, we believe the memory is where our soul resides. It is what makes us who we are. That’s why every memory you create helps fund our broader mission: advancing innovative dementia therapies and improving the lives of families affected by memory loss.
                    </p>
                    <p>
                        A portion of our profits directly supports <span className="font-semibold text-slate-800">Solim Health</span>, our clinical therapy and telehealth solutions for memory loss.
                    </p>
                </div>

                <div className="bg-slate-50 border-l-4 border-slate-900 p-8 rounded-r-2xl shadow-sm">
                    <div className="flex gap-4">
                        <Heart className="w-6 h-6 text-slate-900 fill-slate-900 flex-shrink-0 mt-1" />
                        <p className="text-xl font-serif text-slate-800 italic">
                            "Your purchase isn’t just a memory. It’s a contribution to a world where every family has the chance to preserve what matters most."
                        </p>
                    </div>
                </div>

                <div className="pt-4">
                    <a
                        href="https://www.solimhealth.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                    >
                        Learn more about Solim Health
                        <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;