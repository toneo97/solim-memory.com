import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';

interface LoginPageProps {
  onReturnHome: () => void;
  onSignUp?: () => void;
  onLoginSuccess?: () => void;
}

const logoSrc = "https://www.dropbox.com/scl/fi/yruygvw5vv4p8c1ppk2os/Solim-brain-logo-1.png?rlkey=wfs4c7hjrhisjetsf0nq8gnig&st=uppd1ooo&raw=1";

const LoginPage: React.FC<LoginPageProps> = ({ onReturnHome, onSignUp, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative font-sans text-slate-900">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-200/40 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 z-20">
        <button 
          onClick={onReturnHome}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6 relative z-10 pt-20 pb-20">
        <div className="w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 animate-in fade-in zoom-in duration-500">
          
          <div className="text-center mb-10">
            <div className="h-24 w-auto mx-auto mb-6 flex justify-center">
              <img src={logoSrc} alt="Solim Logo" className="h-full object-contain" />
            </div>
            <h1 className="text-3xl font-serif text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-500">Log in to revisit and manage your memories.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder-slate-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-medium text-slate-400 hover:text-slate-900 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-12 py-3.5 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder-slate-400"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-slate-900 text-white font-semibold py-4 rounded-xl hover:bg-slate-800 hover:scale-[1.01] hover:shadow-xl transition-all shadow-lg shadow-slate-900/10 mt-4 flex justify-center items-center ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-slate-500 text-sm">
              Not registered yet?{' '}
              <button 
                onClick={onSignUp}
                className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline decoration-2 underline-offset-4 transition-colors"
              >
                Sign up now
              </button>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
             <Shield className="w-3 h-3" /> Secure login • Your memories are encrypted and private.
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;