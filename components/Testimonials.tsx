import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "I sent in a torn, blurry photo of my grandparents from the 60s. Solim didn't just fix it; they completely restored it. My mom cried when she saw it.",
    author: "Elena R.",
    role: "Restored old photo",
    image: "https://picsum.photos/seed/elena/150/150"
  },
  {
    quote: "Seeing my late husband turn and smile in the video scene... I can't explain the feeling. It's not just a photo; it brought the memory back to life.",
    author: "Martha S.",
    role: "Brought photo to life",
    image: "https://picsum.photos/seed/martha/150/150"
  },
  {
    quote: "I forgot my anniversary was coming up! The $2.99 priority next-day delivery saved me. I got the memory pack in less than 24 hours.",
    author: "James P.",
    role: "Priority Delivery",
    image: "https://picsum.photos/seed/james/150/150"
  },
  {
    quote: "Honestly, for the emotional value this provides, the price is amazing. Getting 4 photos and 2 videos for this cost is a steal.",
    author: "David K.",
    role: "Value for pricing",
    image: "https://picsum.photos/seed/david/150/150"
  },
  {
    quote: "I chose the standard delivery and still got my memory pack in just 3 days. Super fast service and the quality was worth the wait.",
    author: "Sarah L.",
    role: "Standard Delivery",
    image: "https://picsum.photos/seed/sarah/150/150"
  },
  {
    quote: "The subtle movements in the video scenes are so natural. It doesn't look like AI, it looks like I'm stepping back into that summer day in 1998.",
    author: "Jennifer C.",
    role: "Realistic Video",
    image: "https://picsum.photos/seed/jennifer/150/150"
  },
  {
    quote: "My dad's childhood home was demolished years ago. I described it to the voice agent, and Solim rebuilt it perfectly. He recognized the porch instantly.",
    author: "Michael T.",
    role: "Memory Reconstruction",
    image: "https://picsum.photos/seed/michael/150/150"
  },
  {
    quote: "I've tried other tools, but the resolution here is crystal clear. I printed the result on a large canvas and it looks like a high-end art piece.",
    author: "Robert B.",
    role: "High Quality",
    image: "https://picsum.photos/seed/robert/150/150"
  },
  {
    quote: "Seamless process. The questions were easy to answer, and the support team helped me pick the right package. Highly recommended.",
    author: "Emily W.",
    role: "Great Service",
    image: "https://picsum.photos/seed/emily/150/150"
  }
];

const Testimonials: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Adjust items to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get the visible items based on current start index
  // We use a helper to wrap around the array seamlessly
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (startIndex + i) % testimonials.length;
      items.push(testimonials[index]);
    }
    return items;
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-6">What families are saying</h2>
          
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-lg font-medium text-slate-800">
              4.7/5 Average Rating <span className="text-slate-400 font-normal mx-2">|</span> <span className="text-slate-500">Based on 300+ reviews</span>
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative px-4 md:px-12">
          
          {/* Previous Button */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border border-slate-200 shadow-lg text-slate-700 hover:bg-slate-50 hover:scale-110 transition-all hidden md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Cards Grid */}
          <div className={`grid gap-8 grid-cols-1 ${itemsToShow === 2 ? 'grid-cols-2' : ''} ${itemsToShow === 3 ? 'grid-cols-3' : ''}`}>
            {getVisibleTestimonials().map((item, index) => (
              <div 
                key={`${startIndex}-${index}`} // Key changes to force re-render animation
                className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] relative hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full animate-in fade-in slide-in-from-right-4"
              >
                {/* 5 Stars */}
                <div className="flex gap-0.5 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <Quote className="absolute top-8 right-8 text-slate-200 w-8 h-8" />
                
                {/* Content */}
                <div className="flex-grow">
                  <p className="text-slate-600 leading-relaxed font-light text-lg mb-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                  <img 
                    src={item.image} 
                    alt={item.author} 
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <span className="block font-semibold text-slate-900">{item.author}</span>
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border border-slate-200 shadow-lg text-slate-700 hover:bg-slate-50 hover:scale-110 transition-all hidden md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Mobile Navigation Dots */}
          <div className="flex md:hidden justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === startIndex ? 'w-6 bg-slate-800' : 'w-2 bg-slate-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;