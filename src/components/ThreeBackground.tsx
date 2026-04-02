import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null!);
  
  const sphere = useMemo(() => {
    const points = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.3;
      points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      points[i * 3 + 2] = r * Math.cos(phi);
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

const GeometricShapes = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2, 1, -2]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial 
            color="#a855f7" 
            wireframe 
            transparent 
            opacity={0.4}
          />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-3, -1, -3]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            wireframe 
            transparent 
            opacity={0.4}
          />
        </mesh>
      </Float>
    </>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="h-screen w-full transition-opacity duration-1000">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
        <ParticleField />
        <GeometricShapes />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
