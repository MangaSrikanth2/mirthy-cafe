import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface EntremetModelProps {
  isInspecting?: boolean
  rotationSpeed?: number
  hoverIntensity?: number
}

export function EntremetModel({
  isInspecting = false,
  rotationSpeed = 0.4,
  hoverIntensity = 1
}: EntremetModelProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const topLayerRef = useRef<THREE.Group>(null!)
  const mousseLayerRef = useRef<THREE.Group>(null!)
  const coreLayerRef = useRef<THREE.Group>(null!)
  const baseLayerRef = useRef<THREE.Group>(null!)
  const goldGroupRef = useRef<THREE.Group>(null!)

  // Luxury Chocolate, Caramel, Gold & Slate Materials
  const materials = useMemo(() => {
    // Ultra-glossy obsidian chocolate mirror glaze
    const mirrorGlaze = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#160c07'),
      roughness: 0.06,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.98,
      ior: 1.55,
      sheen: 0.8,
      sheenColor: new THREE.Color('#4a2715'),
      specularIntensity: 1.2
    })

    // Valrhona 70% Dark Mousse layer (velvety interior)
    const chocolateMousse = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#28170f'),
      roughness: 0.75,
      metalness: 0.02
    })

    // Salted caramel liquid core (amber gloss with transmission)
    const caramelCore = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#d97f26'),
      emissive: new THREE.Color('#381804'),
      roughness: 0.12,
      transmission: 0.35,
      thickness: 0.5,
      clearcoat: 0.9
    })

    // Feuilletine & hazelnut crunch base
    const pralineBase = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#633d1b'),
      roughness: 0.92,
      metalness: 0.05
    })

    // 24K Edible Gold Leaf
    const goldLeaf = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffc83b'),
      metalness: 0.98,
      roughness: 0.22,
      emissive: new THREE.Color('#543603'),
      side: THREE.DoubleSide
    })

    // Roasted hazelnut halves
    const hazelnut = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8c572b'),
      roughness: 0.65,
      metalness: 0.04
    })

    // Volcanic slate serving plate
    const slatePlate = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#18181a'),
      roughness: 0.88,
      metalness: 0.15
    })

    return {
      mirrorGlaze,
      chocolateMousse,
      caramelCore,
      pralineBase,
      goldLeaf,
      hazelnut,
      slatePlate
    }
  }, [])

  // Geometries for organic pebble entremet
  const { pebbleGeom, mousseGeom, coreGeom, baseGeom, slateGeom, goldFlakeGeoms } = useMemo(() => {
    // Sculpted organic pebble
    const pGeom = new THREE.SphereGeometry(1.25, 64, 48)
    pGeom.scale(1.18, 0.72, 1.05)

    // Internal mousse slice (for inspection mode)
    const mGeom = new THREE.CylinderGeometry(1.22, 1.28, 0.38, 48)
    
    // Core caramel disc
    const cGeom = new THREE.CylinderGeometry(0.78, 0.82, 0.22, 36)

    // Feuilletine crunch disc base
    const bGeom = new THREE.CylinderGeometry(1.35, 1.4, 0.2, 48)

    // Volcanic slate serving platter
    const sGeom = new THREE.CylinderGeometry(1.95, 2.05, 0.1, 64)

    // Organic gold leaf fragments draped on top
    const flakes: { geom: THREE.BufferGeometry; pos: [number, number, number]; rot: [number, number, number] }[] = []
    const flakeConfigs = [
      { p: [0.15, 0.62, 0.25], r: [-0.3, 0.2, 0.1], s: [0.38, 0.26, 0.015] },
      { p: [-0.18, 0.65, 0.32], r: [-0.4, -0.3, 0.2], s: [0.28, 0.2, 0.015] },
      { p: [0.35, 0.52, 0.1], r: [0.1, 0.5, -0.2], s: [0.22, 0.18, 0.015] },
      { p: [-0.05, 0.68, -0.1], r: [0.3, -0.2, 0.1], s: [0.25, 0.15, 0.015] },
      { p: [0.08, 0.7, 0.05], r: [-0.1, 0.1, 0.3], s: [0.18, 0.16, 0.015] }
    ]
    flakeConfigs.forEach(cfg => {
      const g = new THREE.BoxGeometry(cfg.s[0], cfg.s[1], cfg.s[2])
      flakes.push({
        geom: g,
        pos: cfg.p as [number, number, number],
        rot: cfg.r as [number, number, number]
      })
    })

    return {
      pebbleGeom: pGeom,
      mousseGeom: mGeom,
      coreGeom: cGeom,
      baseGeom: bGeom,
      slateGeom: sGeom,
      goldFlakeGeoms: flakes
    }
  }, [])

  // Animation frame: rotation + smooth layer explosion
  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (!isInspecting) {
      groupRef.current.rotation.y += delta * (0.22 * rotationSpeed)
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.06 * hoverIntensity
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0.35, 0.08)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.05, 0.08)
    }

    // Explode layers smoothly
    const targetTopY = isInspecting ? 1.05 : 0.0
    const targetMousseY = isInspecting ? 0.45 : -0.2
    const targetCoreY = isInspecting ? -0.05 : -0.35
    const targetBaseY = isInspecting ? -0.65 : -0.55
    const targetSlateY = isInspecting ? -1.05 : -0.75

    if (topLayerRef.current) {
      topLayerRef.current.position.y = THREE.MathUtils.lerp(topLayerRef.current.position.y, targetTopY, 0.1)
    }
    if (mousseLayerRef.current) {
      mousseLayerRef.current.position.y = THREE.MathUtils.lerp(mousseLayerRef.current.position.y, targetMousseY, 0.1)
    }
    if (coreLayerRef.current) {
      coreLayerRef.current.position.y = THREE.MathUtils.lerp(coreLayerRef.current.position.y, targetCoreY, 0.1)
    }
    if (baseLayerRef.current) {
      baseLayerRef.current.position.y = THREE.MathUtils.lerp(baseLayerRef.current.position.y, targetBaseY, 0.1)
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.05, 0]} scale={[0.88, 0.88, 0.88]}>
      {/* 1. TOP CROWN: Obsidian Mirror Glaze Dome & 24K Gold Leaf */}
      <group ref={topLayerRef} position={[0, 0, 0]}>
        <mesh
          geometry={pebbleGeom}
          material={materials.mirrorGlaze}
          castShadow
          receiveShadow
        />

        {/* 24K Gold Leaf Accents */}
        <group ref={goldGroupRef}>
          {goldFlakeGeoms.map((f, idx) => (
            <mesh
              key={idx}
              geometry={f.geom}
              material={materials.goldLeaf}
              position={f.pos}
              rotation={f.rot}
              castShadow
            />
          ))}
        </group>
      </group>

      {/* 2. INNER LAYER: 70% Valrhona Guanaja Mousse (revealed in inspection) */}
      <group ref={mousseLayerRef} position={[0, -0.2, 0]}>
        {isInspecting && (
          <mesh
            geometry={mousseGeom}
            material={materials.chocolateMousse}
            castShadow
            receiveShadow
          />
        )}
      </group>

      {/* 3. CORE LAYER: Salted Caramel Core (revealed in inspection) */}
      <group ref={coreLayerRef} position={[0, -0.35, 0]}>
        {isInspecting && (
          <mesh
            geometry={coreGeom}
            material={materials.caramelCore}
            castShadow
          />
        )}
      </group>

      {/* 4. BASE LAYER: Hazelnut Crunch Feuilletine Biscuit */}
      <group ref={baseLayerRef} position={[0, -0.55, 0]}>
        <mesh
          geometry={baseGeom}
          material={materials.pralineBase}
          castShadow
          receiveShadow
        />

        {/* Roasted Hazelnut Halves around the perimeter */}
        {[0, 0.9, 1.8, 2.7, 3.6, 4.5, 5.4].map((angle, i) => {
          const radius = 1.34
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          return (
            <mesh
              key={i}
              position={[x, 0.08, z]}
              scale={[0.11, 0.11, 0.11]}
              material={materials.hazelnut}
              castShadow
            >
              <sphereGeometry args={[1, 16, 16]} />
            </mesh>
          )
        })}
      </group>

      {/* 5. VOLCANIC SLATE PLATTER */}
      <mesh
        geometry={slateGeom}
        material={materials.slatePlate}
        position={[0, -0.75, 0]}
        receiveShadow
      />
    </group>
  )
}
