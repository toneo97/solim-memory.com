import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RealMoments from './components/RealMoments';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntakeWizard from './components/IntakeWizard';
import PaymentPage from './components/PaymentPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'wizard' | 'payment' | 'login' | 'signup'>('landing');
  // Store wizard data if user completes flow, so we can submit after payment
  const [completedWizardData, setCompletedWizardData] = useState<any>(null);
  const [userEmail, setUserEmail] = useState('');
  
  // Using the same logo link from Navbar for consistency
  const logoUrl = "https://www.dropbox.com/scl/fi/yruygvw5vv4p8c1ppk2os/Solim-brain-logo-1.png?rlkey=wfs4c7hjrhisjetsf0nq8gnig&st=uppd1ooo&raw=1";

  // Reset scroll position when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // Handle navigation from any page to a landing page section
  const handleNavigation = (sectionId: string) => {
    if (view !== 'landing') {
      setView('landing');
      // Wait for the render cycle to complete and DOM to update before scrolling
      setTimeout(() => {
        if (sectionId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
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

  if (view === 'wizard') {
    return (
      <IntakeWizard 
        onReturnHome={() => setView('landing')} 
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
    return (
      <LoginPage 
        onReturnHome={() => handleNavigation('top')} 
        onSignUp={() => setView('signup')} 
      />
    );
  }

  if (view === 'signup') {
    return (
      <SignUpPage
        onReturnHome={() => handleNavigation('top')}
        onLogin={() => setView('login')}
        onComplete={() => setView('wizard')}
      />
    );
  }

  // Common props for Navbar
  const navbarProps = {
    onGetStarted: () => handleNavigation('top'), // Scrolls to Hero input
    onPricingClick: () => setView('payment'),
    onLoginClick: () => setView('login'),
    onNavigate: handleNavigation
  };

  if (view === 'payment') {
    return (
      <>
        <Navbar {...navbarProps} />
        <PaymentPage 
          onReturnHome={() => handleNavigation('top')} 
          hasWizardData={!!completedWizardData}
          wizardData={completedWizardData}
          onStartWizard={() => setView('wizard')}
        />
        <Footer onPricingClick={() => setView('payment')} onNavigate={handleNavigation} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      <Navbar {...navbarProps} />
      <main className="flex-grow">
        <Hero onGetStarted={(email) => { setUserEmail(email); setView('wizard'); }} />
        <RealMoments />
        <HowItWorks />
        <Testimonials />
        <Contact />
      </main>
      <Footer onPricingClick={() => setView('payment')} onNavigate={handleNavigation} />
    </div>
  );
};

export default App;