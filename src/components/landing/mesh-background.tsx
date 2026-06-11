'use client'

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Animated mesh gradient background, reactive to scroll position.
 *
 * Intensity curve (page progress → blob opacity):
 *   hero (0)            → 1     plein éclat
 *   process/features    → 0.30  quasi blanc, lecture confortable
 *   testimonials        → 0.45  léger regain
 *   pricing             → 0.80  montée
 *   CTA final (1)       → 1     plein éclat pour la conversion
 *
 * On pages that don't scroll (app cockpit), progress stays at 0 → full intensity,
 * identical to the previous static behaviour.
 */
export default function MeshBackground() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 22 })

  const blobOpacity = useTransform(
    smooth,
    [0, 0.16, 0.42, 0.6, 0.8, 1],
    [1, 0.55, 0.3, 0.45, 0.8, 1]
  )
  const blobY = useTransform(smooth, [0, 1], [0, -120])

  return (
    <div className="sa-mesh-bg" aria-hidden="true">
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: reduced ? 1 : blobOpacity,
          y: reduced ? 0 : blobY,
          willChange: 'opacity, transform',
        }}
      >
        {/* Light beam falling from the top, behind the hero */}
        <span className="sa-mesh-bg__beam" />
        {/* Slow-spinning aurora ribbons */}
        <span className="sa-mesh-bg__aurora sa-mesh-bg__aurora--1" />
        <span className="sa-mesh-bg__aurora sa-mesh-bg__aurora--2" />
        <span className="sa-mesh-bg__blob sa-mesh-bg__blob--1" />
        <span className="sa-mesh-bg__blob sa-mesh-bg__blob--2" />
        <span className="sa-mesh-bg__blob sa-mesh-bg__blob--3" />
        <span className="sa-mesh-bg__blob sa-mesh-bg__blob--4" />
        <span className="sa-mesh-bg__blob sa-mesh-bg__blob--5" />
      </motion.div>
      {/* Film grain — constant, kills gradient banding */}
      <span className="sa-mesh-bg__grain" />
    </div>
  )
}
