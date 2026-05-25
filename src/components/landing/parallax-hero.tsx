'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

export default function ParallaxHero() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]')
    if (!triggerElement) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: '0% 0%',
        end: '100% 0%',
        scrub: 0,
      },
    })

    const layers = [
      { layer: '1', yPercent: 70 },
      { layer: '2', yPercent: 55 },
      { layer: '3', yPercent: 40 },
      { layer: '4', yPercent: 10 },
    ]

    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        { yPercent: layerObj.yPercent, ease: 'none' },
        idx === 0 ? undefined : '<'
      )
    })

    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    const tickerFn = (time: number) => { lenis.raf(time * 1000) }
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
      gsap.killTweensOf(triggerElement)
      gsap.ticker.remove(tickerFn)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="sa-parallax" ref={parallaxRef}>
      {/* ── Parallax visuals header ───────────────────────────────── */}
      <section className="sa-parallax__header">
        <div className="sa-parallax__visuals">
          <div className="sa-parallax__overflow" />
          <div data-parallax-layers className="sa-parallax__layers">
            {/* Layer 1 — Dashboard back */}
            <img
              src="/parallax/layer-1.svg"
              loading="eager"
              width="1600"
              data-parallax-layer="1"
              alt=""
              className="sa-parallax__layer-img"
            />
            {/* Layer 2 — Prospect cards */}
            <img
              src="/parallax/layer-2.svg"
              loading="eager"
              width="1200"
              data-parallax-layer="2"
              alt=""
              className="sa-parallax__layer-img"
            />
            {/* Layer 3 — Title */}
            <div data-parallax-layer="3" className="sa-parallax__layer-title">
              <h1 className="sa-parallax__title">Sales Advisor</h1>
              <p className="sa-parallax__subtitle">
                De l&apos;URL au prospect qualifié en 30 secondes
              </p>
            </div>
            {/* Layer 4 — Email IA card (front) */}
            <img
              src="/parallax/layer-3.svg"
              loading="eager"
              width="900"
              data-parallax-layer="4"
              alt=""
              className="sa-parallax__layer-img sa-parallax__layer-img--front"
            />
          </div>
          <div className="sa-parallax__fade" />
        </div>
      </section>

      {/* ── Content under the parallax ───────────────────────────── */}
      <section className="sa-parallax__content">
        <span className="sa-parallax__pill">
          <span className="sa-parallax__pill-dot" />
          IA B2B &bull; Prospection augmentée
        </span>

        <h2 className="sa-parallax__h2">
          Trouvez vos meilleurs prospects.
          <br />
          <span className="sa-parallax__h2-accent">Vendez mieux.</span>
        </h2>

        <p className="sa-parallax__lead">
          Générez des emails personnalisés et préparez vos appels en moins de 30&nbsp;secondes
          grâce à l&apos;IA. Aucune carte bancaire requise.
        </p>

        <div className="sa-parallax__ctas">
          <Link href="/register" className="sa-parallax__btn sa-parallax__btn--primary">
            Essayer gratuitement — 14 jours
          </Link>
          <button className="sa-parallax__btn sa-parallax__btn--ghost" type="button">
            <span className="sa-parallax__play">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
                <path d="M0 0l10 6-10 6V0z" />
              </svg>
            </span>
            Voir la démo
          </button>
        </div>

        <div className="sa-parallax__trust">
          {['Aucune carte bancaire', 'Annulable à tout moment', 'Onboarding en 2 min'].map((t) => (
            <span key={t} className="sa-parallax__trust-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="#d1fae5" />
                <path
                  d="M4 7l2 2 4-4"
                  stroke="#059669"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t}
            </span>
          ))}
        </div>

        <div className="sa-parallax__stats">
          {[
            { value: '500+', label: 'Équipes' },
            { value: '4,9/5', label: 'Note moyenne' },
            { value: '30s', label: 'Par prospect' },
            { value: '+47', label: "Prospects qualifiés aujourd'hui" },
          ].map((s) => (
            <div key={s.value} className="sa-parallax__stat">
              <div className="sa-parallax__stat-value">{s.value}</div>
              <div className="sa-parallax__stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
