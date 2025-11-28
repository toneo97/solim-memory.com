import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "What is Solim Memory and how does it work?",
    answer: "Solim Memory is an advanced memory reconstruction service. We use state-of-the-art AI to transform your verbal or written descriptions of past events into high-fidelity photos and dynamic video scenes. Simply describe your memory through our guided questionnaire or voice agent, and we rebuild it visually."
  },
  {
    question: "How long does it take to receive my memory video?",
    answer: "For Standard orders, the processing time is typically 1–3 business days. If you choose the Priority delivery option (included in the Memory Pack), we prioritize your order and often deliver within 24 hours."
  },
  {
    question: "My parent is experiencing memory loss. How does memory therapy work?",
    answer: "Solim Health utilizes Reminiscence Therapy, providing virtual calls with dementia practitioners to walk through core memories. This helps those who may otherwise struggle to recall details and rebuild scenes from their lives, stimulating long-term memories and conversation. This therapy is shown to help improve short-term memory recall, enhance mood, and strengthen communication for those with dementia or memory loss. For more information, please visit www.solimhealth.com."
  },
  {
    question: "Can I edit or update a memory after submitting it?",
    answer: "Once the AI generation process has begun, we cannot alter the initial input. However, if you are unsatisfied with the result, our 'Memory Pack' tier offers a revision round where you can provide feedback to fine-tune specific details of the scene."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500">Everything you need to know about preserving your legacy.</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === index 
                ? 'bg-slate-50 border-blue-100 shadow-sm' 
                : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-semibold text-lg ${openIndex === index ? 'text-slate-900' : 'text-slate-700'}`}>
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-transparent">
                  {item.answer}
                  {index === 2 && (
                    <a href="https://www.solimhealth.com" target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-600 hover:underline text-sm font-medium">
                      Learn more at SolimHealth.com &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;