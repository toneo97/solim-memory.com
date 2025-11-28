import React from 'react';

// ----------------------------------------------------------------------
// IMAGE LINKS CONFIGURATION
// ----------------------------------------------------------------------
// Paste your direct image links inside the quotes below.
// You can use Dropbox (change dl=0 to raw=1), OneDrive, or any URL.
// ----------------------------------------------------------------------

const stepImages = {
  step1: "/assets/voice-assistant.png", // Voice Assistant / Siri Image
  step2: "/assets/photos-icon.png",    // Photos / Gallery Image
  step3: "/assets/fast-delivery.png"   // Delivery Truck Image
};

// ----------------------------------------------------------------------

const steps = [
  {
    image: "https://www.dropbox.com/scl/fi/xhn72fv5zbzmnrlrtp4cv/Untitled-design-24.png?rlkey=1n09ajcu8rlog96oxfnhwn8hf&st=jhilvjuz&raw=1",
    title: "Step 1: Answer some questions",
    description: "Our voice agent asks you simple questions. Answer naturally by speech or text."
  },
  {
    image: "https://www.dropbox.com/scl/fi/cc2251ef623vzqfmn83k6/Untitled-design-25.png?rlkey=kn36fc9iq230qd6zl1egupuqj&st=beydoo8w&raw=1",
    title: "Step 2: Memory rebuild",
    description: "Each memory pack includes 4 high-quality images and 2 dynamic video scenes from your memory."
  },
  {
    image: "https://www.dropbox.com/scl/fi/axpdccpxvxyw0pkefg8f0/Untitled-design-23.png?rlkey=sl3itsumcl075guaa5af4dq06&st=c9ym6xdb&raw=1",
    title: "Step 3: 1–3 day delivery",
    description: "You’ll receive a private link to your memory pack. Delivery takes 1–3 working days."
  }
];

const HowItWorks: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback styling if image fails to load
    e.currentTarget.style.display = 'none';
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.classList.add('bg-slate-100', 'rounded-full');
      parent.innerHTML = '<span class="text-xs text-slate-400">Image</span>';
    }
  };

  return (
    <section id="how-it-works" className="py-32 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <span className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-4 block">Process</span>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900">How does memory <span className="italic text-slate-600">reLIV</span> work?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) - Adjusted top to match new image center */}
          <div className="hidden md:block absolute top-[6rem] left-[16%] right-[16%] h-px bg-slate-200 z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative group z-10">
              <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 h-full flex flex-col items-center text-center">
                
                {/* Image Container - Increased size to h-32 w-32 (approx 30% larger than h-24 w-24) */}
                <div className="h-32 w-32 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative bg-white rounded-full p-2">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="h-full w-full object-contain drop-shadow-sm"
                    onError={handleImageError}
                  />
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;