/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import Logo from './Logo';
import { openWhatsApp } from '../utils/whatsapp';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Flights', href: '#flights' },
  { label: 'Car Rental', href: '#car-rental' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Routes Map', href: '#routes-map' },
  { label: 'Why Us', href: '#why-us' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      // Background styling toggle
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy logic
      const scrollPosition = window.scrollY + 120; // offset for sticky navbar
      let foundSection = '';
      
      for (const item of NAV_ITEMS) {
        const id = item.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            foundSection = id;
          }
        }
      }

      // If scroll position is in flight-routes, map it to flights
      const flightRoutesElement = document.getElementById('flight-routes');
      if (flightRoutesElement) {
        const offsetTop = flightRoutesElement.offsetTop;
        const offsetHeight = flightRoutesElement.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          foundSection = 'flights';
        }
      }

      if (foundSection) {
        setActiveSection(foundSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // sticky header adjustment
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const handleWhatsAppClick = () => {
    openWhatsApp("Hello ABBASU TRAVELS & TOURS! I am interested in booking a flight / renting a car in Gilgit-Baltistan. Please provide me with options.");
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-white/95 backdrop-blur-md shadow-sm py-4'
      }`}
    >
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue via-sky-400 to-brand-orange origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center">
            <Logo variant="dark" />
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex space-x-8 items-center">
            {NAV_ITEMS.map((item) => {
              const id = item.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  id={`nav-link-${id}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative font-sans text-sm font-semibold transition-colors duration-200 py-2 ${
                    isActive ? 'text-brand-blue' : 'text-gray-600 hover:text-brand-blue'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      id={`nav-indicator-${id}`}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* WhatsApp Button */}
          <div className="hidden md:block">
            <button
              id="navbar-whatsapp-btn"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-full font-sans text-sm font-bold transition-all duration-300 transform hover:scale-[1.03] shadow-md hover:shadow-lg cursor-pointer"
            >
              {/* WhatsApp custom SVG */}
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp Us
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-brand-blue p-2 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 rounded"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-white border-t border-gray-100 shadow-inner px-4 py-4 space-y-3">
          {NAV_ITEMS.map((item) => {
            const id = item.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                id={`mobile-nav-link-${id}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block font-sans text-sm font-semibold py-2 px-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-brand-blue/10 text-brand-blue'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-brand-blue'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <button
            id="mobile-navbar-whatsapp-btn"
            onClick={handleWhatsAppClick}
            className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-3 rounded-lg font-sans text-sm font-bold transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp Us
          </button>
        </div>
      )}
    </header>
  );
}
