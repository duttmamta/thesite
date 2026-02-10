import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Cpu, Cloud, Box, Layers, Zap, Shield, RefreshCw, MapPin } from 'lucide-react';

const CapabilityCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
    <div className="w-14 h-14 rounded-xl bg-[#002E5D]/5 flex items-center justify-center mb-6">
      <Icon className="w-7 h-7 text-[#002E5D]" />
    </div>
    <h3 
      className="text-xl font-semibold text-slate-900 mb-3"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {title}
    </h3>
    <p className="text-slate-600 leading-relaxed">
      {description}
    </p>
  </div>
);

export const PlatformPage = () => {
  return (
    <div className="min-h-screen pt-20" data-testid="platform-page">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide uppercase text-[#002E5D] mb-4">
                Platform & Innovation
              </p>
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900 mb-6"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                data-testid="platform-headline"
              >
                One platform, multiple products
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                Xtrec is building a shared IoT hardware and cloud software platform that powers 
                all our devices. This approach reduces cost, improves reliability, and accelerates 
                innovation across product lines.
              </p>
              <Link to="/contact">
                <Button 
                  className="bg-[#002E5D] hover:bg-[#001D3D] text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                  data-testid="platform-cta"
                >
                  Partner with us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Platform Diagram */}
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto bg-slate-50 rounded-3xl p-8 relative">
                {/* Central hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#002E5D] rounded-2xl flex items-center justify-center shadow-xl">
                  <div className="text-center text-white">
                    <Layers className="w-8 h-8 mx-auto mb-1" />
                    <span className="text-xs font-medium">PLATFORM</span>
                  </div>
                </div>
                
                {/* Connected nodes */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-white border-2 border-[#002E5D]/20 rounded-xl flex items-center justify-center shadow-sm">
                  <Cloud className="w-8 h-8 text-[#002E5D]/60" />
                </div>
                <div className="absolute bottom-8 left-8 w-20 h-20 bg-white border-2 border-[#002E5D]/20 rounded-xl flex items-center justify-center shadow-sm">
                  <Cpu className="w-8 h-8 text-[#002E5D]/60" />
                </div>
                <div className="absolute bottom-8 right-8 w-20 h-20 bg-white border-2 border-[#002E5D]/20 rounded-xl flex items-center justify-center shadow-sm">
                  <Box className="w-8 h-8 text-[#002E5D]/60" />
                </div>
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="50%" y1="32%" x2="50%" y2="42%" stroke="#002E5D" strokeWidth="2" strokeOpacity="0.2" />
                  <line x1="28%" y1="72%" x2="42%" y2="58%" stroke="#002E5D" strokeWidth="2" strokeOpacity="0.2" />
                  <line x1="72%" y1="72%" x2="58%" y2="58%" stroke="#002E5D" strokeWidth="2" strokeOpacity="0.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-wide uppercase text-[#002E5D] mb-4">
              Platform Advantages
            </p>
            <h2 
              className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 max-w-3xl mx-auto"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Why a shared platform matters
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CapabilityCard
              icon={Zap}
              title="Faster Innovation"
              description="New products can leverage existing firmware, cloud infrastructure and manufacturing relationships — cutting development time significantly."
            />
            <CapabilityCard
              icon={RefreshCw}
              title="Continuous Improvement"
              description="Updates to the core platform benefit all products simultaneously. Bug fixes and security patches roll out across the entire product range."
            />
            <CapabilityCard
              icon={Shield}
              title="Proven Reliability"
              description="Each new product benefits from battle-tested components and infrastructure that have been refined through real-world use."
            />
            <CapabilityCard
              icon={Cpu}
              title="Shared Hardware"
              description="Common microcontrollers, sensors and connectivity modules reduce component costs and simplify supply chain management."
            />
            <CapabilityCard
              icon={Cloud}
              title="Unified Cloud"
              description="A single cloud backend handles device management, data storage and user authentication across all product lines."
            />
            <CapabilityCard
              icon={MapPin}
              title="UK Manufacturing"
              description="Established relationships with UK-based manufacturers enable rapid prototyping and local production for all products."
            />
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-wide uppercase text-[#002E5D] mb-4">
                Technical Foundation
              </p>
              <h2 
                className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-8"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Built on solid foundations
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-[#002E5D] pl-6">
                  <h4 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Hardware Layer
                  </h4>
                  <p className="text-slate-600">
                    Low-power microcontrollers with WiFi connectivity, designed for reliability 
                    and long-term support. Modular sensor interfaces for product-specific needs.
                  </p>
                </div>
                
                <div className="border-l-4 border-[#002E5D]/60 pl-6">
                  <h4 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Firmware Layer
                  </h4>
                  <p className="text-slate-600">
                    Secure over-the-air updates, efficient power management, and robust 
                    connectivity handling. Shared codebase with product-specific configurations.
                  </p>
                </div>
                
                <div className="border-l-4 border-[#002E5D]/40 pl-6">
                  <h4 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Cloud Layer
                  </h4>
                  <p className="text-slate-600">
                    Scalable backend infrastructure handling device provisioning, data ingestion, 
                    user management and API access. Built for reliability and data privacy.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
              <h3 
                className="text-2xl font-semibold text-slate-900 mb-6"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Platform Capabilities
              </h3>
              <ul className="space-y-4">
                {[
                  "Secure device provisioning & authentication",
                  "Over-the-air firmware updates",
                  "Real-time data ingestion & processing",
                  "User management & access control",
                  "RESTful APIs for third-party integration",
                  "GDPR-compliant data handling",
                  "Scalable to millions of devices",
                  "UK-hosted infrastructure"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#002E5D]" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-24 md:py-32 bg-[#002E5D]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 
            className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Looking to build connected products?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            We're open to partnerships with organisations looking to leverage our platform 
            for their own IoT initiatives.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-white text-[#002E5D] hover:bg-slate-100 rounded-full px-10 py-6 text-lg font-medium transition-all"
              data-testid="platform-bottom-cta"
            >
              Discuss partnership
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PlatformPage;
