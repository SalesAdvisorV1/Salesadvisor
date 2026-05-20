'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 0, 3.5);

    // ── Globe wireframe ──────────────────────────────────────────────────
    const gridGroup = new THREE.Group();
    const latSteps = 14;
    const lonSteps = 20;
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.18, transparent: true });

    for (let i = 0; i <= latSteps; i++) {
      const lat = (Math.PI / latSteps) * i - Math.PI / 2;
      const r = Math.cos(lat);
      const y = Math.sin(lat);
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 80; j++) {
        const theta = (2 * Math.PI * j) / 80;
        pts.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
    }

    for (let i = 0; i < lonSteps; i++) {
      const lon = (2 * Math.PI * i) / lonSteps;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 80; j++) {
        const lat = (Math.PI * j) / 80 - Math.PI / 2;
        pts.push(new THREE.Vector3(
          Math.cos(lat) * Math.cos(lon),
          Math.sin(lat),
          Math.cos(lat) * Math.sin(lon)
        ));
      }
      gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
    }

    scene.add(gridGroup);

    // Outer glow
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.05,
      side: THREE.FrontSide,
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.1, 32, 32), glowMat));

    // ── 200 Floating particles ────────────────────────────────────────────
    const PARTICLE_COUNT = 200;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const opacities = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute in a shell between r=1.4 and r=3.2
      const r = 1.4 + Math.random() * 1.8;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      velocities[i * 3]     = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      sizes[i] = 0.02 + Math.random() * 0.04;
      opacities[i] = 0.3 + Math.random() * 0.7;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Mouse reaction ────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const tilt  = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ────────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Globe slow rotation
      gridGroup.rotation.y = t * 0.07;

      // Smooth mouse tilt applied to everything
      tilt.x += (mouse.y * 0.25 - tilt.x) * 0.04;
      tilt.y += (mouse.x * 0.25 - tilt.y) * 0.04;
      gridGroup.rotation.x = tilt.x;

      // Floating particles drift + mouse parallax
      const posAttr = particleGeo.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posAttr.array[i * 3]     += velocities[i * 3];
        posAttr.array[i * 3 + 1] += velocities[i * 3 + 1];
        posAttr.array[i * 3 + 2] += velocities[i * 3 + 2];

        // Soft boundary: reflect if too far
        const dx = posAttr.array[i * 3];
        const dy = posAttr.array[i * 3 + 1];
        const dz = posAttr.array[i * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist > 3.4 || dist < 1.2) {
          velocities[i * 3]     *= -1;
          velocities[i * 3 + 1] *= -1;
          velocities[i * 3 + 2] *= -1;
        }
      }
      posAttr.needsUpdate = true;

      // Particles global tilt follows mouse (stronger parallax than globe)
      particles.rotation.x = tilt.x * 1.4;
      particles.rotation.y = tilt.y * 1.4 + t * 0.03;

      // Pulsing opacity
      particleMat.opacity = 0.45 + 0.2 * Math.sin(t * 1.2);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
