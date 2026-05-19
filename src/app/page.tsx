import Link from "next/link";

const features = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    tag: "Prospection",
    title: "Prospect Finder",
    description:
      "Trouvez vos prospects B2B qualifiés en quelques secondes. Filtrez par secteur, taille d'entreprise et localisation pour cibler exactement les bonnes personnes.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    tag: "Intelligence artificielle",
    title: "Assistance IA",
    description:
      "Générez des pitchs sur-mesure, préparez vos appels et obtenez des fiches de synthèse prospect alimentées par GPT-4o — en un seul clic.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    tag: "Analytics",
    title: "Dashboard & Suivi",
    description:
      "Visualisez vos performances en temps réel, suivez vos crédits et analysez votre activité depuis un tableau de bord épuré et intuitif.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "9",
    credits: "100",
    features: ["100 crédits IA", "Prospect Finder", "Export CSV", "Support email"],
    popular: false,
  },
  {
    name: "Pro",
    price: "39",
    credits: "500",
    features: ["500 crédits IA", "Tout le Starter", "Assistance IA avancée", "Historique illimité"],
    popular: true,
  },
  {
    name: "Business",
    price: "129",
    credits: "2 000",
    features: ["2 000 crédits IA", "Tout le Pro", "Multi-utilisateurs", "Support prioritaire"],
    popular: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#222222] bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#333] bg-[#111] text-xs font-bold text-white">
              SA
            </div>
            <span className="font-semibold tracking-tight">Sales Advisor</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#888]">
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#pricing" className="hover:text-white transition-colors">Tarifs</a>
          </nav>
          <Link
            href="/dashboard"
            className="rounded-lg border border-[#333] bg-[#111] px-4 py-2 text-sm font-semibold text-white transition-all hover:border-[#444] hover:bg-[#1a1a1a]"
          >
            Accéder à l'app →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-36 pb-28 px-6 overflow-hidden">
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[700px] opacity-15"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.2) 0%, transparent 65%)" }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#222] bg-[#111] px-4 py-1.5 text-xs font-medium text-[#888]">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            Prospection B2B intelligente · Propulsé par GPT-4o
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] text-balance">
            Prospectez plus vite,{" "}
            <br className="hidden sm:block" />
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #666 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              vendez mieux.
            </span>
          </h1>

          <p className="mt-6 max-w-xl mx-auto text-lg text-[#666] leading-relaxed">
            Sales Advisor combine recherche B2B et IA pour vous aider à identifier, qualifier et approcher les bons prospects — en quelques secondes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98]"
            >
              Commencer gratuitement
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto rounded-xl border border-[#222] bg-[#111] px-8 py-3.5 text-sm font-semibold text-[#888] transition-all hover:border-[#333] hover:text-white"
            >
              Voir les fonctionnalités
            </a>
          </div>

          {/* Dashboard preview */}
          <div className="mt-20 relative mx-auto max-w-3xl">
            <div className="rounded-2xl border border-[#222] bg-[#0a0a0a] p-1 shadow-2xl">
              <div className="rounded-xl border border-[#1a1a1a] bg-[#060606] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a]">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#222]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#222]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#222]" />
                  <div className="ml-3 h-5 flex-1 max-w-48 rounded bg-[#111] text-[#444] text-xs flex items-center px-3">
                    salesadvisor.app/dashboard
                  </div>
                </div>
                <div className="p-5 grid grid-cols-4 gap-3">
                  {["Recherches", "Prospects", "Score moyen", "Crédits"].map((label, i) => (
                    <div key={label} className="rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] p-4">
                      <div className="text-xs text-[#444]">{label}</div>
                      <div className="mt-2 text-xl font-semibold text-white">
                        {["24", "186", "87/100", "450"][i]}
                      </div>
                      <div className="mt-1 text-xs text-[#333]">ce mois</div>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5 grid grid-cols-3 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-16 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a]" />
                  ))}
                </div>
              </div>
            </div>
            <div
              className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 h-24 w-2/3 blur-3xl opacity-10"
              style={{ background: "radial-gradient(ellipse, white 0%, transparent 70%)" }}
            />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-y border-[#111] py-12 px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "2 000+", label: "Prospects / mois" },
            { value: "95%", label: "Précision données" },
            { value: "< 5s", label: "Temps de recherche" },
            { value: "GPT-4o", label: "Modèle IA" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold tracking-tight text-white">{s.value}</div>
              <div className="mt-1 text-sm text-[#555]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" className="py-28 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#444] mb-4">Fonctionnalités</p>
            <h2 className="text-4xl font-bold tracking-tight">Tout ce dont vous avez besoin</h2>
            <p className="mt-4 text-[#555] max-w-lg mx-auto">
              De la recherche de prospects à la préparation de vos appels — tout en un seul outil.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-7 transition-all duration-200 hover:border-[#2a2a2a] hover:bg-[#0f0f0f]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#222] bg-[#111] text-[#888] group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <div className="mt-2 text-xs font-medium text-[#444] uppercase tracking-wider">{f.tag}</div>
                <h3 className="mt-1 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#555]">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-28 px-6 border-t border-[#111]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#444] mb-4">Tarifs</p>
            <h2 className="text-4xl font-bold tracking-tight">Simple et transparent</h2>
            <p className="mt-4 text-[#555]">Payez uniquement ce que vous consommez.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-7 ${
                  plan.popular
                    ? "bg-white text-black"
                    : "border border-[#1a1a1a] bg-[#0a0a0a] text-white"
                }`}
              >
                {plan.popular && (
                  <div className="mb-4 inline-block rounded-full bg-black/10 px-3 py-1 text-xs font-bold text-black/70 uppercase tracking-wider">
                    Populaire
                  </div>
                )}
                <div className={`text-sm font-medium ${plan.popular ? "text-black/50" : "text-[#444]"}`}>
                  {plan.name}
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}€</span>
                  <span className={`text-sm ${plan.popular ? "text-black/40" : "text-[#444]"}`}>/recharge</span>
                </div>
                <div className={`mt-1 text-sm font-medium ${plan.popular ? "text-black/50" : "text-[#555]"}`}>
                  {plan.credits} crédits IA
                </div>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((feat) => (
                    <li key={feat} className={`flex items-center gap-2.5 text-sm ${plan.popular ? "text-black/70" : "text-[#666]"}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l3.5 3.5L12 3" stroke={plan.popular ? "#000" : "#555"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-black text-white hover:bg-black/80"
                      : "border border-[#222] text-white hover:bg-[#111] hover:border-[#333]"
                  }`}
                >
                  Commencer
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 border-t border-[#111]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Prêt à prospecter intelligemment ?
          </h2>
          <p className="mt-5 text-[#555] max-w-md mx-auto leading-relaxed">
            Rejoignez les commerciaux qui utilisent Sales Advisor pour trouver et convertir leurs prospects B2B.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98]"
            >
              Accéder à Sales Advisor →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#111] py-10 px-6">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#222] bg-[#111] text-xs font-bold text-white">
              SA
            </div>
            <span className="text-sm font-semibold">Sales Advisor</span>
          </div>
          <nav className="flex items-center gap-6 text-xs text-[#444]">
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#pricing" className="hover:text-white transition-colors">Tarifs</a>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </nav>
          <p className="text-xs text-[#333]">© 2026 Sales Advisor. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
