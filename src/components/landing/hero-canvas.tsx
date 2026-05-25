'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const W = el.clientWidth
    const H = el.clientHeight

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000)
    camera.position.z = 2.8

    /* ── Globe pivot (tout tourne avec) ── */
    const pivot = new THREE.Group()
    scene.add(pivot)

    /* ── Points distribués sur la sphère (algorithme Fibonacci) ── */
    const POINT_COUNT = 220
    const RADIUS = 1.0
    const CONNECT_DIST = 0.42   // seuil de connexion (distance 3D)

    const positions: THREE.Vector3[] = []
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < POINT_COUNT; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio
      const phi = Math.acos(1 - (2 * (i + 0.5)) / POINT_COUNT)
      positions.push(new THREE.Vector3(
        RADIUS * Math.sin(phi) * Math.cos(theta),
        RADIUS * Math.cos(phi),
        RADIUS * Math.sin(phi) * Math.sin(theta)
      ))
    }

    /* ── Dots ── */
    const dotGeo = new THREE.SphereGeometry(0.009, 6, 6)

    positions.forEach((p) => {
      const dot = new THREE.Mesh(
        dotGeo,
        new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.75 })
      )
      dot.position.copy(p)
      pivot.add(dot)
    })

    /* ── Connexions entre points proches ── */
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const d = positions[i].distanceTo(positions[j])
        if (d < CONNECT_DIST) {
          const opacity = (1 - d / CONNECT_DIST) * 0.32
          const geo = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]])
          const mat = new THREE.LineBasicMaterial({
            color: 0x818cf8,
            transparent: true,
            opacity,
          })
          pivot.add(new THREE.Line(geo, mat))
        }
      }
    }

    /* ── Sphère de fond légère (glow subtil) ── */
    const glowMesh = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.08, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.04,
        side: THREE.BackSide,
      })
    )
    pivot.add(glowMesh)

    /* ── Particules flottantes autour ── */
    const PARTICLE_COUNT = 120
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
    const particleVels: { theta: number; phi: number; r: number; dTheta: number; dPhi: number }[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = RADIUS * (1.15 + Math.random() * 0.6)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      particlePositions[i * 3 + 1] = r * Math.cos(phi)
      particlePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
      particleVels.push({
        theta, phi, r,
        dTheta: (Math.random() - 0.5) * 0.003,
        dPhi: (Math.random() - 0.5) * 0.002,
      })
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.014,
      transparent: true,
      opacity: 0.5,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    /* ── Mouse parallax ── */
    let targetRotX = 0
    let targetRotY = 0
    let currentRotX = 0
    let currentRotY = 0

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / W
      const my = (e.clientY - rect.top) / H
      targetRotY = (mx - 0.5) * Math.PI * 0.5
      targetRotX = (my - 0.5) * Math.PI * 0.25
    }
    window.addEventListener('mousemove', onMouseMove)

    /* ── Animation ── */
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      /* Lerp mouse */
      currentRotX += (targetRotX - currentRotX) * 0.05
      currentRotY += (targetRotY - currentRotY) * 0.05

      /* Rotation globe */
      pivot.rotation.y = currentRotY + t * 0.09
      pivot.rotation.x = currentRotX * 0.4

      /* Parallax particules (inverse léger) */
      particles.rotation.y = -currentRotY * 0.3 + t * 0.04
      particles.rotation.x = -currentRotX * 0.15

      /* Mise à jour position particules */
      const posArr = particleGeo.attributes.position.array as Float32Array
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const v = particleVels[i]
        v.theta += v.dTheta
        v.phi += v.dPhi
        if (v.phi < 0.05 || v.phi > Math.PI - 0.05) v.dPhi *= -1
        posArr[i * 3] = v.r * Math.sin(v.phi) * Math.cos(v.theta)
        posArr[i * 3 + 1] = v.r * Math.cos(v.phi)
        posArr[i * 3 + 2] = v.r * Math.sin(v.phi) * Math.sin(v.theta)
      }
      particleGeo.attributes.position.needsUpdate = true

      /* Pulsation opacité particules */
      particleMat.opacity = 0.35 + 0.15 * Math.sin(t * 0.8)

      renderer.render(scene, camera)
    }
    animate()

    /* ── Resize ── */
    const onResize = () => {
      const nW = el.clientWidth
      const nH = el.clientHeight
      camera.aspect = nW / nH
      camera.updateProjectionMatrix()
      renderer.setSize(nW, nH)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
