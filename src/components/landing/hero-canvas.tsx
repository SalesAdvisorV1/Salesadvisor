'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ── Helpers ─────────────────────────────────────────────────────── */

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

/* ── Data ────────────────────────────────────────────────────────── */

const CITIES: [number, number][] = [
  [48.85, 2.35],    // Paris
  [51.51, -0.13],   // London
  [40.71, -74.01],  // New York
  [37.77, -122.42], // San Francisco
  [35.68, 139.69],  // Tokyo
  [22.31, 114.17],  // Hong Kong
  [1.35, 103.82],   // Singapore
  [-33.87, 151.21], // Sydney
  [55.75, 37.62],   // Moscow
  [25.20, 55.27],   // Dubai
  [52.52, 13.40],   // Berlin
  [-23.55, -46.63], // São Paulo
  [19.43, -99.13],  // Mexico City
  [-26.20, 28.04],  // Johannesburg
]

const CONNECTIONS: [number, number][] = [
  [0, 1],   // Paris - London
  [0, 2],   // Paris - New York
  [0, 10],  // Paris - Berlin
  [2, 3],   // NY - SF
  [4, 5],   // Tokyo - Hong Kong
  [5, 6],   // HK - Singapore
  [6, 7],   // Singapore - Sydney
  [8, 9],   // Moscow - Dubai
  [9, 5],   // Dubai - HK
  [2, 11],  // NY - São Paulo
  [2, 12],  // NY - Mexico
  [1, 13],  // London - Johannesburg
]

/* ── Component ───────────────────────────────────────────────────── */

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const W = el.clientWidth
    const H = el.clientHeight

    /* Scene */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 1000)
    camera.position.z = 3.2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    /* ── Globe base sphere ── */
    const globeGeo = new THREE.SphereGeometry(1, 64, 64)
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x080619,
      emissive: 0x0d0b2e,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 1,
      shininess: 20,
    })
    const globe = new THREE.Mesh(globeGeo, globeMat)
    scene.add(globe)

    /* ── Grid lines ── */
    const addLine = (points: THREE.Vector3[], opacity: number, color = 0x6366f1) => {
      const geo = new THREE.BufferGeometry().setFromPoints(points)
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity })
      globe.add(new THREE.Line(geo, mat))
    }

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts: THREE.Vector3[] = []
      for (let lon = 0; lon <= 361; lon += 3) pts.push(latLonToVec3(lat, lon - 180, 1.002))
      addLine(pts, lat === 0 ? 0.25 : 0.12)
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 20) {
      const pts: THREE.Vector3[] = []
      for (let lat = -90; lat <= 90; lat += 3) pts.push(latLonToVec3(lat, lon - 180, 1.002))
      addLine(pts, 0.10)
    }

    /* ── Tropic & polar circles ── */
    for (const lat of [-66.5, -23.5, 23.5, 66.5]) {
      const pts: THREE.Vector3[] = []
      for (let lon = 0; lon <= 361; lon += 3) pts.push(latLonToVec3(lat, lon - 180, 1.002))
      addLine(pts, 0.08, 0x818cf8)
    }

    /* ── City dots ── */
    const cityMeshes: THREE.Mesh[] = []
    CITIES.forEach(([lat, lon]) => {
      const pos = latLonToVec3(lat, lon, 1.015)

      // Main dot
      const dotGeo = new THREE.SphereGeometry(0.018, 10, 10)
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xc7d2fe })
      const dot = new THREE.Mesh(dotGeo, dotMat)
      dot.position.copy(pos)
      globe.add(dot)
      cityMeshes.push(dot)

      // Halo ring
      const haloGeo = new THREE.RingGeometry(0.025, 0.038, 20)
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
      })
      const halo = new THREE.Mesh(haloGeo, haloMat)
      halo.position.copy(pos)
      halo.lookAt(new THREE.Vector3(0, 0, 0))
      globe.add(halo)
    })

    /* ── Connection arcs ── */
    const arcLines: { line: THREE.Line; mat: THREE.LineBasicMaterial; speed: number; offset: number }[] = []

    CONNECTIONS.forEach(([i, j], idx) => {
      const start = latLonToVec3(CITIES[i][0], CITIES[i][1], 1.0)
      const end = latLonToVec3(CITIES[j][0], CITIES[j][1], 1.0)
      const mid = start.clone().add(end).normalize().multiplyScalar(1.55)
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      const pts = curve.getPoints(60)

      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const mat = new THREE.LineBasicMaterial({
        color: 0x818cf8,
        transparent: true,
        opacity: 0.0,
      })
      const line = new THREE.Line(geo, mat)
      globe.add(line)
      arcLines.push({ line, mat, speed: 0.4 + Math.random() * 0.4, offset: idx * 0.7 })
    })

    /* ── Atmosphere glow (inner) ── */
    const atmos1 = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x4f46e5, transparent: true, opacity: 0.06, side: THREE.BackSide })
    )
    scene.add(atmos1)

    /* ── Atmosphere glow (outer ring) ── */
    const atmos2 = new THREE.Mesh(
      new THREE.SphereGeometry(1.22, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.025, side: THREE.BackSide })
    )
    scene.add(atmos2)

    /* ── Atmospheric edge highlight (rim) ── */
    const rimGeo = new THREE.SphereGeometry(1.04, 64, 64)
    const rimMat = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(0.388, 0.400, 0.945, 1.0) * intensity * 0.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })
    const rim = new THREE.Mesh(rimGeo, rimMat)
    scene.add(rim)

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0x818cf8, 0.6))

    const keyLight = new THREE.PointLight(0xa5b4fc, 2.5, 15)
    keyLight.position.set(4, 3, 4)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0x4f46e5, 1.0, 15)
    fillLight.position.set(-4, -2, -3)
    scene.add(fillLight)

    /* ── Particle field ── */
    const starCount = 180
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 2.5 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPositions[i * 3 + 2] = r * Math.cos(phi)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xc7d2fe, size: 0.012, transparent: true, opacity: 0.6 })
    scene.add(new THREE.Points(starGeo, starMat))

    /* ── Mouse ── */
    let targetRotX = 0.2
    let targetRotY = 0
    let currentRotX = 0.2
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
    const clock = new THREE.Clock()
    let animId: number

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth mouse follow
      currentRotX += (targetRotX - currentRotX) * 0.04
      currentRotY += (targetRotY - currentRotY) * 0.04

      globe.rotation.y = currentRotY + t * 0.07
      globe.rotation.x = currentRotX * 0.5
      rim.rotation.copy(globe.rotation)

      // Animate arc opacity (pulsing arcs)
      arcLines.forEach(({ mat, speed, offset }) => {
        const pulse = Math.sin(t * speed + offset)
        mat.opacity = Math.max(0, pulse) * 0.55
      })

      // Pulse city dots
      cityMeshes.forEach((dot, i) => {
        const s = 1 + 0.15 * Math.sin(t * 1.2 + i * 0.8)
        dot.scale.setScalar(s)
      })

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

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
