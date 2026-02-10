import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Globe, Home, Activity, CheckCircle, Zap, Shield, MapPin } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Abstract geometric placeholders for products
const CarbonGraphic = () => (
  <div className="w-full h-48 rounded-xl geometric-carbon flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-4 left-4 w-20 h-20 border-2 border-[#002E5D]/20 rounded-full" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-2 border-green-500/20 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#002E5D]/10 rounded-lg rotate-45" />
    </div>
    <Globe className="w-16 h-16 text-[#002E5D]/60" />
  </div>
);

const DisplayGraphic = () => (
  <div className="w-full h-48 rounded-xl geometric-display flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-6 right-6 w-24 h-2 bg-slate-300 rounded" />
      <div className="absolute top-12 right-6 w-16 h-2 bg-slate-300 rounded" />
      <div className="absolute bottom-6 left-6 w-20 h-20 border border-slate-300 rounded-lg" />
    </div>
    <Home className="w-16 h-16 text-slate-500" />
  </div>
);

const SportsGraphic = () => (
  <div className="w-full h-48 rounded-xl geometric-sports flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-400/40 rounded-full" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-2 border-red-300 rounded-full" />
      <div className="absolute top-1/3 right-8 w-6 h-16 bg-amber-300/30 rounded" />
    </div>
    <Activity className="w-16 h-16 text-amber-600/60" />
  </div>
);

const ProductCard = ({ title, description, graphic, testId }) => (
  <div 
    className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-8 group"
    data-testid={testId}
  >
    {graphic}
    <h3 
      className="text-xl md:text-2xl font-semibold text-slate-900 mt-6 mb-3 group-hover:text-[#002E5D] transition-colors"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {title}
    </h3>
    <p className="text-slate-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const HighlightCard = ({ icon: Icon, title, description }) => (
  <div className="flex gap-4 items-start">
    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#002E5D]/5 flex items-center justify-center">
      <Icon className="w-6 h-6 text-[#002E5D]" />
    </div>
    <div>
      <h4 className="font-semibold text-slate-900 mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {title}
      </h4>
      <p className="text-slate-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export const HomePage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePilotSignup = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      await axios.post(`${API}/pilot-signup`, { email });
      toast.success('Welcome to the pilot programme!', {
        description: 'Check your email for confirmation.'
      });
      setEmail('');
    } catch (error) {
      if (error.response?.status === 400) {
        toast.info('You\'re already signed up!', {
          description: 'We\'ll be in touch soon.'
        });
      } else {
        toast.error('Something went wrong', {
          description: 'Please try again later.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-white" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <p className="text-sm font-medium tracking-wide uppercase text-[#002E5D] mb-4">
                UK-based Connected Technology Company
              </p>
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900 mb-6"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                data-testid="hero-headline"
              >
                Smart connected technology for everyday life — and a sustainable future.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-lg">
                Xtrec builds focused hardware and software products — from automated carbon reporting 
                for small businesses to calm ambient displays and affordable sports performance devices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button 
                    className="bg-[#002E5D] hover:bg-[#001D3D] text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                    data-testid="hero-cta-pilot"
                  >
                    Join the pilot programme
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button 
                    variant="outline"
                    className="border-2 border-slate-200 text-slate-900 hover:border-[#002E5D] hover:text-[#002E5D] bg-transparent rounded-full px-8 py-6 text-lg font-medium transition-all w-full sm:w-auto"
                    data-testid="hero-cta-products"
                  >
                    Explore our products
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Product Silhouettes Schematic */}
            <div className="relative animate-fade-in-up animation-delay-200">
              <div className="aspect-square max-w-lg mx-auto relative bg-slate-50 rounded-3xl p-8">
                {/* Carbon Platform - Globe with data nodes */}
                <div className="absolute top-8 left-8 w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#002E5D" strokeWidth="1.5" strokeDasharray="4 2" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#002E5D" strokeWidth="1" opacity="0.5" />
                    <circle cx="50" cy="20" r="4" fill="#002E5D" opacity="0.7" />
                    <circle cx="75" cy="60" r="4" fill="#002E5D" opacity="0.7" />
                    <circle cx="25" cy="60" r="4" fill="#002E5D" opacity="0.7" />
                    <line x1="50" y1="24" x2="50" y2="50" stroke="#002E5D" strokeWidth="1" opacity="0.4" />
                    <line x1="71" y1="58" x2="50" y2="50" stroke="#002E5D" strokeWidth="1" opacity="0.4" />
                    <line x1="29" y1="58" x2="50" y2="50" stroke="#002E5D" strokeWidth="1" opacity="0.4" />
                  </svg>
                  <p className="text-[10px] text-slate-500 text-center mt-1 font-medium">Carbon Platform</p>
                </div>

                {/* Ambient Display - Screen silhouette */}
                <div className="absolute top-8 right-8 w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect x="15" y="20" width="70" height="45" rx="3" fill="none" stroke="#002E5D" strokeWidth="1.5" />
                    <rect x="20" y="25" width="25" height="8" rx="1" fill="#002E5D" opacity="0.2" />
                    <rect x="20" y="36" width="18" height="6" rx="1" fill="#002E5D" opacity="0.15" />
                    <rect x="55" y="25" width="25" height="16" rx="1" fill="#002E5D" opacity="0.1" />
                    <line x1="50" y1="65" x2="50" y2="75" stroke="#002E5D" strokeWidth="1.5" />
                    <line x1="35" y1="75" x2="65" y2="75" stroke="#002E5D" strokeWidth="1.5" />
                  </svg>
                  <p className="text-[10px] text-slate-500 text-center mt-1 font-medium">Ambient Display</p>
                </div>

                {/* Sports Device - Speed radar */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M 50 80 A 35 35 0 0 1 15 45" fill="none" stroke="#002E5D" strokeWidth="1.5" strokeDasharray="3 2" />
                    <path d="M 50 80 A 28 28 0 0 1 22 52" fill="none" stroke="#002E5D" strokeWidth="1" opacity="0.6" />
                    <path d="M 50 80 A 20 20 0 0 1 30 60" fill="none" stroke="#002E5D" strokeWidth="1" opacity="0.4" />
                    <circle cx="50" cy="80" r="6" fill="#002E5D" />
                    <line x1="50" y1="74" x2="35" y2="50" stroke="#002E5D" strokeWidth="2" />
                    <text x="60" y="45" fontSize="12" fill="#002E5D" fontFamily="Outfit" fontWeight="600">82</text>
                    <text x="60" y="55" fontSize="8" fill="#002E5D" opacity="0.6">mph</text>
                  </svg>
                  <p className="text-[10px] text-slate-500 text-center mt-1 font-medium">Speed Tracker</p>
                </div>

                {/* Connection lines between products */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                  <line x1="120" y1="130" x2="200" y2="260" stroke="#002E5D" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                  <line x1="280" y1="130" x2="200" y2="260" stroke="#002E5D" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                  <line x1="120" y1="100" x2="280" y2="100" stroke="#002E5D" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />
                </svg>

                {/* Central platform indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4">
                  <div className="w-16 h-16 rounded-xl border-2 border-[#002E5D]/30 flex items-center justify-center bg-white/50">
                    <span className="text-[10px] font-semibold text-[#002E5D] text-center leading-tight">Xtrec<br/>Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Pillars */}
      <section className="py-24 md:py-32 bg-slate-50" data-testid="products-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-sm font-medium tracking-wide uppercase text-[#002E5D] mb-4">
              Our Products
            </p>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Three focused product lines
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-fade-in-up animation-delay-100">
              <ProductCard
                title="Carbon Measurement Platform"
                description="Automated Scope 1, 2 and 3 emissions reporting using financial data and real-world energy measurement — designed to make carbon accounting simple and affordable for SMEs."
                graphic={<CarbonGraphic />}
                testId="product-card-carbon"
              />
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <ProductCard
                title="Smart Ambient Displays"
                description="Minimal real-time transport and weather displays that deliver essential information at a glance — without distraction, ads or voice assistants."
                graphic={<DisplayGraphic />}
                testId="product-card-displays"
              />
            </div>
            <div className="animate-fade-in-up animation-delay-300">
              <ProductCard
                title="Sports Performance Devices"
                description="Affordable cricket-focused speed tracking hardware helping grassroots players and coaches measure progress like professionals."
                graphic={<SportsGraphic />}
                testId="product-card-sports"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Xtrec */}
      <section className="py-24 md:py-32 bg-white" data-testid="why-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <p className="text-sm font-medium tracking-wide uppercase text-[#002E5D] mb-4">
                Why Xtrec
              </p>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-8"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Built for real life
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                We create practical products that fit naturally into homes, offices and training 
                environments — backed by a shared platform that reduces cost and speeds innovation.
              </p>
            </div>

            <div className="grid gap-8 animate-fade-in-up animation-delay-200">
              <HighlightCard
                icon={CheckCircle}
                title="Designed for real life"
                description="Practical products built to fit naturally into homes, offices and training environments."
              />
              <HighlightCard
                icon={Zap}
                title="Built on a shared platform"
                description="Common hardware and cloud software reduces cost, improves reliability and speeds innovation."
              />
              <HighlightCard
                icon={Globe}
                title="Sustainability at the core"
                description="Helping SMEs understand emissions and encouraging smarter everyday choices."
              />
              <HighlightCard
                icon={Shield}
                title="Privacy-first approach"
                description="Your data stays yours. No tracking, no profiling, no selling to third parties."
              />
              <HighlightCard
                icon={MapPin}
                title="Designed & built in the UK"
                description="Supporting local manufacturing and creating technology jobs in Britain."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[#002E5D]" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Help shape the next generation of connected devices
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            We're onboarding pilot users and early partners across all product lines.
          </p>
          
          <form onSubmit={handlePilotSignup} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-14 bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-full px-6 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                data-testid="cta-email-input"
                required
              />
              <Button 
                type="submit"
                disabled={loading}
                className="bg-white text-[#002E5D] hover:bg-slate-100 rounded-full px-8 h-14 text-lg font-medium transition-all"
                data-testid="cta-submit-button"
              >
                {loading ? 'Joining...' : 'Join Pilot'}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
