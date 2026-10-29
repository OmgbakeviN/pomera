import React from 'react';
import { Suspense, useLayoutEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MODEL_URL = `${import.meta.env.BASE_URL}models/Pomme_3D.glb`;

const desktopFrames = [
  { x: 2.45, y: -0.12, scale: 1.46, rotation: -0.34 }, // Hero: à droite
  { x: -2.45, y: -0.08, scale: 1.40, rotation: 1.25 }, // Histoire: à gauche
  { x: 2.35, y: 0.10, scale: 1.56, rotation: 3.00 }, // Savoir-faire: à droite
  { x: -2.33, y: -0.04, scale: 1.36, rotation: 4.55 }, // Engagements: à gauche
  { x: 0.05, y: 0.00, scale: 1.62, rotation: 6.36 }, // Final: au centre
];

const tabletFrames = [
  { x: 1.12, y: -0.05, scale: 1.13, rotation: -0.34 },
  { x: -1.12, y: -0.05, scale: 1.09, rotation: 1.25 },
  { x: 1.10, y: 0.04, scale: 1.17, rotation: 3.00 },
  { x: -1.10, y: -0.04, scale: 1.07, rotation: 4.55 },
  { x: 0, y: -0.02, scale: 1.22, rotation: 6.36 },
];

const mobileFrames = [
  { x: 0.20, y: -1.20, scale: 0.93, rotation: -0.34 },
  { x: -0.55, y: -1.24, scale: 0.84, rotation: 1.25 },
  { x: 0.53, y: -1.18, scale: 0.89, rotation: 3.00 },
  { x: -0.52, y: -1.25, scale: 0.82, rotation: 4.55 },
  { x: 0.0, y: -0.45, scale: 1.07, rotation: 6.36 },
];

function AnimatedApple() {
  const holder = useRef(null);
  const { scene } = useGLTF(MODEL_URL);
  const viewportWidth = useThree((state) => state.viewport.width);

  useLayoutEffect(() => {
    const object = holder.current;
    if (!object) return undefined;

    const media = gsap.matchMedia();
    const build = (frames, reduceMotion = false) => {
      // Evite que le modèle sorte de l'écran sur les tablettes / écrans hauts.
      const adjusted = frames.map((frame) => ({
        ...frame,
        x: Math.sign(frame.x) * Math.min(Math.abs(frame.x), Math.max(0, viewportWidth / 2 - frame.scale * 1.16 - 0.08)),
      }));
      const first = adjusted[0];
      gsap.set(object.position, { x: first.x, y: first.y, z: 0 });
      gsap.set(object.rotation, { x: 0.08, y: first.rotation, z: -0.07 });
      gsap.set(object.scale, { x: first.scale, y: first.scale, z: first.scale });

      if (reduceMotion) return;

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#site-sections',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
      });

      adjusted.slice(1).forEach((frame) => {
        timeline
          .to(object.position, { x: frame.x, y: frame.y, duration: 1 })
          .to(object.rotation, { y: frame.rotation, z: Math.sin(frame.rotation) * 0.1, duration: 1 }, '<')
          .to(object.scale, { x: frame.scale, y: frame.scale, z: frame.scale, duration: 1 }, '<');
      });
    };

    media.add('(prefers-reduced-motion: reduce)', () => {
      build(window.matchMedia('(max-width: 700px)').matches ? mobileFrames : window.matchMedia('(max-width: 1100px)').matches ? tabletFrames : desktopFrames, true);
    });
    media.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference)', () => build(desktopFrames));
    media.add('(min-width: 701px) and (max-width: 1100px) and (prefers-reduced-motion: no-preference)', () => build(tabletFrames));
    media.add('(max-width: 700px) and (prefers-reduced-motion: no-preference)', () => build(mobileFrames));

    return () => media.revert();
  }, [viewportWidth]);

  return (
    <group ref={holder}>
      <Float speed={1.35} floatIntensity={0.15} rotationIntensity={0.06}>
        <primitive object={scene} />
      </Float>
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function AppleScene() {
  return (
    <div className="apple-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 9], fov: 36, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        fallback={<div className="canvas-fallback">🍎</div>}
        onCreated={({ gl }) => gl.setClearColor('#ffffff', 0)}
      >
        <ambientLight intensity={1.55} />
        <hemisphereLight args={['#fff1dc', '#8e3f31', 2.0]} />
        <directionalLight position={[-4, 7, 8]} intensity={3.8} color="#ffffff" />
        <directionalLight position={[5, 2, 2]} intensity={2.0} color="#ffb8a4" />
        <directionalLight position={[0, -4, -5]} intensity={2.0} color="#ffffff" />
        <Suspense fallback={null}>
          <AnimatedApple />
        </Suspense>
      </Canvas>
    </div>
  );
}
