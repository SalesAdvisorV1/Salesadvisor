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

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 0, 3.2);

    // Globe wireframe
    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
    const wireframe = new THREE.WireframeGeometry(sphereGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.12, transparent: true });
    const globe = new THREE.LineSegments(wireframe, lineMat);
    scene.add(globe);

    // Latitude/longitude grid lines (cleaner look)
    const gridGroup = new THREE.Group();
    const latSteps = 12;
    const lonSteps = 18;
    const gridMat = new THREE.LineBasicMaterial({ color: 0xaaaaaa, opacity: 0.08, transparent: true });

    for (let i = 0; i <= latSteps; i++) {
      const lat = (Math.PI / latSteps) * i - Math.PI / 2;
      const r = Math.cos(lat);
      const y = Math.sin(lat);
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (2 * Math.PI * j) / 64;
        pts.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      gridGroup.add(new THREE.Line(lineGeo, gridMat));
    }

    for (let i = 0; i < lonSteps; i++) {
      const lon = (2 * Math.PI * i) / lonSteps;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const lat = (Math.PI * j) / 64 - Math.PI / 2;
        pts.push(new THREE.Vector3(
          Math.cos(lat) * Math.cos(lon),
          Math.sin(lat),
          Math.cos(lat) * Math.sin(lon)
        ));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      gridGroup.add(new THREE.Line(lineGeo, gridMat));
    }

    scene.add(gridGroup);

    // Prospect points on globe surface
    const pointCount = 180;
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);
    const pointSpeeds = new Float32Array(pointCount);

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 1.01;
      pointPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pointPositions[i * 3 + 1] = r * Math.cos(phi);
      pointPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      // Color: mostly white/blue-white, some warm
      const warm = Math.random() > 0.8;
      pointColors[i * 3]     = warm ? 1.0 : 0.6 + Math.random() * 0.4;
      pointColors[i * 3 + 1] = warm ? 0.7 : 0.8 + Math.random() * 0.2;
      pointColors[i * 3 + 2] = warm ? 0.3 : 1.0;

      pointSpeeds[i] = 0.5 + Math.random() * 2.5;
    }

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointGeo.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

    const pointMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(pointGeo, pointMat);
    scene.add(points);

    // Outer glow sphere
    const glowGeo = new THREE.SphereGeometry(1.08, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x3366ff,
      transparent: true,
      opacity: 0.04,
      side: THREE.FrontSide,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow auto-rotation
      globe.rotation.y = t * 0.08;
      gridGroup.rotation.y = t * 0.08;
      points.rotation.y = t * 0.08;

      // Pulsing point opacity
      pointMat.opacity = 0.65 + 0.2 * Math.sin(t * 1.5);

      // Mouse parallax (smooth lerp)
      target.x += (mouse.x * 0.18 - target.x) * 0.05;
      target.y += (-mouse.y * 0.18 - target.y) * 0.05;

      const group = [globe, gridGroup, points];
      group.forEach((obj) => {
        obj.rotation.x = target.y;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
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
