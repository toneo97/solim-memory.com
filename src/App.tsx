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

type ViewState = 'landing' | 'wizard' | 'payment' | 'login' | 'signup' | 'dashboard' | 'terms' | 'privacy';

const App: React.FC = () => {
  // Initialize view based on current URL path
  const [view, setView] = useState<ViewState>(() => {
    const path = window.location.pathname;
    if (path === '/login') return 'login';
    if (path === '/signup') return 'signup';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/terms') return 'terms';
    if (path === '/privacy') return 'privacy';
    return 'landing';
  });
  
  // Store wizard data if user completes flow, so we can submit after payment
  const [completedWizardData, setCompletedWizardData] = useState<any>(null);
  const [userEmail, setUserEmail] = useState('');
  const [session, setSession] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  
  // Using the same logo link from Navbar for consistency
  const logoUrl = "https://www.dropbox.com/scl/fi/yruygvw5vv4p8c1ppk2os/Solim-brain-logo-1.png?rlkey=wfs4c7hjrhisjetsf0nq8gnig&st=uppd1ooo&raw=1";

  // Check active session and handle auth redirects
  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
        handleAuthRedirects(session, view);
      } catch (err) {
        console.error("Error checking session:", err);
      } finally {
        setLoadingSession(false);
      }
    };

    checkSession();

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // We don't automatically redirect on state change here to avoid jarring UX, 
      // but we update the session state which triggers re-renders if needed.
    });

    return () => subscription.unsubscribe();
  }, []);

  // Logic to protect routes
  const handleAuthRedirects = (currentSession: any, currentView: ViewState) => {
    // If on dashboard but not logged in, go to login
    if (currentView === 'dashboard' && !currentSession) {
      window.location.href = '/login';
    }
    // If on login/signup but already logged in, go to dashboard
    if ((currentView === 'login' || currentView === 'signup') && currentSession) {
      window.location.href = '/dashboard';
    }
  };

  // Reset scroll position when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  // Handle navigation from any page to a landing page section
  const handleNavigation = (sectionId: string) => {
    if (view !== 'landing') {
      // If we are on a different page, navigating to a section usually means going home first
      window.location.href = '/';
    } else {
      // Already on landing page
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

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

  if (view === 'dashboard') {
    // Double check session existence for dashboard render, though redirect should happen
    if (!session) {
        // Fallback if redirect hasn't happened yet
        return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
             <div className="text-center">
               <p className="mb-4">Please log in to view the dashboard.</p>
               <button onClick={() => window.location.href = '/login'} className="text-blue-600 hover:underline">Go to Login</button>
             </div>
          </div>
        );
    }

    return (
      <Dashboard 
        onLogout={handleLogout} 
        onNewMemory={() => setView('wizard')}
        onHome={() => window.location.href = '/'}
      />
    );
  }

  if (view === 'terms') {
    return (
      <LegalPage type="terms" onBack={() => window.location.href = '/'} />
    );
  }

  if (view === 'privacy') {
    return (
      <LegalPage type="privacy" onBack={() => window.location.href = '/'} />
    );
  }

  if (view === 'wizard') {
    return (
      <IntakeWizard 
        onReturnHome={() => window.location.href = '/'} 
        onGoToPayment={(data) => {
          setCompletedWizardData(data);
          setView('payment');
        }}
        logoSrc={logoUrl} 
        initialEmail={userEmail}
      />
    );
  }

  if (view === 'login') {
    return <LoginPage />;
  }

  if (view === 'signup') {
    return <SignUpPage />;
  }

  // Common props for Navbar
  const navbarProps = {
    onGetStarted: () => window.location.href = '/signup', // Link to Signup
    onPricingClick: () => setView('payment'),
    onLoginClick: () => window.location.href = '/login', // Link to Login
    onNavigate: handleNavigation
  };

  const footerProps = {
    onPricingClick: () => setView('payment'),
    onNavigate: handleNavigation,
    onTermsClick: () => window.location.href = '/terms',
    onPrivacyClick: () => window.location.href = '/privacy'
  };

  if (view === 'payment') {
    return (
      <>
        <Navbar {...navbarProps} />
        <PaymentPage 
          onReturnHome={() => window.location.href = '/'} 
          hasWizardData={!!completedWizardData}
          wizardData={completedWizardData}
          onStartWizard={() => setView('wizard')}
        />
        <Footer {...footerProps} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      <Navbar {...navbarProps} />
      <main className="flex-grow">
        <Hero onGetStarted={(email) => { 
          // We redirect to signup, preserving email if possible would require passing it via query params
          // or context, but per instructions we just link to signup.
          setUserEmail(email); 
          window.location.href = '/signup'; 
        }} />
        {/* RealMoments removed as per cleanup requirements */}
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