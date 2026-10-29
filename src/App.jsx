import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Leaf, Menu, MoveUpRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppleScene from './components/AppleScene.jsx';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Notre histoire', href: '#histoire' },
  { label: 'Savoir-faire', href: '#savoir-faire' },
  { label: 'Engagements', href: '#engagements' },
];

function Mark({ light = false }) {
  return (
    <span className={`brand-symbol ${light ? 'brand-symbol--light' : ''}`} aria-hidden="true">
      <span className="brand-symbol__fruit" />
      <span className="brand-symbol__leaf" />
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <a className="brand" href="#accueil" onClick={() => setOpen(false)} aria-label="Pomera, retour à l'accueil">
        <Mark />
        <span>POMERA<span className="trademark">®</span></span>
      </a>
      <nav className={`header-nav ${open ? 'header-nav--open' : ''}`} aria-label="Navigation principale">
        {NAV_LINKS.map((link, i) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}><span className="nav-count">0{i + 1}</span>{link.label}</a>)}
        <a className="mobile-nav-contact" href="#contact" onClick={() => setOpen(false)}>Nous contacter <ArrowUpRight size={16} /></a>
      </nav>
      <a href="#contact" className="header-cta">Parlons fruits <ArrowUpRight size={16} strokeWidth={1.8}/></a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setOpen((value) => !value)}>
        {open ? <X size={23} /> : <Menu size={23} />}
      </button>
    </header>
  );
}

function SectionIndex({ number, label, contrast = false }) {
  return <span className={`section-index ${contrast ? 'section-index--light' : ''}`}><span>{number}</span><i />{label}</span>;
}

function Hero() {
  return (
    <section className="scene scene--hero" id="accueil">
      <div className="hero-decoration hero-decoration--one" aria-hidden="true" />
      <div className="hero-decoration hero-decoration--two" aria-hidden="true" />
      <div className="scene__container hero-layout">
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> Cultiver l'exceptionnel, naturellement.</div>
          <h1>La nature<br />a du <em>caractère.</em></h1>
          <p className="hero-description">Une pomme. Mille sensations. Un amour sincère du fruit, du verger jusqu'à vous.</p>
          <a href="#histoire" className="pill-button pill-button--red">Découvrir Pomera <ArrowUpRight size={20} /></a>
          <div className="hero-mini-note"><span className="line" /> LES BONNES CHOSES PRENNENT RACINE.</div>
        </div>
      </div>
      <div className="hero-bigword" aria-hidden="true">POMERA</div>
      <div className="hero-side-label" aria-hidden="true">UNE HISTOIRE DE GOÛT — ÉDITION 2026</div>
      <a href="#histoire" className="scroll-hint"><span>SCROLL POUR EXPLORER</span><ArrowDown size={16} /></a>
      <div className="hero-counter">01 <span>/</span> 05</div>
    </section>
  );
}

function About() {
  return (
    <section className="scene scene--about" id="histoire">
      <div className="grainy-orbit" aria-hidden="true" />
      <div className="scene__container split-layout split-layout--right">
        <div className="copy-block" data-reveal>
          <SectionIndex number="01" label="NOTRE HISTOIRE" />
          <h2>Tout commence<br />avec un <span className="serifish">pépin.</span></h2>
          <p>Chez Pomera, nous croyons aux plaisirs simples, ceux qui ont du sens. Une pomme croquante, une terre vivante, et des gestes cultivés avec patience.</p>
          <p>Pas de superflu. Juste l'essentiel, avec beaucoup de cœur et un peu d'audace.</p>
          <a className="text-link" href="#savoir-faire">Notre philosophie <span><ArrowUpRight size={19}/></span></a>
        </div>
      </div>
      <div className="scene-corner scene-corner--left">01 — LA SOURCE DU GOÛT</div>
      <span className="about-round-badge" aria-hidden="true"><span>GOOD FRUIT<br />GOOD MOOD</span><span className="badge-star">✳</span></span>
    </section>
  );
}

function Craft() {
  return (
    <section className="scene scene--craft" id="savoir-faire">
      <div className="scene__container split-layout split-layout--left">
        <div className="copy-block copy-block--craft" data-reveal>
          <SectionIndex number="02" label="LE SAVOIR-FAIRE" />
          <h2>Le vrai goût<br />se <span className="serifish">cultive.</span></h2>
          <p>Une belle pomme n'a pas besoin d'artifices. Du soleil, de l'attention et le temps qu'il faut pour révéler le meilleur de chaque récolte.</p>
          <div className="qualities">
            <div className="quality"><span className="quality-icon"><Leaf size={20} strokeWidth={1.5}/></span><div><strong>Respect du vivant</strong><small>La nature, toujours en premier.</small></div></div>
            <div className="quality"><span className="quality-icon"><Check size={20} strokeWidth={1.6}/></span><div><strong>Qualité choisie</strong><small>Le bon goût, sans compromis.</small></div></div>
          </div>
          <a className="text-link" href="#engagements">Ce qui nous anime <span><ArrowUpRight size={19}/></span></a>
        </div>
      </div>
      <div className="craft-vertical-type" aria-hidden="true">FRAÎCHEUR BRUTE.</div>
      <div className="craft-ring" aria-hidden="true" />
    </section>
  );
}

function Commitments() {
  return (
    <section className="scene scene--commit" id="engagements">
      <div className="scene__container split-layout split-layout--right">
        <div className="copy-block copy-block--commit" data-reveal>
          <SectionIndex number="03" label="NOS ENGAGEMENTS" />
          <h2>Moins de<br />bla-bla. <span className="serifish">Plus de bon.</span></h2>
          <p>Nous imaginons une autre façon de célébrer le fruit. Plus proche de la terre, plus attentive aux détails, et franchement plus savoureuse.</p>
          <div className="promise-list">
            <div><span>01</span><strong>Une culture responsable</strong><MoveUpRight size={19}/></div>
            <div><span>02</span><strong>Une fraîcheur sans détour</strong><MoveUpRight size={19}/></div>
            <div><span>03</span><strong>Le plaisir de partager</strong><MoveUpRight size={19}/></div>
          </div>
        </div>
      </div>
      <div className="commit-circle" aria-hidden="true" />
      <span className="commit-caption">FAIT AVEC LE CŒUR, PARTAGÉ AVEC LE SOURIRE.</span>
    </section>
  );
}

function Contact() {
  return (
    <section className="scene scene--contact" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="scene__container contact-layout">
        <div className="contact-head" data-reveal>
          <SectionIndex number="04" label="ET MAINTENANT ?" contrast />
          <h2>La suite est<br /><em>à croquer.</em></h2>
          <p>Le plus beau reste à cultiver. Rejoignez-nous dans cette aventure délicieusement différente.</p>
          <a href="mailto:bonjour@pomera.example?subject=Bonjour%20Pomera" className="pill-button pill-button--cream">Dire bonjour <ArrowUpRight size={19}/></a>
        </div>
      </div>
      <div className="contact-side-tag">POMERA — LE BON GOÛT DES CHOSES SIMPLES</div>
      <div className="contact-bottom"><span>UN PEU DE NATURE DANS CHAQUE BOUCHÉE.</span><span>05 / 05</span></div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a href="#accueil" className="footer-brand"><Mark light /><span>POMERA<span className="trademark">®</span></span></a>
      <p>Concept créatif de marque fictive.<br />Une expérience 3D réalisée avec Blender, React et Three.js.</p>
      <div className="footer-right"><span>DESIGN • DEVELOPMENT • 3D</span><a href="#accueil">Retour en haut <ArrowUpRight size={16}/></a></div>
      <div className="footer-rule" />
      <div className="footer-bottom">
        <small>© 2026 POMERA CONCEPT. PROJET DE PORTFOLIO.</small>
        <div className="footer-credit">
          <span className="footer-credit__label">MADE BY</span>
          <strong>OMGBA PAUL KEVIN</strong>
          <a href="mailto:kevinomgba1@gmail.com" aria-label="Envoyer un email à Omgba Paul Kevin">
            kevinomgba1@gmail.com <ArrowUpRight size={15} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return <div className="progress-track" aria-hidden="true"><div style={{ transform: `scaleX(${progress})` }} /></div>;
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      document.querySelectorAll('[data-reveal]').forEach((element) => {
        gsap.from(element.children, {
          y: 44,
          opacity: 0,
          duration: 0.9,
          stagger: 0.11,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 84%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ProgressBar />
      <Header />
      <AppleScene />
      <main id="site-sections">
        <Hero />
        <About />
        <Craft />
        <Commitments />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
