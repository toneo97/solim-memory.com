import React, { useEffect } from 'react';
import { ArrowLeft, Shield, FileText } from 'lucide-react';

interface LegalPageProps {
  type: 'terms' | 'privacy';
  onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const isTerms = type === 'terms';
  const title = isTerms ? "Terms of Service" : "Privacy Policy";
  const date = "Effective Date: October 26, 2024";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="mb-12 border-b border-slate-100 pb-8">
           <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
             {isTerms ? <FileText className="w-6 h-6 text-slate-900" /> : <Shield className="w-6 h-6 text-slate-900" />}
           </div>
           <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">{title}</h1>
           <p className="text-slate-500">{date}</p>
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          {isTerms ? (
            <>
              <h3>1. Acceptance of Terms</h3>
              <p>By accessing or using the Solim Memory service ("Service"), you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.</p>

              <h3>2. Description of Service</h3>
              <p>Solim Memory provides AI-driven memory reconstruction services. Users submit descriptions of personal memories, and our Service generates visual representations (images and videos) based on these descriptions.</p>

              <h3>3. User Responsibilities</h3>
              <p>You represent that any content you provide to us for memory reconstruction is your own, or that you have the necessary rights to use it. You agree not to submit content that is illegal, offensive, or violates the privacy rights of others.</p>

              <h3>4. Payment Terms</h3>
              <p>Services are billed on a one-time or subscription basis as selected at checkout. All fees are non-refundable once the AI generation process has commenced, except as required by law or our specific Satisfaction Guarantee policy.</p>

              <h3>5. Intellectual Property</h3>
              <p>You retain ownership of your original memory descriptions. Solim Memory grants you a perpetual, non-exclusive license to use, reproduce, and display the generated content for personal, non-commercial use.</p>

              <h3>6. Limitation of Liability</h3>
              <p>Solim Memory shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

              <h3>7. Changes</h3>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

              <h3>8. Contact Us</h3>
              <p>If you have any questions about these Terms, please contact us at support@solimhealth.com.</p>
            </>
          ) : (
            <>
              <h3>1. Information We Collect</h3>
              <p>We collect information you provide directly to us, including your name, email address, payment information, and the textual or audio descriptions of memories you submit for reconstruction.</p>

              <h3>2. How We Use Your Information</h3>
              <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, to send you related information, including confirmations and invoices, and to communicate with you about products, services, offers, promotions, and rewards.</p>

              <h3>3. AI Model Disclosure</h3>
              <p>Your memory descriptions are processed by artificial intelligence models to generate visual content. We do not use your personal memory submissions to train our public-facing foundation models without your explicit, opt-in consent.</p>

              <h3>4. Data Storage and Security</h3>
              <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. Your memory inputs are retained only for as long as necessary to fulfill your order and are deleted from our active processing servers 30 days after delivery.</p>

              <h3>5. Sharing of Information</h3>
              <p>We do not share your personal information with third parties except as necessary to provide the Service (e.g., payment processing) or as required by law.</p>

              <h3>6. Your Rights</h3>
              <p>Depending on your location, you may have rights regarding your personal data, including the right to access, correct, delete, or restrict use of your personal data. To exercise these rights, please contact us.</p>

              <h3>7. Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at support@solimhealth.com.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;