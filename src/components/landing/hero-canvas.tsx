'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface DotData {
  lng: number
  lat: number
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    const canvas = canvasRef.current
    if (!el || !canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const W = el.clientWidth
    const H = el.clientHeight
    const radius = Math.min(W, H) / 2.15

    const dpr = window.devicePixelRatio || 1
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`
    context.scale(dpr, dpr)

    /* ── Projection D3 ── */
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([W / 2, H / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    /* ── Helpers ── */
    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const { type, coordinates } = feature.geometry
      if (type === 'Polygon') {
        if (!pointInPolygon(point, coordinates[0])) return false
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false
        }
        return true
      } else if (type === 'MultiPolygon') {
        for (const polygon of coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) { inHole = true; break }
            }
            if (!inHole) return true
          }
        }
      }
      return false
    }

    const generateDots = (feature: any, spacing = 16): [number, number][] => {
      const dots: [number, number][] = []
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature)
      const step = spacing * 0.28
      for (let lng = minLng; lng <= maxLng; lng += step) {
        for (let lat = minLat; lat <= maxLat; lat += step) {
          const p: [number, number] = [lng, lat]
          if (pointInFeature(p, feature)) dots.push(p)
        }
      }
      return dots
    }

    /* ── State ── */
    const allDots: DotData[] = []
    let landFeatures: any = null
    const rotation = { x: -20, y: 0 }
    let autoRotate = true
    let mouseX = 0
    let mouseY = 0
    let targetRotY = 0
    let targetRotX = 0

    /* ── Render ── */
    const render = () => {
      context.clearRect(0, 0, W, H)

      const scale = projection.scale()
      const sf = scale / radius

      /* Globe border subtil */
      context.beginPath()
      context.arc(W / 2, H / 2, scale, 0, 2 * Math.PI)
      context.fillStyle = 'rgba(238,242,255,0.06)'
      context.fill()
      context.strokeStyle = 'rgba(99,102,241,0.18)'
      context.lineWidth = 1.2 * sf
      context.stroke()

      if (!landFeatures) return

      /* Graticule */
      const graticule = d3.geoGraticule()
      context.beginPath()
      path(graticule())
      context.strokeStyle = '#818cf8'
      context.lineWidth = 0.6 * sf
      context.globalAlpha = 0.10
      context.stroke()
      context.globalAlpha = 1

      /* Contours des terres */
      context.beginPath()
      landFeatures.features.forEach((f: any) => path(f))
      context.strokeStyle = '#6366f1'
      context.lineWidth = 0.8 * sf
      context.globalAlpha = 0.35
      context.stroke()
      context.globalAlpha = 1

      /* Dots halftone sur les terres */
      allDots.forEach(({ lng, lat }) => {
        const proj = projection([lng, lat])
        if (!proj) return
        const [px, py] = proj
        if (px < 0 || px > W || py < 0 || py > H) return
        context.beginPath()
        context.arc(px, py, 2.4 * sf, 0, 2 * Math.PI)
        context.fillStyle = '#6366f1'
        context.globalAlpha = 0.75
        context.fill()
        context.globalAlpha = 1
      })
    }

    /* ── Chargement GeoJSON ── */
    const loadData = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json'
        )
        if (!res.ok) throw new Error('fetch failed')
        landFeatures = await res.json()

        landFeatures.features.forEach((feature: any) => {
          generateDots(feature, 16).forEach(([lng, lat]) => allDots.push({ lng, lat }))
        })

        render()
        setIsLoading(false)
      } catch {
        setIsLoading(false)
      }
    }

    /* ── Rotation auto + mouse parallax ── */
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) / W
      mouseY = (e.clientY - rect.top) / H
      targetRotY = (mouseX - 0.5) * 30
      targetRotX = -(mouseY - 0.5) * 15
    }
    window.addEventListener('mousemove', onMouseMove)

    /* ── Drag ── */
    const onMouseDown = (e: MouseEvent) => {
      autoRotate = false
      const startX = e.clientX
      const startY = e.clientY
      const startRot = { ...rotation }

      const onMove = (me: MouseEvent) => {
        rotation.x = startRot.x + (me.clientX - startX) * 0.4
        rotation.y = Math.max(-80, Math.min(80, startRot.y - (me.clientY - startY) * 0.4))
        projection.rotate([rotation.x, rotation.y])
        render()
      }
      const onUp = () => {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
        setTimeout(() => { autoRotate = true }, 200)
      }
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    }
    canvas.addEventListener('mousedown', onMouseDown)

    /* ── Timer animation ── */
    let currentRotX = 0
    let currentRotY = 0
    const timer = d3.timer(() => {
      if (autoRotate) {
        rotation.x += 0.06
        currentRotX += (targetRotX - currentRotX) * 0.04
        currentRotY += (targetRotY - currentRotY) * 0.04
        projection.rotate([rotation.x, rotation.y + currentRotX, currentRotY])
      }
      render()
    })

    /* ── Resize ── */
    const onResize = () => {
      const nW = el.clientWidth
      const nH = el.clientHeight
      canvas.width = nW * dpr
      canvas.height = nH * dpr
      canvas.style.width = `${nW}px`
      canvas.style.height = `${nH}px`
      context.scale(dpr, dpr)
      projection.translate([nW / 2, nH / 2])
      render()
    }
    window.addEventListener('resize', onResize)

    loadData()

    return () => {
      timer.stop()
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {isLoading && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 44, height: 44,
            border: '3px solid #e0e7ff',
            borderTopColor: '#6366f1',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
      />
    </div>
  )
}
