/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Logo from './Logo';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    alert(`${label} will be opened in a modal or new page. For immediate inquiries, please use WhatsApp.`);
  };

  const sitemapLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Flight Booking', href: '#flights' },
    { label: 'Flight Connections', href: '#flight-routes' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Car Rental & Fleet', href: '#car-rental' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'How to Book', href: '#how-to-book' },
    { label: 'Frequently Asked Questions', href: '#faq' },
    { label: 'Contact Us', href: '#contact' },
  ];

  const popularRoutes = [
    { label: 'Skardu ↔ Islamabad', href: '#flight-routes' },
    { label: 'Skardu ↔ Lahore', href: '#flight-routes' },
    { label: 'Skardu ↔ Karachi', href: '#flight-routes' },
    { label: 'Dubai / Gulf Connect', href: '#flight-routes' },
  ];

  const socials = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer id="main-footer" className="bg-slate-50 text-slate-600 border-t border-slate-200/80 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-slate-200/60">
          
          {/* Column 1: Brand Profile */}
          <div className="lg:col-span-4 space-y-6 flex flex-col items-start">
            <div id="footer-logo-card" className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/50 inline-block">
              <Logo variant="dark" />
            </div>
            <p className="font-sans text-sm text-slate-500 leading-relaxed max-w-sm">
              Majestic adventures in Gilgit-Baltistan. Premium tour planners, international flight booking agents, and the most reliable luxury vehicle rental service in northern Pakistan.
            </p>
            
            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-slate-400">Connect With Us</h4>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white hover:bg-brand-blue text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick-Access Sitemap */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-display text-sm font-bold text-brand-dark tracking-wide relative inline-block">
              Sitemap
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-brand-orange mt-1.5 block" />
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2.5">
              {sitemapLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-slate-500 hover:text-brand-blue transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-brand-blue transition-colors duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Flight Connections */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-display text-sm font-bold text-brand-dark tracking-wide relative inline-block">
              Popular Flights
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-brand-orange mt-1.5 block" />
            </h4>
            <ul className="space-y-3">
              {popularRoutes.map((route) => (
                <li key={route.label}>
                  <a
                    href={route.href}
                    className="font-sans text-sm text-slate-500 hover:text-brand-blue transition-colors duration-200 flex items-center justify-between group"
                  >
                    <span>{route.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-brand-blue" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office Info */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-display text-sm font-bold text-brand-dark tracking-wide relative inline-block">
              ABBASU Head Office
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-brand-orange mt-1.5 block" />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <span>Main Airport Road, Near PIA Booking Office, Skardu, Gilgit-Baltistan, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <Phone className="w-5 h-5 text-brand-blue shrink-0" />
                <a href="tel:+923421458721" className="hover:text-brand-blue transition-colors font-medium">+92 (342) 145-8721</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <Mail className="w-5 h-5 text-brand-blue shrink-0" />
                <a href="mailto:abbasutravelsandtours@gmail.com" className="hover:text-brand-blue transition-colors font-medium">abbasutravelsandtours@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-sans text-xs text-slate-400 text-center md:text-left">
            &copy; {currentYear} ABBASU Travels &amp; Tours. All rights reserved. Majestic travel packages across Gilgit-Baltistan &amp; northern areas of Pakistan.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-400">
            <a
              id="footer-link-privacy"
              href="#privacy"
              onClick={(e) => handleLinkClick(e, 'Privacy Policy')}
              className="hover:text-brand-blue transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span className="text-slate-200 hidden sm:inline">•</span>
            <a
              id="footer-link-terms"
              href="#terms"
              onClick={(e) => handleLinkClick(e, 'Terms of Service')}
              className="hover:text-brand-blue transition-colors duration-200"
            >
              Terms of Service
            </a>
            <span className="text-slate-200 hidden sm:inline">•</span>
            <a
              id="footer-link-insurance"
              href="#insurance"
              onClick={(e) => handleLinkClick(e, 'Travel Insurance')}
              className="hover:text-brand-blue transition-colors duration-200"
            >
              Travel Insurance
            </a>
            <span className="text-slate-200 hidden sm:inline">•</span>
            <a
              id="footer-link-cancellation"
              href="#cancellation"
              onClick={(e) => handleLinkClick(e, 'Cancellation Policy')}
              className="hover:text-brand-blue transition-colors duration-200"
            >
              Cancellation Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

