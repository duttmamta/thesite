import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { MapPin, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-100" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo className="mb-6" />
            <p className="text-slate-600 text-base leading-relaxed max-w-md mb-6">
              Smart connected technology for everyday life and a sustainable future. 
              Designed & built in the UK.
            </p>
            <div className="flex flex-col gap-3 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>United Kingdom</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@xtrec.co.uk" className="hover:text-[#002E5D] transition-colors">
                  hello@xtrec.co.uk
                </a>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Products
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products#carbon" className="text-slate-600 hover:text-[#002E5D] transition-colors">
                  Carbon Platform
                </Link>
              </li>
              <li>
                <Link to="/products#displays" className="text-slate-600 hover:text-[#002E5D] transition-colors">
                  Ambient Displays
                </Link>
              </li>
              <li>
                <Link to="/products#sports" className="text-slate-600 hover:text-[#002E5D] transition-colors">
                  Sports Devices
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/platform" className="text-slate-600 hover:text-[#002E5D] transition-colors">
                  Platform
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-slate-600 hover:text-[#002E5D] transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-[#002E5D] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Xtrec Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-[#002E5D] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#002E5D] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
