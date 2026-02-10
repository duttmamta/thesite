import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Leaf, Zap, BarChart3, Globe, Building2, TreePine } from 'lucide-react';

const StatCard = ({ value, label, icon: Icon }) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center">
    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
      <Icon className="w-7 h-7 text-green-600" />
    </div>
    <p 
      className="text-4xl md:text-5xl font-bold text-[#002E5D] mb-2"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {value}
    </p>
    <p className="text-slate-600">{label}</p>
  </div>
);

const PillarCard = ({ icon: Icon, title, description }) => (
  <div className="flex gap-5 items-start">
    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center">
      <Icon className="w-7 h-7 text-green-600" />
    </div>
    <div>
      <h3 
        className="text-xl font-semibold text-slate-900 mb-2"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export const SustainabilityPage = () => {
  return (
    <div className="min-h-screen pt-20" data-testid="sustainability-page">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 border-2 border-green-500 rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-green-500 rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Sustainability at the core
            </div>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900 mb-6"
              style={{ fontFamily: 'Outfit, sans-serif' }}
              data-testid="sustainability-headline"
            >
              Technology for a net-zero future
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
              Sustainability isn't an afterthought at Xtrec — it's fundamental to why we exist. 
              We build products that help people and businesses reduce their environmental impact 
              while making smarter everyday choices.
            </p>
            <Link to="/products#carbon">
              <Button 
                className="bg-[#002E5D] hover:bg-[#001D3D] text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                data-testid="sustainability-cta"
              >
                Explore Carbon Platform
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard
              value="99%"
              label="of UK businesses are SMEs"
              icon={Building2}
            />
            <StatCard
              value="50%"
              label="of SME emissions are unmeasured"
              icon={BarChart3}
            />
            <StatCard
              value="2050"
              label="UK net-zero target year"
              icon={Globe}
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide uppercase text-green-600 mb-4">
                Our Mission
              </p>
              <h2 
                className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Enabling SMEs to measure, understand and reduce emissions
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                The UK has committed to net-zero by 2050, but small and medium businesses — 
                which make up 99% of all UK businesses — often lack the tools and resources 
                to measure and report their carbon footprint accurately.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our Carbon Measurement Platform is designed specifically for SMEs: affordable, 
                automated, and accurate. We connect to existing financial systems and add 
                real-world energy measurement through smart sensors.
              </p>
            </div>

            <div className="bg-green-50 rounded-3xl p-8 md:p-12">
              <h3 
                className="text-2xl font-semibold text-slate-900 mb-8"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                What we measure
              </h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#002E5D]" />
                    <h4 className="font-semibold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Scope 1 — Direct Emissions
                    </h4>
                  </div>
                  <p className="text-slate-600 text-sm pl-6">
                    On-site fuel combustion, company vehicles, refrigerants
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#002E5D]/70" />
                    <h4 className="font-semibold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Scope 2 — Energy Emissions
                    </h4>
                  </div>
                  <p className="text-slate-600 text-sm pl-6">
                    Purchased electricity, heating, cooling
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#002E5D]/40" />
                    <h4 className="font-semibold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Scope 3 — Value Chain Emissions
                    </h4>
                  </div>
                  <p className="text-slate-600 text-sm pl-6">
                    Business travel, purchased goods, waste disposal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-wide uppercase text-green-600 mb-4">
              Our Approach
            </p>
            <h2 
              className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Sustainability through technology
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <PillarCard
              icon={BarChart3}
              title="Measure accurately"
              description="Automated data collection from financial systems combined with real-world energy sensors eliminates guesswork and manual data entry."
            />
            <PillarCard
              icon={Globe}
              title="Report confidently"
              description="Generate compliant emissions reports for stakeholders, investors and regulatory requirements without specialist expertise."
            />
            <PillarCard
              icon={Zap}
              title="Build efficient products"
              description="All Xtrec devices are designed for minimal power consumption, using energy-efficient components and intelligent sleep modes."
            />
            <PillarCard
              icon={TreePine}
              title="Enable better choices"
              description="Our ambient displays help households and offices make smarter transport and energy decisions through real-time information."
            />
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-sm font-medium tracking-wide uppercase text-[#002E5D] mb-4">
            Our Commitment
          </p>
          <h2 
            className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-8"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Walking the talk
          </h2>
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 text-left">
            <ul className="space-y-4">
              {[
                "UK-based manufacturing to minimise shipping emissions",
                "Low-power device design as standard across all products",
                "Recyclable and minimal packaging",
                "Cloud infrastructure powered by renewable energy",
                "Carbon reporting on our own operations (when scaling)",
                "Supporting SMEs to meet their sustainability goals"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <Leaf className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[#002E5D]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 
            className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Ready to measure your carbon footprint?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join our pilot programme and be among the first SMEs to use 
            our automated carbon measurement platform.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-white text-[#002E5D] hover:bg-slate-100 rounded-full px-10 py-6 text-lg font-medium transition-all"
              data-testid="sustainability-bottom-cta"
            >
              Join the pilot
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityPage;
