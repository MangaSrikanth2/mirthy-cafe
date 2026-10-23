import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, ContactShadows, Html, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { EntremetModel } from './EntremetModel'
import { RotateCw, RefreshCcw, Layers } from 'lucide-react'

// Golden Floating Dust Particles (Optimized)
function GoldenDust() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 35

  const { positions } = useRef(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4 + 0.3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return { positions: pos }
  }).current()

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.035
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f3d48d"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// Annotation Marker Component
function LayerAnnotation({
  position,
  title,
  subtitle,
  side = 'right'
}: {
  position: [number, number, number]
  title: string
  subtitle: string
  side?: 'left' | 'right'
}) {
  return (
    <Html position={position} center distanceFactor={7}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexDirection: side === 'left' ? 'row-reverse' : 'row',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#c58940',
            boxShadow: '0 0 10px #c58940',
            border: '2px solid #ffffff'
          }}
        />
        <div
          style={{
            background: 'rgba(15, 10, 7, 0.92)',
            border: '1px solid rgba(197, 137, 64, 0.45)',
            padding: '5px 12px',
            borderRadius: '6px',
            textAlign: side === 'left' ? 'right' : 'left'
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#f3d48d', letterSpacing: '0.04em' }}>
            {title}
          </div>
          <div style={{ fontSize: '10px', color: '#ded0bc', opacity: 0.85 }}>
            {subtitle}
          </div>
        </div>
      </div>
    </Html>
  )
}

interface HeroSceneProps {
  onInteract?: () => void
}

export function HeroScene({ onInteract }: HeroSceneProps) {
  const [isInspecting, setIsInspecting] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [hasWebGL, setHasWebGL] = useState(true)
  const [isInView, setIsInView] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }

    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mq.matches)
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
      mq.addEventListener('change', listener)
      return () => mq.removeEventListener('change', listener)
    }
  }, [])

  // Pause Three.js render loop when offscreen
  useEffect(() => {
    if (!containerRef.current || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleReset = () => {
    setIsInspecting(false)
    setAutoRotate(!prefersReducedMotion)
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  if (!hasWebGL) {
    return (
      <div className="hero-fallback-container">
        <img
          src="/images/IMG_20261023_173944.jpg"
          alt="Hazelnut Obsidian signature entremet"
          className="hero-fallback-image"
          width="480"
          height="480"
          fetchPriority="high"
        />
        <div className="hero-fallback-badge">
          <span>Signature Entremet</span>
          <strong>Hazelnut Obsidian</strong>
        </div>
      </div>
    )
  }

  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <div
      ref={containerRef}
      className="hero-canvas-wrapper"
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <Canvas
        camera={{ position: [0, 2.1, 4.8], fov: 40 }}
        frameloop={isInView ? 'always' : 'never'}
        dpr={isMobileDevice ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobileDevice, alpha: true, powerPreference: 'high-performance' }}
        onPointerDown={onInteract}
      >
        {/* Soft Ambient Fill */}
        <ambientLight intensity={0.9} color="#523a2b" />
        
        {/* Key Directional Studio Light */}
        <directionalLight
          position={[4, 6, 4]}
          intensity={2.6}
          color="#fff5eb"
        />

        {/* Cool Rim Light */}
        <directionalLight
          position={[-5, 4, -3]}
          intensity={1.4}
          color="#9bb7d4"
        />

        {/* Warm Golden Glow from front-below */}
        <pointLight position={[0, -1.5, 3]} intensity={1.2} color="#c58940" />

        {/* Top Focused Spotlight */}
        <spotLight
          position={[0, 6, 1]}
          intensity={1.6}
          angle={0.6}
          penumbra={0.8}
          color="#fff0d0"
        />

        {/* Studio Environment Reflections */}
        <Environment preset="apartment" background={false} />

        <Suspense fallback={null}>
          <Float
            speed={isInspecting || prefersReducedMotion ? 0 : 1.2}
            rotationIntensity={isInspecting || prefersReducedMotion ? 0 : 0.12}
            floatIntensity={isInspecting || prefersReducedMotion ? 0 : 0.2}
          >
            <EntremetModel
              isInspecting={isInspecting}
              rotationSpeed={autoRotate && !prefersReducedMotion ? 0.6 : 0}
            />
          </Float>

          {/* Golden Floating Dust */}
          {!prefersReducedMotion && <GoldenDust />}

          {/* Layer Callouts when Inspecting */}
          {isInspecting && (
            <>
              <LayerAnnotation
                position={[1.65, 0.95, 0]}
                title="Obsidian Glaze & 24K Gold"
                subtitle="High-gloss mirror shell"
                side="right"
              />
              <LayerAnnotation
                position={[-1.65, 0.42, 0]}
                title="70% Valrhona Mousse"
                subtitle="Guanaja dark chocolate"
                side="left"
              />
              <LayerAnnotation
                position={[1.55, -0.05, 0]}
                title="Caramel & Praliné Core"
                subtitle="Fleur de sel caramel insert"
                side="right"
              />
              <LayerAnnotation
                position={[-1.65, -0.6, 0]}
                title="Feuilletine Crunch"
                subtitle="Roasted hazelnut biscuit"
                side="left"
              />
            </>
          )}

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -0.95, 0]}
            opacity={0.6}
            scale={5.5}
            blur={2.0}
            far={3}
            color="#050302"
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4.5}
          maxPolarAngle={Math.PI / 1.85}
          rotateSpeed={0.6}
          autoRotate={autoRotate && !isInspecting && !prefersReducedMotion}
          autoRotateSpeed={1.0}
        />
      </Canvas>

      {/* Floating 3D Interaction Control HUD */}
      <div className="canvas-hud">
        <button
          type="button"
          className={`hud-btn ${isInspecting ? 'active' : ''}`}
          onClick={() => {
            setIsInspecting(!isInspecting)
            if (!isInspecting) setAutoRotate(false)
          }}
          title="Toggle Cross-section Anatomy"
          aria-label="Inspect layers"
        >
          <Layers size={14} />
          <span>{isInspecting ? 'Collapse' : 'Inspect Anatomy'}</span>
        </button>

        <button
          type="button"
          className={`hud-btn ${autoRotate && !prefersReducedMotion ? 'active' : ''}`}
          onClick={() => setAutoRotate(!autoRotate)}
          title="Toggle 360° Auto-Rotation"
          aria-label="Toggle rotation"
        >
          <RotateCw size={14} />
          <span>{autoRotate && !prefersReducedMotion ? 'Rotating' : 'Paused'}</span>
        </button>

        <button
          type="button"
          className="hud-btn"
          onClick={handleReset}
          title="Reset View"
          aria-label="Reset view"
        >
          <RefreshCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Interactive Drag Hint */}
      <div className="canvas-drag-hint">
        <span className="drag-icon">✦</span>
        <span>Drag to rotate 360° • Real-time Three.js</span>
      </div>
    </div>
  )
}
