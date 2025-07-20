'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePopup } from '@/hooks/use-popup';

interface NavbarProps {
  onCardHighlight?: (cardType: 'farmer' | 'consumer' | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCardHighlight }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { openPopup } = usePopup();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const sections = ['hero', 'features', 'about', 'cta'];
      const scrollPosition = window.scrollY + 100;

      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    sectionId: string,
    e: React.MouseEvent,
    cardType?: 'farmer' | 'consumer'
  ) => {
    e.preventDefault();

    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }

    if (cardType && onCardHighlight) {
      setTimeout(() => {
        onCardHighlight(cardType);
        setTimeout(() => onCardHighlight(null), 3000);
      }, 500);
    }

    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'Features', id: 'features' },
    { name: 'About', id: 'about' },
    { name: 'For Farmers', id: 'cta', cardType: 'farmer' as const },
    { name: 'For Consumers', id: 'cta', cardType: 'consumer' as const }
  ];

  const getVisibleNavItems = () => {
    if (activeSection === 'hero') {
      return navItems;
    } else {
      return navItems.filter(item => item.name !== 'Home');
    }
  };

  const getLinkClass = (item: any) => {
    const baseClass = isScrolled
      ? 'text-gray-700 hover:text-emerald-600'
      : 'text-white hover:text-gray-200';

    let isActive = false;
    if (item.id === 'hero' && activeSection === 'hero') {
      isActive = true;
    } else if (item.id === activeSection && item.id !== 'hero') {
      isActive = true;
    }

    const activeClass = isScrolled ? 'text-emerald-600' : 'text-emerald-300';

    return isActive ? `${baseClass.split(' ')[0]} ${activeClass}` : baseClass;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 font-inter ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 shadow-lg'
          : 'bg-transparent border-b-0 shadow-none'
      }`}
    >
      <div className="max-w-full mx-auto px-8 lg:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/navbar-logo.png" 
              alt="FieldFair" 
              className="w-20 h-20 transition-all duration-300 ease-out hover:scale-110 cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {getVisibleNavItems().map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(item.id, e, item.cardType)}
                className={`relative ${getLinkClass(item)} transition-all duration-300 font-medium text-base group tracking-wide`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-300 ${
                    (item.id === 'hero' && activeSection === 'hero') ||
                    (item.id === activeSection && item.id !== 'hero')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
            <button 
              onClick={() => openPopup('signin', 'general')}
              className="group relative bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2.5 rounded-xl font-medium text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-500 overflow-hidden tracking-wide"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Sign In</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-3 rounded-lg transition-colors duration-300 ${
              isScrolled
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-transparent hover:bg-white/20 text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`lg:hidden transition-colors duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-2xl border-t border-gray-200/50 shadow-xl'
              : 'bg-transparent backdrop-blur-xl border-t-0 shadow-none'
          }`}
        >
          <div className="px-8 py-8 space-y-6">
            {getVisibleNavItems().map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(item.id, e, item.cardType)}
                className={`block text-base ${
                  (item.id === 'hero' && activeSection === 'hero') ||
                  (item.id === activeSection && item.id !== 'hero')
                    ? isScrolled
                      ? 'text-emerald-600'
                      : 'text-emerald-300'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-white'
                } hover:text-emerald-600 font-medium py-3 transition-colors tracking-wide`}
              >
                {item.name}
              </a>
            ))}
            <button 
              onClick={() => openPopup('signin', 'general')}
              className="group relative w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-medium text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-500 overflow-hidden tracking-wide"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Sign In</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;