import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Globe, Home, Activity, CheckCircle } from 'lucide-react';

const ProductSection = ({ id, title, subtitle, problem, solution, features, graphic: Graphic, badge, reversed }) => (
  <section id={id} className={`py-24 md:py-32 ${reversed ? 'bg-slate-50' : 'bg-white'}`}>
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? 'md:flex-row-reverse' : ''}`}>
        <div className={reversed ? 'md:order-2' : ''}>
          <div className="flex items-center gap-3 mb-4">
            <span className="badge-coming-soon" data-testid={`${id}-badge`}>
              {badge || 'Pilot users welcome'}
            </span>
          </div>
          <h2 
            className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}
            data-testid={`${id}-title`}
          >
            {title}
          </h2>
          <p className="text-lg text-[#002E5D] font-medium mb-6">
            {subtitle}
          </p>
          
          <div className="space-y-6 mb-8">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                The Problem
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {problem}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Our Solution
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {solution}
              </p>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#002E5D] flex-shrink-0 mt-0.5" />
                <span className="text-slate-600">{feature}</span>
              </li>
            ))}
          </ul>

          <Link to="/contact">
            <Button 
              className="bg-[#002E5D] hover:bg-[#001D3D] text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
              data-testid={`${id}-cta`}
            >
              Join the pilot
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className={reversed ? 'md:order-1' : ''}>
          <Graphic />
        </div>
      </div>
    </div>
  </section>
);

// Large abstract graphics for each product
const CarbonGraphicLarge = () => (
  <div className="aspect-square max-w-lg mx-auto rounded-3xl geometric-carbon relative overflow-hidden p-8">
    <div className="absolute inset-0">
      <div className="absolute top-8 left-8 w-32 h-32 border-2 border-[#002E5D]/20 rounded-full animate-pulse" />
      <div className="absolute bottom-16 right-16 w-24 h-24 border-2 border-green-500/30 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#002E5D]/10 rounded-2xl rotate-45" />
      <div className="absolute top-1/4 right-1/3 w-16 h-16 border border-[#002E5D]/15 rounded-lg" />
    </div>
    <div className="relative z-10 h-full flex items-center justify-center">
      <div className="text-center">
        <Globe className="w-24 h-24 text-[#002E5D]/50 mx-auto mb-4" />
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Scope 1, 2 & 3</p>
          <p className="text-2xl font-bold text-[#002E5D]" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Carbon Tracking
          </p>
        </div>
      </div>
    </div>
  </div>
);

const DisplayGraphicLarge = () => (
  <div className="aspect-square max-w-lg mx-auto rounded-3xl geometric-display relative overflow-hidden p-8">
    <div className="absolute inset-0">
      <div className="absolute top-12 right-12 w-32 h-3 bg-slate-200 rounded" />
      <div className="absolute top-20 right-12 w-20 h-3 bg-slate-200 rounded" />
      <div className="absolute bottom-12 left-12 w-28 h-28 border border-slate-200 rounded-2xl" />
    </div>
    <div className="relative z-10 h-full flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-64">
        <div className="flex items-center justify-between mb-4">
          <Home className="w-6 h-6 text-slate-400" />
          <span className="text-xs text-slate-400">LIVE</span>
        </div>
        <div className="space-y-3">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Next train</p>
            <p className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Victoria • 4 min
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Weather</p>
            <p className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              14°C • Cloudy
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SportsGraphicLarge = () => (
  <div className="aspect-square max-w-lg mx-auto rounded-3xl geometric-sports relative overflow-hidden p-8">
    <div className="absolute inset-0">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-300/40 rounded-full" />
      <div className="absolute bottom-16 left-16 w-20 h-20 border-2 border-red-300/50 rounded-full" />
      <div className="absolute top-1/3 right-12 w-8 h-24 bg-amber-200/40 rounded-full rotate-12" />
    </div>
    <div className="relative z-10 h-full flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 inline-block">
          <Activity className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <p className="text-sm text-slate-400 mb-1">Ball Speed</p>
          <p className="text-4xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            82 <span className="text-lg font-normal text-slate-400">mph</span>
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-green-600 font-medium">+5% vs last session</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ProductsPage = () => {
  return (
    <div className="min-h-screen pt-20" data-testid="products-page">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-sm font-medium tracking-wide uppercase text-[#002E5D] mb-4">
            Our Products
          </p>
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900 mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: 'Outfit, sans-serif' }}
            data-testid="products-headline"
          >
            Three focused product lines, one shared platform
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Each product addresses a real need with practical, affordable technology. 
            All built on Xtrec's shared IoT platform.
          </p>
        </div>
      </section>

      {/* Carbon Platform */}
      <ProductSection
        id="carbon"
        title="Carbon Measurement Platform"
        subtitle="Automated emissions reporting for SMEs"
        problem="Small and medium businesses struggle with carbon reporting. Existing solutions are expensive, complex, or require manual data entry that's error-prone and time-consuming."
        solution="Our platform connects directly to accounting software and smart energy sensors to automatically calculate Scope 1, 2 and 3 emissions — giving SMEs accurate reporting without the complexity."
        features={[
          "Automated data collection from financial systems",
          "Real-time energy monitoring via smart sensors",
          "Scope 1, 2 & 3 emissions calculation",
          "Dashboard and reporting for compliance",
          "Affordable pricing for small businesses"
        ]}
        graphic={CarbonGraphicLarge}
        badge="Coming soon"
        reversed={false}
      />

      {/* Ambient Displays */}
      <ProductSection
        id="displays"
        title="Smart Ambient Displays"
        subtitle="Calm information at a glance"
        problem="Modern smart displays are cluttered with ads, notifications and voice assistants. They demand attention rather than providing it calmly when needed."
        solution="Minimalist e-ink and LED displays that show exactly what you need — train times, weather, calendar events — without distraction, privacy invasion or subscription fees."
        features={[
          "Real-time transport information",
          "Local weather and forecasts",
          "Calendar integration",
          "No ads, no voice assistant, no subscriptions",
          "Low power consumption"
        ]}
        graphic={DisplayGraphicLarge}
        badge="Pilot users welcome"
        reversed={true}
      />

      {/* Sports Devices */}
      <ProductSection
        id="sports"
        title="Sports Performance Devices"
        subtitle="Professional-grade tracking at grassroots prices"
        problem="Cricket coaches and players want data-driven training, but professional speed tracking equipment costs thousands. Grassroots clubs and amateur players are priced out."
        solution="Affordable, accurate ball speed tracking hardware that works straight out of the box. Track bowling speeds, monitor progress over time, and coach with real data."
        features={[
          "Accurate ball speed measurement",
          "Session history and progress tracking",
          "Works with any smartphone",
          "Designed for outdoor use",
          "Affordable for clubs and individuals"
        ]}
        graphic={SportsGraphicLarge}
        badge="In development"
        reversed={false}
      />

      {/* Bottom CTA */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 
            className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Interested in early access?
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            We're onboarding pilot users across all product lines. Join us and help shape 
            products that work for real people.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-[#002E5D] hover:bg-[#001D3D] text-white rounded-full px-10 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
              data-testid="products-bottom-cta"
            >
              Get in touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
