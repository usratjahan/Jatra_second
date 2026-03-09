import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//  MOCK API  →  Replace with real fetch('/api/...') when ready


const fetchHeroData = async () => ({
  title_line1: 'Carried by clouds,',
  title_line2: 'guided by dreams.',
  //  Fixed: clean single URL — the freepik image you wanted
  background_image:
    'https://img.freepik.com/free-photo/cloud-forest-landscape_23-2151794637.jpg?semt=ais_hybrid&w=1920&q=85',
  cta_primary:   { label: 'Explore Now', href: '/explore' },
  cta_secondary: { label: 'View Events', href: '/events' },
});

// ── GET /api/communities
const fetchCommunitiesData = async () => [
  {
    id: 'family',
    href: '/community/family',
  
    title: 'Family',
    subtitle: 'Travel Together',
    description: 'Safe and memorable trips designed for families of all sizes.',
    member_count: '2.4k families',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80',
    theme: {
      gradient: 'from-amber-500 to-orange-500',
      accent_color: '#f59e0b',
      badge_bg: 'rgba(245,158,11,0.15)',
      badge_border: 'rgba(245,158,11,0.3)',
      badge_text: '#fbbf24',
    },
  },
  {
    id: 'male',
    href: '/community/male',
    
    title: 'Male',
    subtitle: 'Brotherhood Adventures',
    description: 'Conquer mountains, deserts, and oceans with fellow explorers.',
    member_count: '5.1k travelers',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=700&q=80',
    theme: {
      gradient: 'from-blue-500 to-cyan-500',
      accent_color: '#3b82f6',
      badge_bg: 'rgba(59,130,246,0.15)',
      badge_border: 'rgba(59,130,246,0.3)',
      badge_text: '#60a5fa',
    },
  },
  {
    id: 'female',
    href: '/community/female',
    
    title: 'Female',
    subtitle: 'Sisterhood Journeys',
    description: 'Empowering women to explore the world with confidence.',
    member_count: '3.8k explorers',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=700&q=80',
    theme: {
      gradient: 'from-pink-500 to-rose-500',
      accent_color: '#ec4899',
      badge_bg: 'rgba(236,72,153,0.15)',
      badge_border: 'rgba(236,72,153,0.3)',
      badge_text: '#f472b6',
    },
  },
  {
    id: 'combined',
    href: '/community/combined',
    
    title: 'Combined',
    subtitle: 'United Wanderers',
    description: 'A diverse community for everyone — travel as one global family.',
    member_count: '9.2k members',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=700&q=80',
    theme: {
      gradient: 'from-green-500 to-emerald-500',
      accent_color: '#22c55e',
      badge_bg: 'rgba(34,197,94,0.15)',
      badge_border: 'rgba(34,197,94,0.3)',
      badge_text: '#4ade80',
    },
  },
];

//  COMMUNITY CARD


const CommunityCard = ({ comm, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={comm.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block relative rounded-2xl overflow-hidden cursor-pointer w-full h-full"
      style={{
        boxShadow: hovered
          ? `0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px ${comm.theme.accent_color}50`
          : '0 16px 48px rgba(0,0,0,0.55)',
        transform: hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
      }}
    >
      {/* BG image */}
      <div className="absolute inset-0">
        <img
          src={comm.image}
          alt={comm.title}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.7s ease',
          }}
        />
        {/* Gradient overlay — dark bottom for text readability */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(4,4,10,0.97) 0%, rgba(4,4,10,0.55) 55%, rgba(4,4,10,0.1) 100%)',
        }} />
        {/* Coloured accent line at bottom — visible on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{
          background: `linear-gradient(to right, ${comm.theme.accent_color}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }} />
      </div>

      {/* Card content */}
      <div className="relative z-10 p-5 flex flex-col justify-between h-full">

        {/* TOP: emoji + member badge */}
        <div className="flex items-start justify-between">
          <span style={{
            fontSize: '2rem',
            lineHeight: 1,
            display: 'inline-block',
            transform: hovered ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}>
            {comm.emoji}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{
            background: comm.theme.badge_bg,
            border: `1px solid ${comm.theme.badge_border}`,
            color: comm.theme.badge_text,
            backdropFilter: 'blur(8px)',
          }}>
            {comm.member_count}
          </span>
        </div>

        {/* BOTTOM: label + title + desc + cta */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: comm.theme.badge_text }}>
            {comm.subtitle}
          </p>
          <h3 className="text-white font-black text-2xl mb-2">{comm.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4" style={{
            opacity: hovered ? 1 : 0.65,
            transition: 'opacity 0.3s ease',
          }}>
            {comm.description}
          </p>
          <div className="flex items-center gap-2 text-sm font-bold" style={{
            color: comm.theme.badge_text,
            transform: hovered ? 'translateX(5px)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
          }}>
            <span>Join Community</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

//  HOME PAGE


const HomePage = () => {
  const [heroData, setHeroData]               = useState(null);
  const [communitiesData, setCommunitiesData] = useState(null);
  const [loaded, setLoaded]                   = useState(false);

  useEffect(() => {
    Promise.all([fetchHeroData(), fetchCommunitiesData()])
      .then(([hero, communities]) => {
        setHeroData(hero);
        setCommunitiesData(communities);
        setTimeout(() => setLoaded(true), 80);
      });
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#050508', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,900;1,900&display=swap');

        .hero-title { font-family: 'Playfair Display', serif; line-height: 1.08; }

        .gradient-text {
          background: linear-gradient(135deg, #4ade80 0%, #22d3ee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulseDot {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          50%      { box-shadow: 0 0 0 10px rgba(74,222,128,0); }
        }

        .fade-up  { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
        .fade-in  { animation: fadeIn 1.2s ease forwards; opacity: 0; }
        .pulse-dot { animation: pulseDot 2s ease infinite; }

        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.25s; }
        .d3 { animation-delay: 0.45s; }
        .d4 { animation-delay: 0.65s; }

        /* Cards stagger */
        .card-wrap { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
        .cw1 { animation-delay: 0.55s; }
        .cw2 { animation-delay: 0.68s; }
        .cw3 { animation-delay: 0.81s; }
        .cw4 { animation-delay: 0.94s; }

        /* Responsive cards grid */
        .cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        @media (max-width: 1024px) { .cards-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px)  { .cards-grid { grid-template-columns: 1fr; } }

        /* Skeleton pulse */
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%);
          background-size: 800px 100%;
          animation: shimmer 1.4s infinite linear;
          border-radius: 16px;
        }
      `}</style>

      {/* 
          HERO SECTION  (background fills full viewport height)
      */}
      <section className="relative flex flex-col" style={{ minHeight: '100vh' }}>

        {/* ── Background image — always full viewport ── */}
        <div className="absolute inset-0 overflow-hidden">
          {heroData ? (
            <img
              src={heroData.background_image}
              alt="Hero background"
              className="fade-in"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          ) : (
            /* Placeholder dark bg while image loads */
            <div style={{ width: '100%', height: '100%', background: '#0a0f0a' }} />
          )}

          {/*  Lighter overlay so the image SHOWS through clearly */}
          {/* Top is almost transparent, bottom darkens for card legibility */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(5,5,8,0.70) 72%, rgba(5,5,8,0.97) 100%)',
          }} />

          {/* Subtle green radial tint — left mid */}
          <div className="absolute pointer-events-none" style={{
            top: '30%', left: '-80px',
            width: '520px', height: '520px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)',
          }} />
        </div>

        {/* ── HERO TEXT — sits in the upper ~60% of the viewport ── */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-4"
          style={{
            flexGrow: 1,
            paddingTop: '120px',
            //  Big bottom padding pushes the text UP, creating clear gap before cards
            paddingBottom: '200px',
          }}
        >
          {/* Badge pill */}
          {/* {loaded && (
            <div className="fade-up d1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7" style={{
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.25)',
            }}> 
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
              <span className="text-sm font-medium" style={{ color: '#4ade80' }}>
                Join 20,000+ travelers worldwide
              </span>
            </div>
          )} */}

          {/* Main heading */}
          {loaded && heroData && (
            <h1
              className="hero-title fade-up d2 text-white"
              style={{ fontSize: 'clamp(1rem, 4vw, 3rem)', marginBottom: '24px' }}
            >
              {heroData.title_line1}<br />
              <span className="gradient-text italic">{heroData.title_line2}</span>
            </h1>
          )}

          {/* CTA buttons */}
          {loaded && heroData && (
            <div className="fade-up d3 flex flex-wrap justify-center gap-4" style={{ marginTop: '8px' }}>
              <Link
                to={heroData.cta_primary.href}
                className="inline-flex items-center gap-2.5 font-bold rounded-full text-white"
                style={{
                  padding: '13px 32px',
                  fontSize: '15px',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  boxShadow: '0 8px 32px rgba(34,197,94,0.38)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 14px 40px rgba(34,197,94,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(34,197,94,0.38)';
                }}
              >
                {heroData.cta_primary.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                to={heroData.cta_secondary.href}
                className="inline-flex items-center gap-2 font-semibold rounded-full"
                style={{
                  padding: '13px 32px',
                  fontSize: '15px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  transition: 'background 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {heroData.cta_secondary.label}
              </Link>
            </div>
          )}
        </div>

        {/* ── COMMUNITY CARDS — anchored to the bottom, overlapping hero ── */}
        <div className="relative z-10 w-full" style={{ padding: '0 20px 60px' }}>

          {/* "Choose Your Community" label */}
          {loaded && (
            <div className="fade-up d4 text-center" style={{ marginBottom: '24px' }}>
              <span style={{
                color: 'rgba(200,210,200,0.7)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}>
                Choose Your Community
              </span>
              <div style={{
                marginTop: '8px',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '48px',
                height: '2px',
                borderRadius: '2px',
                background: 'linear-gradient(to right, #22c55e, transparent)',
              }} />
            </div>
          )}

          {/* Cards grid */}
          {loaded && communitiesData ? (
            <div className="cards-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
              {communitiesData.map((comm, i) => (
                <div
                  key={comm.id}
                  className={`card-wrap cw${i + 1}`}
                  style={{ height: '360px' }}
                >
                  <CommunityCard comm={comm} index={i} />
                </div>
              ))}
            </div>
          ) : (
            /* Skeleton */
            <div className="cards-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton" style={{ height: '360px' }} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
