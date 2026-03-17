import { useState, useEffect, useRef } from "react";

const SereneAIHomepage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [count, setCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const countStarted = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (countStarted.current) return;
    countStarted.current = true;
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= 1000000) {
          clearInterval(timer);
          return 1000000;
        }
        return prev + 21000;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#F5F2EC", color: "#1A1A1A", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 24px 48px; display: flex; justify-content: space-between;
          align-items: center; transition: all 0.4s ease;
        }
        .nav.scrolled {
          background: rgba(245,242,236,0.96); backdrop-filter: blur(10px);
          padding: 16px 48px; border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .nav-logo {
          font-family: 'Cormorant Garamond', serif; font-size: 22px;
          font-weight: 300; letter-spacing: 3px; text-transform: uppercase;
          cursor: pointer;
        }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a {
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          letter-spacing: 1.5px; text-transform: uppercase; color: #1A1A1A;
          text-decoration: none; opacity: 0.6; transition: opacity 0.2s;
          cursor: pointer; background: none; border: none;
        }
        .nav-links a:hover { opacity: 1; }
        .waitlist-btn {
          background: #1A1A1A; color: #F5F2EC;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 10px 24px; border: none; cursor: pointer; transition: all 0.3s;
        }
        .waitlist-btn:hover { background: #2E7D5E; }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span { display: block; width: 24px; height: 2px; background: #1A1A1A; transition: all 0.3s; }

        /* ── HERO ── */
        .hero {
          min-height: 100vh; display: grid;
          grid-template-columns: 1fr 1fr; position: relative;
        }
        .hero-left {
          padding: 160px 48px 80px; display: flex;
          flex-direction: column; justify-content: center;
        }
        .hero-right {
          position: relative; overflow: hidden; background: #1A1A1A;
        }
        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          letter-spacing: 2px; text-transform: uppercase;
          color: #2E7D5E; margin-bottom: 32px;
        }
        .badge-dot {
          width: 6px; height: 6px; background: #2E7D5E;
          border-radius: 50%; animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 5.5vw, 76px); font-weight: 300;
          line-height: 1.05; letter-spacing: -1px;
        }
        .hero-headline em { font-style: italic; color: #2E7D5E; }
        .hero-sub {
          font-family: 'DM Sans', sans-serif; font-size: 16px;
          font-weight: 300; line-height: 1.7; color: #555;
          max-width: 400px; margin: 28px 0 48px;
        }
        .hero-cta-group { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
        .cta-primary {
          background: #1A1A1A; color: #F5F2EC;
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 16px 36px; border: none; cursor: pointer; transition: all 0.3s;
        }
        .cta-primary:hover { background: #2E7D5E; }
        .cta-secondary {
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          letter-spacing: 1px; color: #1A1A1A; text-decoration: none;
          border-bottom: 1px solid rgba(0,0,0,0.4); padding-bottom: 2px;
          opacity: 0.6; transition: opacity 0.2s; cursor: pointer;
          background: none; border-top: none; border-left: none; border-right: none;
        }
        .cta-secondary:hover { opacity: 1; }
        .proof-strip {
          margin-top: 64px; padding-top: 40px;
          border-top: 1px solid rgba(0,0,0,0.12);
        }
        .proof-label {
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          letter-spacing: 2px; text-transform: uppercase;
          color: #888; margin-bottom: 16px;
        }
        .proof-stat {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px; font-weight: 300;
        }
        .proof-stat-label {
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          letter-spacing: 1px; color: #666; margin-top: 4px;
        }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .floating-card {
          position: absolute; top: 120px; right: 40px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 20px 24px; max-width: 220px; backdrop-filter: blur(4px);
          animation: floatCard 4s ease-in-out infinite;
        }
        @keyframes floatCard {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)}
        }
        .card-icon { font-size: 20px; margin-bottom: 8px; }
        .card-text {
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          color: rgba(255,255,255,0.7); line-height: 1.5;
        }
        .hero-visual {
          width: 100%; height: 100%; display: flex;
          flex-direction: column; justify-content: flex-end;
          padding: 48px; position: relative;
        }
        .visual-tag {
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.4); margin-bottom: 8px;
        }
        .visual-principle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px; font-weight: 300; color: white; line-height: 1.2;
        }
        .visual-principle em { font-style: italic; color: #6EC9A4; }
        .visual-desc {
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: rgba(255,255,255,0.5); line-height: 1.6;
          margin-top: 16px; max-width: 320px;
        }

        /* ── PAIN POINTS ── */
        .pain { padding: 100px 48px; background: #EFECE5; }
        .pain-label {
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          letter-spacing: 3px; text-transform: uppercase;
          color: #888; margin-bottom: 16px;
        }
        .pain-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 3.5vw, 48px); font-weight: 300;
          line-height: 1.1; max-width: 600px; margin-bottom: 64px;
        }
        .pain-headline em { font-style: italic; color: #2E7D5E; }
        .pain-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px;
          background: rgba(0,0,0,0.1);
        }
        .pain-card {
          background: #EFECE5; padding: 40px 36px;
          transition: background 0.3s;
        }
        .pain-card:hover { background: #E8E4DC; }
        .pain-card-icon { font-size: 28px; margin-bottom: 20px; }
        .pain-card-title {
          font-family: 'Cormorant Garamond', serif; font-size: 22px;
          font-weight: 400; margin-bottom: 12px; line-height: 1.2;
        }
        .pain-card-desc {
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          line-height: 1.7; color: #666;
        }
        .pain-card-stat {
          font-family: 'Cormorant Garamond', serif; font-size: 36px;
          font-weight: 300; color: #2E7D5E; margin-top: 16px;
        }

        /* ── SERVICES ── */
        .services { padding: 120px 48px; display: grid; grid-template-columns: 1fr 3fr; gap: 80px; }
        .services-label {
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          letter-spacing: 3px; text-transform: uppercase; color: #888; padding-top: 8px;
        }
        .services-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 1px; background: rgba(0,0,0,0.1);
        }
        .service-card {
          background: #F5F2EC; padding: 40px 32px;
          transition: background 0.3s; cursor: default;
        }
        .service-card:hover { background: #1A1A1A; color: white; }
        .service-card:hover .service-num { color: #6EC9A4; }
        .service-card:hover .service-desc { color: rgba(255,255,255,0.6); }
        .service-card:hover .service-bullets li { color: rgba(255,255,255,0.5); }
        .service-num {
          font-family: 'Cormorant Garamond', serif; font-size: 13px;
          color: #2E7D5E; letter-spacing: 2px; margin-bottom: 24px; display: block;
        }
        .service-name {
          font-family: 'Cormorant Garamond', serif; font-size: 26px;
          font-weight: 400; margin-bottom: 16px; line-height: 1.2;
        }
        .service-desc {
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          line-height: 1.7; color: #666; margin-bottom: 20px;
        }
        .service-bullets {
          list-style: none; padding: 0;
        }
        .service-bullets li {
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          color: #888; padding: 6px 0;
          border-top: 1px solid rgba(0,0,0,0.07);
          letter-spacing: 0.5px;
        }
        .service-bullets li::before { content: "→ "; color: #2E7D5E; }

        /* ── ETHOS ── */
        .ethos {
          padding: 120px 48px; background: #1A1A1A; color: white;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .ethos-label {
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          letter-spacing: 3px; text-transform: uppercase;
          color: #6EC9A4; margin-bottom: 24px;
        }
        .ethos-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 3.5vw, 52px); font-weight: 300; line-height: 1.1;
        }
        .ethos-headline em { font-style: italic; color: #6EC9A4; }
        .ethos-body {
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          line-height: 1.8; color: rgba(255,255,255,0.6);
        }
        .ethos-principles { margin-top: 40px; display: flex; flex-direction: column; }
        .principle {
          padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex; gap: 20px; align-items: flex-start;
        }
        .principle-num {
          font-family: 'Cormorant Garamond', serif; font-size: 18px;
          color: #6EC9A4; flex-shrink: 0; padding-top: 2px;
        }
        .principle-text {
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          line-height: 1.6; color: rgba(255,255,255,0.7);
        }
        .principle-text strong {
          color: white; font-weight: 500;
          display: block; margin-bottom: 4px;
        }

        /* ── FOUNDER ── */
        .founder { padding: 120px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .founder-label {
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          letter-spacing: 3px; text-transform: uppercase; color: #888; margin-bottom: 24px;
        }
        .founder-name {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 56px);
          font-weight: 300; line-height: 1.05; margin-bottom: 8px;
        }
        .founder-name em { font-style: italic; color: #2E7D5E; }
        .founder-title {
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          letter-spacing: 2px; text-transform: uppercase; color: #888; margin-bottom: 40px;
        }
        .founder-quote {
          font-family: 'Cormorant Garamond', serif; font-size: 22px;
          font-weight: 300; font-style: italic; line-height: 1.5;
          color: #333; border-left: 2px solid #2E7D5E;
          padding-left: 24px; margin-bottom: 32px;
        }
        .founder-body {
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          line-height: 1.8; color: #555; margin-bottom: 32px;
        }
        .founder-linkedin {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          letter-spacing: 2px; text-transform: uppercase;
          color: #1A1A1A; text-decoration: none;
          border-bottom: 1px solid #1A1A1A; padding-bottom: 2px;
          opacity: 0.6; transition: opacity 0.2s;
        }
        .founder-linkedin:hover { opacity: 1; }
        .founder-stats { display: flex; flex-direction: column; gap: 1px; background: rgba(0,0,0,0.08); }
        .founder-stat {
          background: #F5F2EC; padding: 32px 36px;
          transition: background 0.3s;
        }
        .founder-stat:hover { background: #EEEBe4; }
        .founder-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 44px; font-weight: 300; color: #2E7D5E; line-height: 1;
        }
        .founder-stat-label {
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          color: #666; margin-top: 8px; line-height: 1.5;
        }

        /* ── HOW WE WORK ── */
        .process { padding: 100px 48px; background: #EFECE5; }
        .process-header { display: grid; grid-template-columns: 1fr 2fr; gap: 80px; margin-bottom: 64px; }
        .process-label {
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          letter-spacing: 3px; text-transform: uppercase; color: #888; padding-top: 6px;
        }
        .process-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 3.5vw, 46px); font-weight: 300; line-height: 1.1;
        }
        .process-headline em { font-style: italic; color: #2E7D5E; }
        .process-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(0,0,0,0.1); }
        .process-step {
          background: #EFECE5; padding: 40px 32px; transition: background 0.3s;
        }
        .process-step:hover { background: #E6E2DA; }
        .step-num {
          font-family: 'Cormorant Garamond', serif; font-size: 48px;
          font-weight: 300; color: rgba(0,0,0,0.12); line-height: 1; margin-bottom: 20px;
        }
        .step-title {
          font-family: 'Cormorant Garamond', serif; font-size: 24px;
          font-weight: 400; margin-bottom: 12px;
        }
        .step-desc {
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          line-height: 1.7; color: #666;
        }
        .step-detail {
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          color: #2E7D5E; margin-top: 16px; font-style: italic;
        }

        /* ── WAITLIST ── */
        .waitlist-section { padding: 120px 48px; text-align: center; }
        .waitlist-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 5vw, 64px); font-weight: 300; line-height: 1.1; margin-bottom: 16px;
        }
        .waitlist-headline em { font-style: italic; color: #2E7D5E; }
        .waitlist-sub {
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          color: #666; margin-bottom: 48px; max-width: 480px; margin-left: auto; margin-right: auto;
        }
        .waitlist-form { display: flex; gap: 0; max-width: 480px; margin: 0 auto 16px; }
        .waitlist-input {
          flex: 1; padding: 16px 20px; border: 1px solid #1A1A1A;
          border-right: none; background: transparent;
          font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none;
        }
        .waitlist-input:focus { border-color: #2E7D5E; }
        .waitlist-submit {
          background: #1A1A1A; color: white; border: none;
          padding: 16px 28px; font-family: 'DM Sans', sans-serif;
          font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; transition: background 0.3s;
        }
        .waitlist-submit:hover { background: #2E7D5E; }
        .waitlist-success {
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: #2E7D5E; letter-spacing: 1px;
        }
        .waitlist-note {
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          color: #999; letter-spacing: 0.5px;
        }

        /* ── FOOTER ── */
        .footer {
          padding: 40px 48px; border-top: 1px solid rgba(0,0,0,0.1);
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;
        }
        .footer-logo {
          font-family: 'Cormorant Garamond', serif; font-size: 18px;
          font-weight: 300; letter-spacing: 3px; text-transform: uppercase;
        }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a {
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          color: #888; text-decoration: none; transition: color 0.2s;
        }
        .footer-links a:hover { color: #1A1A1A; }
        .footer-copy { font-family: 'DM Sans', sans-serif; font-size: 12px; color: #aaa; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .nav { padding: 20px 24px; }
          .nav.scrolled { padding: 14px 24px; }
          .nav-links { display: none; }
          .waitlist-btn { display: none; }
          .hamburger { display: flex; }
          .mobile-menu {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: #1A1A1A; z-index: 99; display: flex;
            flex-direction: column; align-items: center; justify-content: center;
            gap: 32px;
          }
          .mobile-menu a {
            font-family: 'Cormorant Garamond', serif; font-size: 36px;
            font-weight: 300; color: white; text-decoration: none;
            letter-spacing: 2px; cursor: pointer;
          }
          .mobile-menu-close {
            position: absolute; top: 24px; right: 24px;
            background: none; border: none; color: white;
            font-size: 32px; cursor: pointer;
          }
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-left { padding: 120px 24px 60px; }
          .hero-right { min-height: 50vh; }
          .floating-card { top: 24px; right: 16px; }
          .services { grid-template-columns: 1fr; gap: 40px; padding: 80px 24px; }
          .services-grid { grid-template-columns: 1fr; }
          .pain { padding: 80px 24px; }
          .pain-grid { grid-template-columns: 1fr; }
          .ethos { grid-template-columns: 1fr; padding: 80px 24px; gap: 40px; }
          .founder { grid-template-columns: 1fr; padding: 80px 24px; gap: 40px; }
          .process { padding: 80px 24px; }
          .process-header { grid-template-columns: 1fr; gap: 20px; }
          .process-steps { grid-template-columns: 1fr; }
          .waitlist-section { padding: 80px 24px; }
          .waitlist-form { flex-direction: column; }
          .waitlist-input { border-right: 1px solid #1A1A1A; border-bottom: none; }
          .footer { padding: 32px 24px; flex-direction: column; align-items: flex-start; gap: 20px; }
          .proof-stat { font-size: 40px; }
        }
      `}</style>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>✕</button>
          <a onClick={() => scrollTo("services")}>Services</a>
          <a onClick={() => scrollTo("how-we-work")}>How We Work</a>
          <a onClick={() => scrollTo("about")}>About</a>
          <a onClick={() => scrollTo("waitlist")}>Join Waitlist</a>
        </div>
      )}

      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>SereneAI</div>
        <ul className="nav-links">
          <li><a onClick={() => scrollTo("services")}>Services</a></li>
          <li><a onClick={() => scrollTo("how-we-work")}>How We Work</a></li>
          <li><a onClick={() => scrollTo("about")}>About</a></li>
        </ul>
        <button className="waitlist-btn" onClick={() => scrollTo("waitlist")}>Join Waitlist</button>
        <button className="hamburger" onClick={() => setMenuOpen(true)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="badge">
            <span className="badge-dot"></span>
            Launching Soon · UK-Based · Contact Centre Specialists
          </div>
          <h1 className="hero-headline">
            AI built for<br />
            contact centres<br />
            that <em>keeps people</em><br />
            in control.
          </h1>
          <p className="hero-sub">
            Privacy-first automation and AI consultancy for UK contact centres.
            Honest pricing, UK-hosted data, and tools your agents will actually trust.
          </p>
          <div className="hero-cta-group">
            <button className="cta-primary" onClick={() => scrollTo("waitlist")}>Join the Waitlist</button>
            <button className="cta-secondary" onClick={() => scrollTo("services")}>See our services →</button>
          </div>
          <div className="proof-strip">
            <div className="proof-label">Proven at scale</div>
            <div className="proof-stat">{count >= 1000000 ? "1,000,000+" : count.toLocaleString()}</div>
            <div className="proof-stat-label">Automation uses delivered at a FTSE-250 company</div>
          </div>
        </div>
        <div className="hero-right">
          <div className="grid-overlay"></div>
          <div className="floating-card">
            <div className="card-icon">🔒</div>
            <div className="card-text">100% UK-hosted. Your customer data never leaves your control.</div>
          </div>
          <div className="hero-visual">
            <div className="visual-tag">Our Founding Principle</div>
            <div className="visual-principle">
              Technology should<br />earn <em>trust,</em> not<br />demand it.
            </div>
            <div className="visual-desc">
              Every tool we build is auditable, bias-aware, and explainable to the agents and supervisors who use it every day.
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="pain" id="pain">
        <div className="pain-label">Sound familiar?</div>
        <h2 className="pain-headline">
          The contact centre problems<br />
          AI should <em>already</em> be solving.
        </h2>
        <div className="pain-grid">
          {[
            { icon: "🕐", title: "Wrap-up time killing capacity", desc: "Agents spending up to 30% of every shift on manual call logging, after-call work, and admin that adds no value to the customer.", stat: "~30%" },
            { icon: "📋", title: "New starters taking too long to ramp", desc: "8–12 weeks before new agents reach full competency, burning training budget and reducing service quality during peak periods.", stat: "8–12 wks" },
            { icon: "🔁", title: "The same questions, every single day", desc: "Ten common query types driving 60% of your inbound volume — handled manually, every time, by agents who could be doing something more complex.", stat: "60%" },
            { icon: "⚠️", title: "GDPR exposure hiding in plain sight", desc: "Unstructured call notes, manual data entry, and legacy routing systems creating compliance risk that most AI vendors don't acknowledge.", stat: "UK GDPR" },
          ].map((p, i) => (
            <div className="pain-card" key={i}>
              <div className="pain-card-icon">{p.icon}</div>
              <div className="pain-card-title">{p.title}</div>
              <div className="pain-card-desc">{p.desc}</div>
              <div className="pain-card-stat">{p.stat}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services" id="services">
        <div className="services-label">What we build</div>
        <div className="services-grid">
          {[
            {
              num: "01", name: "Contact Centre Efficiency Audit",
              desc: "A structured review of your contact centre operations — where time is lost, where GDPR risk lives, and what to automate first. Clear, costed next steps.",
              bullets: ["Workshops & process mapping", "Quick-win identification", "Costed automation roadmap"]
            },
            {
              num: "02", name: "Intelligent Call Routing & Self-Serve",
              desc: "Handle common enquiries automatically, route complex calls to the right agent first time, and reduce queue time — all powered 100% in the UK.",
              bullets: ["AI-powered call routing", "Self-serve query resolution", "Full audit logs & dashboards"]
            },
            {
              num: "03", name: "Agent Assist & Supervisor Tools",
              desc: "Real-time guidance for agents during calls, automated after-call summaries, and supervisor dashboards that surface what matters — not more noise.",
              bullets: ["Live agent prompts", "Automated call wrap-up", "Compliance monitoring"]
            },
          ].map((s, i) => (
            <div className="service-card" key={i}>
              <span className="service-num">{s.num}</span>
              <div className="service-name">{s.name}</div>
              <div className="service-desc">{s.desc}</div>
              <ul className="service-bullets">
                {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── ETHOS ── */}
      <section className="ethos">
        <div>
          <div className="ethos-label">Why SereneAI</div>
          <h2 className="ethos-headline">
            Built on the belief that<br /><em>ethical AI</em> is<br />better AI.
          </h2>
        </div>
        <div>
          <p className="ethos-body">
            SereneAI was founded after building automations used over a million times at Sky —
            systems designed to be transparent, auditable, and trusted by frontline teams during a 60%
            leadership reduction. That experience — delivering under pressure, for real people — shapes
            everything we build.
          </p>
          <div className="ethos-principles">
            {[
              ["Privacy by design", "No unnecessary data collection. UK-hosted. Always under your control. No US servers, no hidden data sharing."],
              ["Explainability first", "Your agents, supervisors, and compliance team can understand and challenge every decision the system makes."],
              ["People stay in control", "AI handles the repetitive. Humans handle the complex and the human. That's how it should be."],
            ].map(([title, desc], i) => (
              <div className="principle" key={i}>
                <span className="principle-num">0{i + 1}</span>
                <div className="principle-text">
                  <strong>{title}</strong>{desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / FOUNDER ── */}
      <section className="founder" id="about">
        <div>
          <div className="founder-label">The Founder</div>
          <div className="founder-name">Daniel<br /><em>Turner</em></div>
          <div className="founder-title">Founder & Director, SereneAI Ltd</div>
          <blockquote className="founder-quote">
            "It is okay to pause your dreams and help someone reach theirs —
            if, in return, you gain experience that can power your own."
          </blockquote>
          <p className="founder-body">
            My career has been built around creating systems that people trust — not just because they
            function well, but because they are designed with ethics and user empowerment at their core.
            At Sky, I developed large-scale automations used over a million times, built to be auditable,
            bias-aware, and explainable to frontline teams. SereneAI is the natural next step: bringing
            that same rigour to UK contact centres who deserve better than black-box AI and US-hosted data.
          </p>
          <a
            className="founder-linkedin"
            href="https://www.linkedin.com/in/danielcjturner"
            target="_blank"
            rel="noreferrer"
          >
            Connect on LinkedIn →
          </a>
        </div>
        <div className="founder-stats">
          {[
            { num: "1M+", label: "Automation uses delivered at a FTSE-250 company" },
            { num: "4", label: "Large-scale automations built at Sky" },
            { num: "UK", label: "100% UK-hosted — Blackpool, England" },
            { num: "2025", label: "SereneAI Ltd incorporated, Company No. 16646814" },
          ].map((s, i) => (
            <div className="founder-stat" key={i}>
              <div className="founder-stat-num">{s.num}</div>
              <div className="founder-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="process" id="how-we-work">
        <div className="process-header">
          <div className="process-label">How we work</div>
          <h2 className="process-headline">
            Straightforward stages,<br /><em>clear outcomes.</em>
          </h2>
        </div>
        <div className="process-steps">
          {[
            {
              num: "01", title: "Discover",
              desc: "We spend time in your contact centre — listening to calls, reviewing workflows, and talking to agents and supervisors. Not a sales pitch. A genuine audit.",
              detail: "Typically 1–2 weeks. No commitment required."
            },
            {
              num: "02", title: "Build",
              desc: "We start small, prove impact fast, then expand. No 12-month waterfall projects. You see results before you commit to the next phase.",
              detail: "First automation live within 4–6 weeks."
            },
            {
              num: "03", title: "Support",
              desc: "Hands-on monitoring and updates so the tech keeps working for your team — not just at launch. We stay close, especially in the first 90 days.",
              detail: "Monthly reviews. Direct access to Daniel."
            },
          ].map((s, i) => (
            <div className="process-step" key={i}>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
              <div className="step-detail">{s.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section className="waitlist-section" id="waitlist">
        <h2 className="waitlist-headline">
          Be first when<br />we <em>launch.</em>
        </h2>
        <p className="waitlist-sub">
          We're currently accepting expressions of interest from UK contact centres.
          Leave your email and we'll be in touch when we're ready to take on new clients.
        </p>
        {submitted ? (
          <div className="waitlist-success">✓ &nbsp; You're on the list. We'll be in touch.</div>
        ) : (
          <>
            <div className="waitlist-form">
              <input
                className="waitlist-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleWaitlist(e)}
              />
              <button className="waitlist-submit" onClick={handleWaitlist}>Notify Me</button>
            </div>
            <div className="waitlist-note">No spam. Just a note when we're ready.</div>
          </>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">SereneAI</div>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms</a>
          <a href="mailto:daniel.turner@sereneai.co.uk">Contact</a>
          <a href="https://www.linkedin.com/in/danielcjturner" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <div className="footer-copy">© 2025 SereneAI Ltd · Company No. 16646814 · Blackpool, UK</div>
      </footer>
    </div>
  );
};

export default SereneAIHomepage;
