import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntakeWizard from './components/IntakeWizard';
import PaymentPage from './components/PaymentPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import FAQ from './components/FAQ';
import LegalPage from './components/LegalPages';
import Mission from './components/Mission';
import { supabase } from './lib/supabaseClient';

const App: React.FC = () => {
  // --- Routing Logic ---
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Sync state with browser history (back/forward buttons)
  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Custom navigation function to update URL without reload
  const navigate = (path: string) => {
    // If it's a hash link on the same page, just update hash
    if (path.startsWith('#')) {
      window.history.pushState(null, '', path);
      setCurrentHash(path);
      return;
    }
    
    // Standard navigation
    window.history.pushState(null, '', path);
    setCurrentPath(window.location.pathname);
    setCurrentHash(window.location.hash);
    
    // Scroll to top if not a hash link
    if (!path.includes('#')) {
      window.scrollTo(0, 0);
    }
  };

  // Handle Hash Scrolling
  useEffect(() => {
    if (currentHash) {
      // Small timeout to allow DOM to render
      setTimeout(() => {
        const id = currentHash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [currentHash, currentPath]); // Trigger when hash changes or page loads

  // --- App Data State ---
  const [completedWizardData, setCompletedWizardData] = useState<any>(null);
  const [userEmail, setUserEmail] = useState('');
  const [session, setSession] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // --- Auth Logic ---
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
        handleAuthRedirects(session, window.location.pathname);
      } catch (err) {
        console.error("Error checking session:", err);
      } finally {
        setLoadingSession(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthRedirects = (currentSession: any, path: string) => {
    if (path.startsWith('/dashboard') && !currentSession) {
      navigate('/login');
    }
    if ((path === '/login' || path === '/signup' || path === '/register') && currentSession) {
      navigate('/dashboard');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // --- Route Parsing & View Selection ---
  
  // Parse path: /root/sub1/sub2
  const pathParts = currentPath.split('/').filter(Boolean);
  const rootPath = pathParts[0] || 'landing';

  // Common Props
  const handleNavigation = (sectionId: string) => {
    if (rootPath !== 'landing') {
      // If not on home, go to home then scroll
      navigate(`/#${sectionId}`);
    } else {
      // Just scroll
      navigate(`#${sectionId}`);
    }
  };

  const navbarProps = {
    onGetStarted: () => navigate('/signup'),
    onPricingClick: () => navigate('/pricing'),
    onLoginClick: () => navigate('/login'),
    onNavigate: (id: string) => {
      if (id === 'top') navigate('/');
      else handleNavigation(id);
    }
  };

  const footerProps = {
    onPricingClick: () => navigate('/pricing'),
    onNavigate: handleNavigation,
    onTermsClick: () => navigate('/terms'),
    onPrivacyClick: () => navigate('/privacy')
  };

  // --- Rendering ---

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
           <p className="text-slate-500 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Dashboard Route
  if (rootPath === 'dashboard') {
    if (!session) {
        // Fallback protection if useEffect hasn't redirected yet
        return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
             <div className="text-center">
               <p className="mb-4">Please log in to view the dashboard.</p>
               <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline">Go to Login</button>
             </div>
          </div>
        );
    }

    // Determine tabs from URL: /dashboard/memories or /dashboard/account/billing
    const activeTab = ['memories', 'drafts', 'account'].includes(pathParts[1]) ? pathParts[1] : 'memories';
    const activeSection = pathParts[2]; // e.g. 'billing'

    return (
      <Dashboard 
        activeTab={activeTab as any}
        activeSection={activeSection}
        onNavigate={(tab, section) => {
          const url = section ? `/dashboard/${tab}/${section}` : `/dashboard/${tab}`;
          navigate(url);
        }}
        onLogout={handleLogout} 
        onNewMemory={() => navigate('/wizard')}
        onHome={() => navigate('/')}
      />
    );
  }

  // Legal Pages
  if (rootPath === 'terms') {
    return <LegalPage type="terms" onBack={() => navigate('/')} />;
  }
  if (rootPath === 'privacy') {
    return <LegalPage type="privacy" onBack={() => navigate('/')} />;
  }

  // Wizard
  if (rootPath === 'wizard') {
    return (
      <IntakeWizard 
        onReturnHome={() => navigate('/')} 
        onGoToPayment={(data) => {
          setCompletedWizardData(data);
          navigate('/pricing');
        }}
        logoSrc="https://www.dropbox.com/scl/fi/yruygvw5vv4p8c1ppk2os/Solim-brain-logo-1.png?rlkey=wfs4c7hjrhisjetsf0nq8gnig&st=uppd1ooo&raw=1"
        initialEmail={userEmail}
      />
    );
  }

  // Auth
  if (rootPath === 'login') return <LoginPage />;
  if (rootPath === 'signup' || rootPath === 'register') return <SignUpPage />;

  // Payment / Pricing
  if (rootPath === 'pricing' || rootPath === 'payment' || rootPath === 'checkout') {
    return (
      <>
        <Navbar {...navbarProps} />
        <PaymentPage 
          onReturnHome={() => navigate('/')} 
          hasWizardData={!!completedWizardData}
          wizardData={completedWizardData}
          onStartWizard={() => navigate('/wizard')}
        />
        <Footer {...footerProps} />
      </>
    );
  }

  // Landing Page (Default)
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      <Navbar {...navbarProps} />
      <main className="flex-grow">
        <Hero onGetStarted={(email) => { 
          setUserEmail(email); 
          navigate('/signup'); 
        }} />
        <HowItWorks />
        <Testimonials />
        <Mission />
        <FAQ />
        <Contact />
      </main>
      <Footer {...footerProps} />
    </div>
  );
};

export default App;