import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntakeWizard, { initialFormData, WizardFormData } from './components/IntakeWizard';
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
    if (path.startsWith('#')) {
      window.history.pushState(null, '', path);
      setCurrentHash(path);
      return;
    }
    
    window.history.pushState(null, '', path);
    setCurrentPath(window.location.pathname);
    setCurrentHash(window.location.hash);
    
    if (!path.includes('#')) {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (currentHash) {
      setTimeout(() => {
        const id = currentHash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [currentHash, currentPath]);

  // --- App Data State ---
  // Lifted state for the wizard so data persists across URL step changes
  const [wizardData, setWizardData] = useState<WizardFormData>(initialFormData);
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
        
        // Pre-fill email in wizard if logged in
        if (session?.user?.email) {
          setWizardData(prev => ({ ...prev, userEmail: session.user.email || '' }));
          setUserEmail(session.user.email);
        }
      } catch (err) {
        console.error("Error checking session:", err);
      } finally {
        setLoadingSession(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.email) {
        setWizardData(prev => ({ ...prev, userEmail: session.user.email || '' }));
      }
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

  // --- View Selection ---
  
  // Parse path: /root/sub1/sub2
  const pathParts = currentPath.split('/').filter(Boolean);
  const rootPath = pathParts[0] || 'landing';

  // Specific check for /memory-reliv-X pattern
  const isWizardStep = currentPath.startsWith('/memory-reliv-');
  const wizardStepNumber = isWizardStep ? parseInt(currentPath.split('-')[1] || '1', 10) : 1;
  
  // Check for the specific success path: /memory-reliv/success
  const isWizardSuccess = currentPath === '/memory-reliv/success';

  // Redirect base /memory-reliv to step 1
  if (currentPath === '/memory-reliv') {
     window.history.replaceState(null, '', '/memory-reliv-1');
     setCurrentPath('/memory-reliv-1');
  }

  const handleNavigation = (sectionId: string) => {
    if (rootPath !== 'landing') {
      navigate(`/#${sectionId}`);
    } else {
      navigate(`#${sectionId}`);
    }
  };

  const navbarProps = {
    onGetStarted: () => navigate('/memory-reliv-1'),
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

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // --- Routes ---

  // Dashboard
  if (rootPath === 'dashboard') {
    if (!session) {
        return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
             <div className="text-center">
               <p className="mb-4">Please log in to view the dashboard.</p>
               <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline">Go to Login</button>
             </div>
          </div>
        );
    }

    const activeTab = ['memories', 'drafts', 'account'].includes(pathParts[1]) ? pathParts[1] : 'memories';
    const activeSection = pathParts[2];

    return (
      <Dashboard 
        activeTab={activeTab as any}
        activeSection={activeSection}
        onNavigate={(tab, section) => {
          const url = section ? `/dashboard/${tab}/${section}` : `/dashboard/${tab}`;
          navigate(url);
        }}
        onLogout={handleLogout} 
        onNewMemory={() => navigate('/memory-reliv-1')}
        onHome={() => navigate('/')}
      />
    );
  }

  // Legal
  if (rootPath === 'terms') return <LegalPage type="terms" onBack={() => navigate('/')} />;
  if (rootPath === 'privacy') return <LegalPage type="privacy" onBack={() => navigate('/')} />;

  // Intake Wizard Steps
  if (isWizardStep) {
    return (
      <IntakeWizard 
        currentStep={wizardStepNumber}
        formData={wizardData}
        onDataChange={setWizardData}
        onNavigateStep={(step) => {
          if (step > 14) {
            navigate('/pricing');
          } else {
            navigate(`/memory-reliv-${step}`);
          }
        }}
        onReturnHome={() => navigate('/')} 
        logoSrc="https://www.dropbox.com/scl/fi/yruygvw5vv4p8c1ppk2os/Solim-brain-logo-1.png?rlkey=wfs4c7hjrhisjetsf0nq8gnig&st=uppd1ooo&raw=1"
      />
    );
  }

  // Success Page
  if (isWizardSuccess) {
     return (
      <>
        <PaymentPage 
          onReturnHome={() => navigate('/')} 
          hasWizardData={true}
          wizardData={wizardData}
          onStartWizard={() => navigate('/memory-reliv-1')}
          showSuccessView={true}
        />
      </>
     );
  }

  // Auth
  if (rootPath === 'login') return <LoginPage onNavigate={navigate} />;
  if (rootPath === 'signup' || rootPath === 'register') return <SignUpPage onNavigate={navigate} />;

  // Payment / Pricing
  if (rootPath === 'pricing' || rootPath === 'payment' || rootPath === 'checkout') {
    return (
      <>
        <Navbar {...navbarProps} />
        <PaymentPage 
          onReturnHome={() => navigate('/')} 
          hasWizardData={true}
          wizardData={wizardData}
          onStartWizard={() => navigate('/memory-reliv-1')}
        />
        <Footer {...footerProps} />
      </>
    );
  }

  // Landing
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      <Navbar {...navbarProps} />
      <main className="flex-grow">
        <Hero onGetStarted={(email) => { 
          // Pre-fill email then go to wizard step 1
          setUserEmail(email);
          setWizardData(prev => ({...prev, userEmail: email}));
          navigate('/memory-reliv-1'); 
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