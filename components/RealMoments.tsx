import React, { useState, useEffect } from 'react';

const moments = [
  {
    image: "https://www.dropbox.com/scl/fi/podagfdwmeddbvw1lmicw/Ski-Selfie.jpg?rlkey=r0doxbdqxkbkj3bchn4dbavob&st=giwzymz7&raw=1",
    title: "Chamonix ski trip, 2018"
  },
  {
    image: "https://www.dropbox.com/scl/fi/51m2nbt2efl5dzp5w1i0d/woman-eating-croissant-paris.jpg?rlkey=guobyd4z8zngafol8at9me2vl&st=wg6n96dg&raw=1",
    title: "Picnic in Paris, 2012"
   
  },
  {
    image: "https://www.dropbox.com/scl/fi/vffjc41nx1ssn4peuusta/openart-image_1Y7qiXcR_1763389294755_raw.jpg?rlkey=bbgutp3w8gkvpt6mgs2sgv8a9&st=ict93da6&raw=1",
    title: "Trip to London, with my Fiance, 2020"
  },
  {
    image: "https://www.dropbox.com/scl/fi/xzh17j6tu9x322slv49fu/Mother-measuring-height.jpg?rlkey=trv0x69vvupl9z3a1d4hx3jnz&st=4esyddfm&raw=1",
    title: "First day of High School, 2008"
  }
];

const RealMoments: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % moments.length);
    }, 4000); // Rotate every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="examples" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative blurred blob - lighter and subtler */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text */}
          {/* Removed 'order' classes so it naturally appears first on mobile and left on desktop */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-5xl md:text-7xl font-serif text-slate-900 tracking-tight leading-[1.1]">
                <span className="block">Real people</span>
                <span className="block">Real places</span>
                <span className="block text-slate-500 italic font-serif">Real moments</span>
              </h2>
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-md">
              We don't just generate images; we reconstruct feelings. Using advanced memory-mapping technology, we bring the details you thought were lost back to life.
            </p>
          </div>

          {/* Right Column: Image Carousel */}
          <div className="relative group">
            {/* Soft shadow instead of glow */}
            <div className="absolute -inset-4 bg-slate-200/50 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Aspect Ratio updated to 5:4 (Landscape-ish) */}
            <div className="relative rounded-[2rem] overflow-hidden aspect-[5/4] shadow-2xl shadow-slate-200 border border-slate-100 bg-slate-50">
              
              {/* Carousel Images */}
              {moments.map((moment, index) => (
                <img 
                  key={index}
                  src={moment.image} 
                  alt={moment.title} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              
              {/* Overlay Card - Text updates with image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-white/50 p-4 rounded-xl shadow-lg transition-all duration-300">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 text-xs font-bold border border-slate-200 shrink-0">
                      AI
                    </div>
                    <div className="overflow-hidden">
                      <div className="transition-transform duration-500" style={{ transform: `translateY(-${currentIndex * 0}%)` }}> 
                        {/* We use a simple key-based re-render for the text animation or just let it switch naturally */}
                        <p className="text-sm font-semibold text-slate-900 animate-in fade-in slide-in-from-bottom-2 duration-500" key={`title-${currentIndex}`}>
                          "{moments[currentIndex].title}"
                        </p>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Carousel Indicators */}
              <div className="absolute top-6 right-6 flex gap-1.5">
                {moments.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RealMoments;