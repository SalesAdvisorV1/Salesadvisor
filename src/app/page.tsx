'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const HeroCanvas = dynamic(() => import('@/components/landing/hero-canvas'), { ssr: false });

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString('fr-FR')}{suffix}</span>;
}

const TESTIMONIALS = [
  { quote: "En 2 semaines, j'ai trouvé plus de prospects qualifiés qu'en 3 mois avec mes anciennes méthodes.", name: "Thomas Renard", role: "SDR @ TechCorp", initials: "TR" },
  { quote: "L'outil idéal pour cibler exactement les décideurs et préparer chaque appel avec un brief complet.", name: "Sophie Martin", role: "Freelance B2B", initials: "SM" },
  { quote: "Le ROI est immédiat : moins de temps de recherche, plus de temps de vente.", name: "Marc Leblanc", role: "Directeur Commercial", initials: "ML" },
];

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [activeT, setActiveT] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const t = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const handler = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return (
    <div className="min-h-screen bg-[#040404] text-white overflow-x-hidden selection:bg-white selection:text-black">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '200px' }} />
      <div className="fixed pointer-events-none z-10" style={{ left: cursor.x - 200, top: cursor.y - 200, width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', borderRadius: '50%' }} />
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#040404]/70 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-black text-[11px] font-black">SA</span>
            </div>
            <span className="font-bold text-sm tracking-tight">Sales Advisor</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {[['#features','Fonctionnalités'],['#process','Processus'],['#pricing','Tarifs']].map(([href,label]) => (
              <a key={href} href={href} className="text-white/30 hover:text-white transition-colors duration-200 text-[10px] tracking-[0.2em] uppercase">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[10px] text-white/30 hover:text-white transition-colors hidden md:block tracking-[0.2em] uppercase">Connexion</Link>
            <Link href="/register" className="text-[10px] bg-white text-black px-5 py-2.5 rounded-xl font-black hover:bg-white/90 active:scale-95 transition-all duration-150 tracking-[0.2em] uppercase">Démarrer</Link>
          </div>
        </div>
      </header>
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0"><HeroCanvas /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#040404]/20 via-transparent to-[#040404] z-10 pointer-events-none" />
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-20 text-center max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2 text-[10px] text-white/30 border border-white/[0.08] rounded-full px-4 py-2 mb-10 bg-white/[0.03] backdrop-blur-sm tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Propulsé par GPT-4o · Données B2B françaises
          </motion.div>
          {[['Prospectez', 'text-white', 0.4],['plus vite,', 'text-white/20', 0.55],['vendez mieux.', 'text-white', 0.7]].map(([text, color, delay]) => (
            <div key={text as string} className="overflow-hidden mb-2">
              <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: delay as number, ease: "easeOut" }}
                className={`text-[clamp(3rem,10vw,8rem)] font-black tracking-[-0.04em] leading-none ${color}`}>
                {text}
              </motion.h1>
            </div>
          ))}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }}
            className="text-white/30 max-w-xl mx-auto text-base leading-relaxed mb-10 mt-8">
            Sales Advisor combine recherche B2B et intelligence artificielle pour identifier, qualifier et approcher vos prospects en quelques secondes.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }}
            className="flex items-center justify-center gap-4">
            <Link href="/register" className="bg-white text-black px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-white/90 active:scale-95 transition-all duration-150 shadow-[0_0_60px_rgba(255,255,255,0.12)] tracking-wide">Commencer gratuitement</Link>
            <a href="#features" className="border border-white/10 text-white/50 px-8 py-3.5 rounded-2xl font-medium text-sm hover:border-white/25 hover:text-white transition-all duration-200">Voir les fonctionnalités</a>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            className="text-[11px] text-white/15 mt-5 tracking-widest uppercase">Pas de carte bancaire · Accès immédiat</motion.p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <span className="text-[10px] text-white/15 tracking-[0.3em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>
      <section className="py-24 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4">
            {[{value:2000,suffix:'+',label:'Prospects / mois'},{value:95,suffix:'%',label:'Précision données'},{value:5,suffix:'s',label:'Temps de recherche'},{value:500,suffix:'+',label:'Entreprises analysées'}].map((stat,i) => (
              <motion.div key={i} variants={fadeUp} className="text-center py-8 border-r border-white/[0.06] last:border-0">
                <p className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums tracking-tight"><Counter target={stat.value} suffix={stat.suffix} /></p>
                <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section id="features" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
            <motion.p variants={fadeUp} className="text-[10px] text-white/20 tracking-[0.4em] uppercase mb-6">Fonctionnalités</motion.p>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-[-0.03em] leading-none max-w-3xl">Tout ce dont<br /><span className="text-white/20">vous avez besoin</span></motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
            {[
              {tag:'Prospection',title:'Prospect Finder',desc:'Trouvez vos prospects B2B qualifiés en quelques secondes. Filtrez par secteur, taille, ville et poste ciblé.',detail:'Données vérifiées · Export CSV',num:'01'},
              {tag:'Intelligence Artificielle',title:'Assistance IA',desc:'Générez des pitchs sur-mesure, préparez vos appels et obtenez des fiches de synthèse complètes.',detail:'GPT-4o · Pitch · Résumé · Appel',num:'02'},
              {tag:'Analytics',title:'Dashboard & Suivi',desc:'Visualisez vos performances et analysez votre activité depuis un tableau de bord centralisé.',detail:'Temps réel · Exports · Stats',num:'03'},
            ].map((f,i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }} viewport={{ once: true }}
                className="group bg-[#040404] p-10 hover:bg-white/[0.03] transition-all duration-500 cursor-default">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase">{f.tag}</span>
                  <span className="text-[10px] text-white/10 font-mono">{f.num}</span>
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-white transition-colors duration-300">{f.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed mb-12">{f.desc}</p>
                <p className="text-[10px] text-white/15 tracking-[0.2em] uppercase border-t border-white/[0.06] pt-6">{f.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="process" className="py-40 px-6 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
            <motion.p variants={fadeUp} className="text-[10px] text-white/20 tracking-[0.4em] uppercase mb-6">Processus</motion.p>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-[-0.03em] leading-none">3 étapes<br /><span className="text-white/20">simples</span></motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-20">
            {[
              {num:'01',title:'Définissez vos critères',desc:'Secteur, ville, taille d\'entreprise et poste ciblé. Notre IA adapte la recherche à vos besoins.'},
              {num:'02',title:'L\'IA trouve vos prospects',desc:'En quelques secondes, obtenez une liste de prospects qualifiés avec scores, contacts et informations.'},
              {num:'03',title:'Approchez et convertissez',desc:'Utilisez nos pitchs personnalisés et préparations d\'appel pour maximiser vos chances.'},
            ].map((step,i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }} viewport={{ once: true }}>
                <span className="text-[10px] font-mono text-white/15 tracking-widest block mb-8">{step.num}</span>
                <h3 className="text-xl font-black tracking-tight mb-4">{step.title}</h3>
                <p className="text-white/25 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-40 px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeT} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }} className="absolute inset-0">
                <p className="text-2xl md:text-4xl font-black tracking-tight text-white/50 leading-tight mb-10 italic">"{TESTIMONIALS[activeT].quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-white/40">{TESTIMONIALS[activeT].initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/70">{TESTIMONIALS[activeT].name}</p>
                    <p className="text-xs text-white/25">{TESTIMONIALS[activeT].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex gap-2 mt-16">
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={() => setActiveT(i)}
                className={`h-px transition-all duration-500 ${i === activeT ? 'bg-white w-12' : 'bg-white/20 w-4 hover:bg-white/40'}`} />
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="py-40 px-6 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24">
            <motion.p variants={fadeUp} className="text-[10px] text-white/20 tracking-[0.4em] uppercase mb-6">Tarifs</motion.p>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-[-0.03em] leading-none">Simple et<br /><span className="text-white/20">transparent</span></motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
            {[
              {name:'Starter',price:'9',credits:'100 crédits / mois',features:['Prospect Finder','Assistance IA','Export CSV','Support email'],highlight:false},
              {name:'Pro',price:'39',credits:'500 crédits / mois',features:['Tout Starter','Pitchs personnalisés','Préparation appel','Support prioritaire'],highlight:true},
              {name:'Business',price:'129',credits:'2 000 crédits / mois',features:['Tout Pro','Multi-utilisateurs','API access','CRM intégrations'],highlight:false},
            ].map((plan,i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }} viewport={{ once: true }}
                className={`p-10 relative ${plan.highlight ? 'bg-white text-black' : 'bg-[#040404] hover:bg-white/[0.02] transition-colors duration-500'}`}>
                <p className={`text-[10px] tracking-[0.3em] uppercase mb-8 ${plan.highlight ? 'text-black/30' : 'text-white/20'}`}>{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-7xl font-black tracking-tight ${plan.highlight ? 'text-black' : 'text-white'}`}>{plan.price}€</span>
                  <span className={`text-sm ${plan.highlight ? 'text-black/40' : 'text-white/20'}`}>/mois</span>
                </div>
                <p className={`text-xs mb-10 ${plan.highlight ? 'text-black/40' : 'text-white/20'}`}>{plan.credits}</p>
                <ul className="space-y-3 mb-12">
                  {plan.features.map((f,j) => (
                    <li key={j} className={`text-sm flex items-center gap-3 ${plan.highlight ? 'text-black/70' : 'text-white/30'}`}>
                      <span className={`text-xs ${plan.highlight ? 'text-black/40' : 'text-white/20'}`}>—</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block text-center py-3.5 rounded-xl text-xs font-black tracking-[0.15em] uppercase transition-all duration-150 active:scale-95 ${
                  plan.highlight ? 'bg-black text-white hover:bg-gray-900' : 'border border-white/10 text-white/50 hover:border-white/25 hover:text-white'
                }`}>Choisir {plan.name}</Link>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[11px] text-white/15 mt-8 tracking-widest uppercase">14 jours d'essai gratuit · Sans engagement</p>
        </div>
      </section>
      <section className="py-48 px-6 border-t border-white/[0.06] text-center relative overflow-hidden">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="relative z-10 max-w-4xl mx-auto">
          <motion.p variants={fadeUp} className="text-[10px] text-white/15 tracking-[0.4em] uppercase mb-10">Rejoignez 500+ commerciaux</motion.p>
          <motion.h2 variants={fadeUp} className="text-6xl md:text-[8rem] font-black tracking-[-0.04em] leading-none mb-10">
            <span className="text-white">Commencez</span><br /><span className="text-white/15">aujourd'hui.</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
            <Link href="/register" className="bg-white text-black px-10 py-4 rounded-2xl font-black text-sm hover:bg-white/90 active:scale-95 transition-all duration-150 tracking-wide shadow-[0_0_80px_rgba(255,255,255,0.15)]">
              Créer mon compte gratuit →
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-[10px] text-white/10 mt-6 tracking-widest uppercase">Pas de carte bancaire · Accès immédiat · Résiliable à tout moment</motion.p>
        </motion.div>
      </section>
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
              <span className="text-black text-[10px] font-black">SA</span>
            </div>
            <span className="text-white/20 text-sm font-medium">Sales Advisor</span>
          </Link>
          <p className="text-[11px] text-white/10 tracking-widest uppercase">© 2026 Sales Advisor</p>
          <div className="flex gap-8 text-[11px] text-white/15 tracking-widest uppercase">
            <a href="#" className="hover:text-white transition-colors">CGU</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
