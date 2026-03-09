import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const   Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const communityRef = useRef(null);
  const location = useLocation();

  // Sticky header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (communityRef.current && !communityRef.current.contains(e.target)) {
        setCommunityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when modal/mobile menu open
  useEffect(() => {
    document.body.style.overflow = (loginModalOpen || mobileMenuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [loginModalOpen, mobileMenuOpen]);

  // Close modal on route change
  useEffect(() => {
    setLoginModalOpen(false);
    setMobileMenuOpen(false);
  }, [location]);

  const communityOptions = [
    { label: 'Family', href: '/community/family' },
    { label: 'Male', href: '/community/male'},
    { label: 'Female', href: '/community/female' },
    { label: 'Combined', href: '/community/combined'},
  ];

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Explore', href: '/explore' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-gray-900'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── LOGO ── */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src="/assets/images/logo.png"
                alt="Jatra"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div
                className="hidden w-10 h-10 bg-green-500 rounded-full items-center justify-center text-white font-bold text-lg"
                style={{ display: 'none' }}
              >
                J
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
              <nav className="hidden lg:flex items-center gap-1">

              {/* Home */}
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive('/') ? 'text-green-400 bg-green-400/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
              >
                Home
              </Link>

              {/* Choose Community Dropdown */}
              <div className="relative" ref={communityRef}>
                <button
                  onClick={() => setCommunityOpen(!communityOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${communityOpen ? 'text-green-400 bg-green-400/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span>Choose Community</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${communityOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {communityOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-gray-800 rounded-xl shadow-xl shadow-black/30 border border-white/10 overflow-hidden z-50">
                    {communityOptions.map((opt) => (
                      <Link
                        key={opt.label}
                        to={opt.href}
                        onClick={() => setCommunityOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-green-500/20 transition-all duration-150"
                      >
                        <span className="text-lg">{opt.icon}</span>
                        <span className="font-medium">{opt.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Nav Links */}
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(link.href) ? 'text-green-400 bg-green-400/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          

            {/* ── LOGIN BUTTON ── */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => { setLoginModalOpen(true); setActiveTab('signin'); }}
                className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 active:scale-95"
              >
                Login
              </button>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          className={`lg:hidden bg-gray-900 border-t border-white/10 overflow-hidden transition-all duration-300
            ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-4 py-4 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
            >
              Home
            </Link>

            {/* Mobile Community */}
            <div>
              <button
                onClick={() => setCommunityOpen(!communityOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
              >
                <span>Choose Community</span>
                <svg className={`w-4 h-4 transition-transform ${communityOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {communityOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-green-500/30 pl-4">
                  {communityOptions.map((opt) => (
                    <Link
                      key={opt.label}
                      to={opt.href}
                      onClick={() => { setCommunityOpen(false); setMobileMenuOpen(false); }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 pb-1">
              <button
                onClick={() => { setLoginModalOpen(true); setActiveTab('signin'); setMobileMenuOpen(false); }}
                className="w-full py-3 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── LOGIN MODAL ── */}
      {loginModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setLoginModalOpen(false); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal Box */}
          <div className="relative bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-white/10 overflow-hidden">

            {/* Close Button */}
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors z-10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 py-4 text-sm font-semibold transition-all duration-200
                  ${activeTab === 'signin'
                    ? 'text-green-400 border-b-2 border-green-400 bg-green-400/5'
                    : 'text-gray-400 hover:text-gray-200'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-4 text-sm font-semibold transition-all duration-200
                  ${activeTab === 'signup'
                    ? 'text-green-400 border-b-2 border-green-400 bg-green-400/5'
                    : 'text-gray-400 hover:text-gray-200'}`}
              >
                Sign Up
              </button>
            </div>

            <div className="p-6">

              {/* ── SIGN IN FORM ── */}
              {activeTab === 'signin' && (
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-white">Welcome Back!</h2>
                    <p className="text-gray-400 text-sm mt-1">Sign in to your Jatra account</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        )}
                      </button>
                    </div>
                    <div className="text-right mt-1.5">
                      <a href="#" className="text-xs text-green-400 hover:text-green-300 transition-colors">Forgot password?</a>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 active:scale-95 mt-2"
                  >
                    Sign In
                  </button>

                  <p className="text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('signup')}
                      className="text-green-400 hover:text-green-300 font-medium transition-colors"
                    >
                      Sign Up
                    </button>
                  </p>
                </form>
              )}

              {/* ── SIGN UP FORM ── */}
              {activeTab === 'signup' && (
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-white">Create Account</h2>
                    <p className="text-gray-400 text-sm mt-1">Join the Jatra community today</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Community</label>
                    <select className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors">
                      <option value="">Select community</option>
                      <option value="family">Family</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="combined">Combined</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 active:scale-95 mt-2"
                  >
                    Create Account
                  </button>

                  <p className="text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('signin')}
                      className="text-green-400 hover:text-green-300 font-medium transition-colors"
                    >
                      Sign In
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
