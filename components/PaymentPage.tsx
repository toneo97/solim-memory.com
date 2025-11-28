import React, { useState, useEffect } from 'react';
import { Check, Shield, Lock, CreditCard, Sparkles, Film, Image as ImageIcon, ArrowLeft, ArrowRight, Star, Clock, Zap, Heart, Award, Eye, EyeOff } from 'lucide-react';

interface PaymentPageProps {
  onReturnHome: () => void;
  hasWizardData: boolean;
  wizardData?: any;
  onStartWizard?: () => void;
}

const logoSrc = "https://www.dropbox.com/scl/fi/yruygvw5vv4p8c1ppk2os/Solim-brain-logo-1.png?rlkey=wfs4c7hjrhisjetsf0nq8gnig&st=uppd1ooo&raw=1";

// Social Proof Data - Filtered to US, London, and Top 3 Canada
const recentPurchases = [
  { name: "Emily", location: "New York, NY", item: "Memory Pack", type: "pack" },
  { name: "Liam", location: "London, UK", item: "Memory Clip", type: "clip" },
  { name: "Noah", location: "Toronto, Canada", item: "Memory Pack", type: "pack" },
  { name: "Olivia", location: "Los Angeles, CA", item: "Memory Pack", type: "pack" },
  { name: "William", location: "Chicago, IL", item: "Memory Pack", type: "pack" },
  { name: "Sophia", location: "Montreal, Canada", item: "Memory Clip", type: "clip" },
  { name: "James", location: "Vancouver, Canada", item: "Memory Pack", type: "pack" },
  { name: "Charlotte", location: "Houston, TX", item: "Memory Clip", type: "clip" },
  { name: "Benjamin", location: "Phoenix, AZ", item: "Memory Pack", type: "pack" },
  { name: "Mia", location: "Philadelphia, PA", item: "Memory Pack", type: "pack" },
  { name: "Mason", location: "London, UK", item: "Memory Pack", type: "pack" },
  { name: "Evelyn", location: "San Antonio, TX", item: "Memory Pack", type: "pack" },
  { name: "Oliver", location: "San Diego, CA", item: "Memory Clip", type: "clip" },
  { name: "Harper", location: "Dallas, TX", item: "Memory Pack", type: "pack" },
  { name: "Lucas", location: "San Jose, CA", item: "Memory Pack", type: "pack" },
  { name: "Amelia", location: "Austin, TX", item: "Memory Pack", type: "pack" },
  { name: "Alexander", location: "London, UK", item: "Memory Clip", type: "clip" },
  { name: "Ava", location: "Seattle, WA", item: "Memory Pack", type: "pack" },
  { name: "Henry", location: "Denver, CO", item: "Memory Pack", type: "pack" },
  { name: "Ella", location: "Boston, MA", item: "Memory Clip", type: "clip" },
  { name: "Michael", location: "Miami, FL", item: "Memory Pack", type: "pack" },
  { name: "Abigail", location: "Atlanta, GA", item: "Memory Pack", type: "pack" },
  { name: "Daniel", location: "San Francisco, CA", item: "Memory Pack", type: "pack" },
  { name: "Elizabeth", location: "London, UK", item: "Memory Pack", type: "pack" },
  { name: "Matthew", location: "New York, NY", item: "Memory Pack", type: "pack" },
  { name: "Sofia", location: "Toronto, Canada", item: "Memory Clip", type: "clip" },
  { name: "Jackson", location: "Nashville, TN", item: "Memory Pack", type: "pack" },
  { name: "Avery", location: "Detroit, MI", item: "Memory Clip", type: "clip" },
  { name: "Scarlett", location: "Las Vegas, NV", item: "Memory Pack", type: "pack" },
  { name: "Jack", location: "London, UK", item: "Memory Pack", type: "pack" }
];

const PaymentPage: React.FC<PaymentPageProps> = ({ onReturnHome, hasWizardData, wizardData, onStartWizard }) => {
  const [selectedPackage, setSelectedPackage] = useState<'clip' | 'pack' | null>(null);
  const [billingCycle, setBillingCycle] = useState<'one-time' | 'monthly'>('one-time');
  const [step, setStep] = useState<'selection' | 'checkout' | 'success'>('selection');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Registration State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // Social Proof State
  const [notification, setNotification] = useState<{name: string, location: string, item: string, type: string} | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Social Proof Logic
  useEffect(() => {
    const scheduleNextNotification = () => {
      const delay = Math.random() * 10000 + 10000; // 10-20 seconds
      setTimeout(() => {
        const randomPurchase = recentPurchases[Math.floor(Math.random() * recentPurchases.length)];
        setNotification(randomPurchase);
        setShowNotification(true);
        
        // Hide after 5 seconds
        setTimeout(() => {
          setShowNotification(false);
          scheduleNextNotification();
        }, 5000);
      }, delay);
    };

    const initialTimeout = setTimeout(scheduleNextNotification, 5000); // Start after 5s
    return () => clearTimeout(initialTimeout);
  }, []);

  const handlePackageSelect = (pkg: 'clip' | 'pack') => {
    setSelectedPackage(pkg);
    setStep('checkout');
    // Scroll to checkout section smoothly
    setTimeout(() => {
      const checkoutEl = document.getElementById('checkout-section');
      if (checkoutEl) checkoutEl.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };
  
  const handleSkipPayment = () => {
    setIsProcessing(true);
    // Faster simulation for skip
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword) {
      // Simulate registration
      setRegistrationComplete(true);
    } else {
      alert("Passwords do not match or are empty.");
    }
  };

  // Pricing Data Helper
  const getPrice = (pkg: 'clip' | 'pack') => {
    if (billingCycle === 'one-time') {
      return pkg === 'clip' ? '$16.99' : '$29.99';
    }
    return pkg === 'clip' ? '$14.99' : '$24.99';
  };

  const getBillingText = () => {
    return billingCycle === 'one-time' ? 'One-time payment' : 'Billed monthly. Cancel anytime.';
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden font-sans pt-32 pb-20">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
             <path fill="#e2e8f0" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,229.3C840,235,960,213,1080,197.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
           </svg>
        </div>
        <div className="relative z-10 max-w-lg w-full bg-white/80 backdrop-blur-xl border border-white/60 p-12 rounded-[2.5rem] shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-500">
          <div className="mb-8 relative cursor-pointer hover:opacity-80 transition-opacity" onClick={onReturnHome}>
             <img src={logoSrc} alt="Solim Logo" className="h-28 w-auto object-contain mx-auto" />
          </div>
          
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
          </div>

          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-6 leading-tight">
            {hasWizardData ? "Memory submission complete" : "Payment successful"}
          </h2>
          
          <p className="text-slate-600 mb-8 text-lg leading-relaxed">
            {hasWizardData 
              ? "We’ve received your questionnaire and processing has begun. You’ll receive your memory pack in 1–3 working days."
              : "Thank you for your purchase. Please complete the memory questionnaire so we can start rebuilding your moment."
            }
          </p>

          {hasWizardData && !registrationComplete && (
            <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Complete your account</h3>
              <p className="text-sm text-slate-500 mb-4">Save your order history and track your memory pack status.</p>
              
              <form onSubmit={handleRegistration} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Name</label>
                      <input type="text" value={wizardData?.userName || ''} disabled className="w-full bg-slate-200/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-500 text-sm" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email</label>
                      <input type="text" value={wizardData?.userEmail || ''} disabled className="w-full bg-slate-200/50 border border-slate-200 rounded-lg px-3 py-2 text-slate-500 text-sm" />
                    </div>
                 </div>
                 <div className="relative">
                   <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-300 transition-all text-sm"
                   />
                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                     {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                   </button>
                 </div>
                 <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-300 transition-all text-sm"
                 />
                 <button 
                  type="submit" 
                  className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors"
                >
                  Create Account
                </button>
              </form>
            </div>
          )}

          {registrationComplete && (
            <div className="w-full bg-green-50 border border-green-100 rounded-2xl p-4 mb-8 flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                 <Check className="w-4 h-4 text-green-600" />
               </div>
               <div className="text-left">
                 <p className="font-bold text-green-800 text-sm">Account Created</p>
                 <p className="text-green-600 text-xs">You can now log in to track your order.</p>
               </div>
            </div>
          )}

          <div className="w-full space-y-3">
            {hasWizardData ? (
                <>
                  <button 
                    onClick={onReturnHome}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                  >
                    Return to Home
                  </button>
                  <button className="w-full py-4 bg-transparent text-slate-500 font-medium hover:text-slate-900 transition-colors">
                    Track Order
                  </button>
                </>
            ) : (
                 <button 
                  onClick={onStartWizard}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
                >
                  Start Questionnaire <ArrowRight className="w-4 h-4" />
                </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden pt-28">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-200/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10 relative">
          
          {/* Countdown Timer - Top Right */}
          <div className="md:absolute md:top-0 md:right-0 flex justify-center md:justify-end mb-6 md:mb-0">
            <div className={`px-4 py-1.5 rounded-full border flex items-center gap-2 shadow-sm transition-colors duration-500 ${timeLeft < 120 ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
              <Clock className={`w-3.5 h-3.5 ${timeLeft < 120 ? 'text-amber-500' : 'text-slate-400'}`} />
              <div className="text-xs font-medium text-slate-500">
                Offer reserved: <span className={`font-mono font-bold ml-1 text-sm ${timeLeft < 120 ? 'text-amber-600' : 'text-slate-900'}`}>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
            Choose Your Memory Package
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-light mb-8">
            High-quality recreations of your most cherished moments.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex flex-col items-center justify-center">
             <div className="relative flex bg-slate-200/50 rounded-full p-1 cursor-pointer w-72 h-12 select-none">
                <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-900 rounded-full shadow-md transition-all duration-300 ease-out ${billingCycle === 'monthly' ? 'translate-x-full left-1' : 'left-1'}`}></div>
                <button 
                    onClick={() => setBillingCycle('one-time')}
                    className={`w-1/2 rounded-full z-10 text-sm font-bold transition-colors duration-300 relative ${billingCycle === 'one-time' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    One-time
                </button>
                <button 
                    onClick={() => setBillingCycle('monthly')}
                    className={`w-1/2 rounded-full z-10 text-sm font-bold transition-colors duration-300 relative ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Monthly
                </button>
             </div>
             <p className="text-xs text-slate-500 mt-3 font-medium animate-in fade-in slide-in-from-top-1 duration-500">
                Save on every memory with monthly billing. Cancel anytime.
             </p>
          </div>
        </div>

        {step === 'selection' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto items-stretch mb-24">
              
              {/* Memory Clip - Standard */}
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-2xl font-serif font-medium text-slate-900 mb-2">Memory Clip</h3>
                  <p className="text-slate-500 text-sm mb-8 pb-8 border-b border-slate-100">Perfect for smaller, simple moments.</p>
                  
                  <div className="mb-8">
                    <div className="text-4xl font-bold text-slate-900 flex items-baseline gap-1 transition-all duration-300">
                      {getPrice('clip')}
                      {billingCycle === 'monthly' && <span className="text-lg text-slate-400 font-medium">/ month</span>}
                    </div>
                    <div className="text-xs text-slate-400 font-medium mt-1">
                      {billingCycle === 'one-time' ? 'One-time payment' : 'Billed monthly. Cancel anytime.'}
                    </div>
                  </div>
                  
                  <ul className="space-y-6 mb-8">
                    <li className="flex items-center gap-3 text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 flex-shrink-0">
                        <ImageIcon className="w-3 h-3" />
                      </div>
                      <span className="text-sm">2 cinematic <strong>2K images</strong></span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 flex-shrink-0">
                        <Film className="w-3 h-3" />
                      </div>
                      <span className="text-sm">1 <strong>1K dynamic video</strong></span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 flex-shrink-0">
                        <Clock className="w-3 h-3" />
                      </div>
                      <span className="text-sm">Standard 1–3 day delivery</span>
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={() => handlePackageSelect('clip')}
                  className="w-full py-4 rounded-xl border border-slate-200 text-slate-900 font-bold hover:border-slate-900 hover:bg-slate-50 transition-all duration-300"
                >
                  Choose Memory Clip
                </button>
              </div>

              {/* Memory Pack - Premium */}
              <div className="relative group flex flex-col h-full transform md:-translate-y-4">
                {/* Green Glow Behind */}
                <div className={`absolute -inset-4 bg-emerald-400/20 rounded-[3rem] blur-2xl -z-10 opacity-70 transition-opacity duration-500 ${billingCycle === 'monthly' ? 'opacity-90 bg-emerald-500/20' : ''}`}></div>
                
                <div className="bg-white rounded-[2rem] p-8 lg:p-10 border-[3px] border-indigo-100 shadow-2xl shadow-indigo-100/50 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                  
                  {/* Badge */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 text-amber-200 px-4 py-1.5 rounded-b-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-md z-10">
                    <Star className="w-3 h-3 fill-current" /> Most Popular
                  </div>

                  <div className="flex-grow mt-2">
                    <h3 className="text-3xl font-serif font-medium text-slate-900 mb-2">Memory Pack</h3>
                    <p className="text-slate-500 text-sm mb-8 pb-8 border-b border-dashed border-indigo-100">Ideal for deeply meaningful memories.</p>

                    <div className="mb-8">
                      <div className="text-5xl font-bold text-slate-900 flex items-baseline gap-1 transition-all duration-300">
                        {getPrice('pack')}
                        {billingCycle === 'monthly' && <span className="text-xl text-slate-400 font-medium">/ month</span>}
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-1 pl-1">
                        {billingCycle === 'one-time' ? 'One-time payment' : 'Billed monthly. Cancel anytime.'}
                      </div>
                    </div>
                    
                    <ul className="space-y-6 mb-8">
                      <li className="flex items-center gap-3 text-slate-900 font-medium">
                        <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                          <ImageIcon className="w-3 h-3" />
                        </div>
                        <span className="text-sm">5 cinematic <strong>4K images</strong></span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-900 font-medium">
                        <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                          <Film className="w-3 h-3" />
                        </div>
                        <span className="text-sm">2 <strong>2K dynamic videos</strong></span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-900 font-medium">
                        <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                          <Zap className="w-3 h-3" />
                        </div>
                        <span className="text-sm">Priority Delivery</span>
                      </li>
                       <li className="flex items-center gap-3 text-slate-900 font-medium">
                        <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 flex-shrink-0">
                          <Heart className="w-3 h-3" />
                        </div>
                        <span className="text-sm">Most emotionally lifelike rendering</span>
                      </li>
                    </ul>
                  </div>

                  <button 
                    onClick={() => handlePackageSelect('pack')}
                    className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-lg shadow-indigo-200/50 transition-all transform hover:scale-[1.02]"
                  >
                    Choose Memory Pack
                  </button>
                </div>
              </div>

            </div>

            {/* Comparison Table */}
            <div className="max-w-4xl mx-auto bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden mb-12">
              <div className="p-8 pb-6 border-b border-slate-50">
                <h3 className="font-serif text-2xl text-slate-900 text-center">Compare Packages</h3>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="p-4 pl-6 md:pl-10 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/3">Feature</th>
                      <th className="p-4 text-center text-sm font-bold text-slate-600 w-1/3">Memory Clip</th>
                      <th className="p-4 text-center text-sm font-bold text-indigo-900 w-1/3 bg-indigo-50/30">Memory Pack</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { feature: "Total Images", clip: "2 (2K)", pack: "5 (4K)" },
                      { feature: "Total Videos", clip: "1 (1K)", pack: "2 (2K)" },
                      { feature: "Delivery Time", clip: "Standard (1-3 days)", pack: "Priority Next Day Delivery" },
                      { feature: "Resolution", clip: "High", pack: "Highest Fidelity" },
                      { feature: "Emotional Accuracy", clip: "High", pack: "Highest" },
                      { feature: "Popularity", clip: "Very Popular", pack: <span className="flex items-center justify-center gap-1 text-amber-600 font-bold text-xs uppercase tracking-wide"><Award className="w-3 h-3" /> Most Chosen</span> },
                    ].map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}>
                        <td className="p-4 pl-6 md:pl-10 text-slate-500 font-medium text-sm">{row.feature}</td>
                        <td className="p-4 text-center text-slate-500 text-sm">{row.clip}</td>
                        <td className="p-4 text-center text-slate-900 font-semibold bg-indigo-50/20 text-sm">
                          {row.pack}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Skip Option for Preview */}
            <div className="flex justify-center mb-24">
              <button 
                onClick={handleSkipPayment}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 font-medium text-sm transition-all"
              >
                <span>Skip Payment & Preview Success Page</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {step === 'checkout' && (
          <div id="checkout-section" className="max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 mb-20">
             <button 
               onClick={() => setStep('selection')}
               className="flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-8 text-xs font-bold uppercase tracking-widest transition-colors"
             >
               <ArrowLeft className="w-3 h-3" /> Back to packages
             </button>

             <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl shadow-slate-200/40">
               <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                 <div>
                   <h3 className="font-serif text-xl text-slate-900 mb-1">
                     {selectedPackage === 'pack' ? 'Memory Pack' : 'Memory Clip'}
                   </h3>
                   <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">
                      {billingCycle === 'one-time' ? 'One-time payment' : 'Monthly subscription'}
                   </span>
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-bold text-slate-900">
                     {getPrice(selectedPackage || 'clip')}
                   </div>
                   {billingCycle === 'monthly' && <div className="text-xs text-slate-400">/ month</div>}
                   {selectedPackage === 'pack' && (
                     <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider block mt-1">Best Value</span>
                   )}
                 </div>
               </div>

               <form onSubmit={handlePayment} className="space-y-6">
                 {/* Email Field - Auto filled if wizard data exists */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                    <input 
                        type="email" 
                        defaultValue={hasWizardData ? (wizardData?.userEmail || "user@example.com") : ""} 
                        placeholder="your@email.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder-slate-400"
                        required
                    />
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                      Payment Details
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="relative">
                         <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                         <input 
                          type="text" 
                          placeholder="Card number"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder-slate-400"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          placeholder="MM / YY"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder-slate-400"
                          required
                        />
                        <input 
                          type="text" 
                          placeholder="CVC"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder-slate-400"
                          required
                        />
                      </div>
                      <input 
                          type="text" 
                          placeholder="Cardholder Name"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder-slate-400"
                          required
                      />
                    </div>
                 </div>

                 <div className="pt-4 space-y-3">
                    <button 
                      type="submit"
                      disabled={isProcessing}
                      className={`w-full bg-slate-900 text-white font-semibold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 ${isProcessing ? 'opacity-80 cursor-wait' : ''}`}
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>Pay {getPrice(selectedPackage || 'clip')} <Lock className="w-4 h-4" /></>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleSkipPayment}
                      disabled={isProcessing}
                       className="w-full bg-white border border-slate-200 text-slate-400 font-semibold py-3 rounded-xl hover:text-slate-600 hover:border-slate-300 transition-all text-xs uppercase tracking-wide"
                    >
                      Skip Payment (Preview Mode)
                    </button>
                    
                    <div className="flex flex-col gap-2 mt-4 text-center">
                       <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          <Shield className="w-3 h-3" /> SSL Secure • Powered by Stripe
                       </div>
                       <div className="text-xs text-slate-400">
                          Money-back rerender guarantee
                       </div>
                    </div>
                 </div>
               </form>
             </div>
          </div>
        )}
      </div>

      {/* Social Proof Notification Toast */}
      {showNotification && notification && (
        <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
          <div className="bg-white/90 backdrop-blur-md border border-slate-100 rounded-xl p-4 shadow-xl flex items-center gap-4 max-w-sm">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${notification.type === 'pack' ? 'bg-emerald-500' : 'bg-blue-500'}`}>
              {notification.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm text-slate-900 leading-tight">
                <span className="font-semibold">{notification.name}</span> from {notification.location} just bought a{' '}
                <span className={`font-bold ${notification.type === 'pack' ? 'text-emerald-600' : 'text-blue-600'}`}>
                  {notification.item}
                </span>.
              </p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wide font-medium">Verified Purchase • Just now</p>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Footer */}
      <div className="border-t border-slate-200 bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
           <h4 className="text-center text-slate-400 font-bold uppercase tracking-widest text-xs mb-10">Common Questions</h4>
           <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
             <div>
               <h5 className="font-semibold text-slate-900 mb-3 text-sm">Delivery Time</h5>
               <p className="text-sm text-slate-500 leading-relaxed font-light">Standard orders take 1-3 days. Priority orders are processed first and typically arrive within 24 hours.</p>
             </div>
             <div>
               <h5 className="font-semibold text-slate-900 mb-3 text-sm">What is 4K?</h5>
               <p className="text-sm text-slate-500 leading-relaxed font-light">Ultra High Definition. Perfect for printing on large canvases or viewing on large TV screens.</p>
             </div>
             <div>
               <h5 className="font-semibold text-slate-900 mb-3 text-sm">Data Privacy</h5>
               <p className="text-sm text-slate-500 leading-relaxed font-light">Your memories are private. Data is encrypted and deleted from our servers 30 days after delivery.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;