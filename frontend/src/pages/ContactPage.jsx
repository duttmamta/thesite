import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MapPin, Mail, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (value) => {
    setFormData(prev => ({ ...prev, interest: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.interest) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you soon.'
      });
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20" data-testid="contact-page">
        <section className="py-32 md:py-40 bg-white">
          <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 
              className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Thank you for reaching out
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              We've received your message and will get back to you shortly. 
              Check your email for a confirmation.
            </p>
            <Button 
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', interest: '', message: '' });
              }}
              variant="outline"
              className="border-2 border-slate-200 text-slate-900 hover:border-[#002E5D] rounded-full px-8 py-4"
              data-testid="contact-send-another"
            >
              Send another message
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" data-testid="contact-page">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide uppercase text-[#002E5D] mb-4">
              Contact Us
            </p>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900 mb-6"
              style={{ fontFamily: 'Outfit, sans-serif' }}
              data-testid="contact-headline"
            >
              Let's talk
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Whether you're interested in joining our pilot programme, exploring partnership 
              opportunities, or just want to learn more — we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
              <h2 
                className="text-2xl font-semibold text-slate-900 mb-8"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Get in touch
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="h-14 bg-slate-50 border-slate-200 focus:border-[#002E5D] focus:ring-1 focus:ring-[#002E5D] rounded-xl"
                    data-testid="contact-name-input"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="h-14 bg-slate-50 border-slate-200 focus:border-[#002E5D] focus:ring-1 focus:ring-[#002E5D] rounded-xl"
                    data-testid="contact-email-input"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest" className="text-slate-700 font-medium">
                    I'm interested in <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={handleInterestChange} value={formData.interest}>
                    <SelectTrigger 
                      className="h-14 bg-slate-50 border-slate-200 focus:border-[#002E5D] focus:ring-1 focus:ring-[#002E5D] rounded-xl"
                      data-testid="contact-interest-select"
                    >
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carbon-platform">Carbon Measurement Platform</SelectItem>
                      <SelectItem value="ambient-displays">Smart Ambient Displays</SelectItem>
                      <SelectItem value="sports-devices">Sports Performance Devices</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                      <SelectItem value="general">General Enquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-700 font-medium">
                    Message <span className="text-slate-400 font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your interest..."
                    rows={5}
                    className="bg-slate-50 border-slate-200 focus:border-[#002E5D] focus:ring-1 focus:ring-[#002E5D] rounded-xl resize-none"
                    data-testid="contact-message-input"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#002E5D] hover:bg-[#001D3D] text-white rounded-full h-14 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                  data-testid="contact-submit-button"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      Send message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 
                  className="text-2xl font-semibold text-slate-900 mb-6"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Other ways to reach us
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#002E5D]/5 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#002E5D]" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 mb-1">Email</p>
                      <a 
                        href="mailto:hello@xtrec.co.uk" 
                        className="text-slate-600 hover:text-[#002E5D] transition-colors"
                      >
                        hello@xtrec.co.uk
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#002E5D]/5 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#002E5D]" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 mb-1">Location</p>
                      <p className="text-slate-600">
                        United Kingdom
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ-style info */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100">
                <h4 
                  className="font-semibold text-slate-900 mb-4"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  What happens next?
                </h4>
                <ol className="space-y-4 text-slate-600">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#002E5D]/10 text-[#002E5D] text-sm font-medium flex items-center justify-center">
                      1
                    </span>
                    <span>We'll review your message and get back within 2 business days</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#002E5D]/10 text-[#002E5D] text-sm font-medium flex items-center justify-center">
                      2
                    </span>
                    <span>If you're joining the pilot, we'll share next steps and timeline</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#002E5D]/10 text-[#002E5D] text-sm font-medium flex items-center justify-center">
                      3
                    </span>
                    <span>For partnerships, we'll arrange a call to discuss opportunities</span>
                  </li>
                </ol>
              </div>

              {/* Pilot info */}
              <div className="bg-[#002E5D]/5 rounded-2xl p-8">
                <h4 
                  className="font-semibold text-slate-900 mb-3"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Pilot Programme
                </h4>
                <p className="text-slate-600 mb-4">
                  We're actively onboarding pilot users across all product lines. 
                  As a pilot user, you'll get:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#002E5D]" />
                    Early access to products in development
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#002E5D]" />
                    Direct input into product features
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#002E5D]" />
                    Preferential pricing when products launch
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
