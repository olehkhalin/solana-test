"use client";
import { FC } from "react";
import {
  Float,
  OrbitControls,
  useGLTF,
  useMatcapTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ColorManagement } from "three";

ColorManagement.legacyMode = false;

const BacgkroundCanvas: FC = () => {
  return (
    <div className="absolute inset-0">
      <Canvas>
        <OrbitControls />
        <Solana />
        <Tether />
        <Binance />
      </Canvas>
    </div>
  );
};

const Solana: FC = () => {
  const { nodes } = useGLTF("/tokens-mini-transformed.glb") as any;
  const [matcapTexture] = useMatcapTexture("6C52AA_C9A6EA_A681D6_B494E2", 1024); //8A6565_2E214D_D48A5F_ADA59C 6C5DC3_352D66_5C4CAB_544CA5
  const [matcapTexture2] = useMatcapTexture(
    "7877EE_D87FC5_75D9C7_1C78C0",
    1024
  );

  return (
    <Float
      position={[3, -2, 0]}
      rotation={[Math.PI / 3.5, 0, 0]}
      rotationIntensity={10}
      floatIntensity={6}
      speed={1.5}
    >
      <group dispose={null} scale={[0.8, 0.8, 0.8]}>
        <mesh geometry={nodes["solana-base001"].geometry}>
          <meshMatcapMaterial matcap={matcapTexture} />
          <mesh geometry={nodes["solana-logo001"].geometry}>
            <meshMatcapMaterial matcap={matcapTexture2} />
          </mesh>
        </mesh>
      </group>
    </Float>
  );
};

const Tether: FC = () => {
  const { nodes } = useGLTF("/tokens-mini-transformed.glb") as any;
  const [matcapTexture] = useMatcapTexture("2D8753_5CD6A5_45BB82_4CC494", 1024); //8A6565_2E214D_D48A5F_ADA59C 6C5DC3_352D66_5C4CAB_544CA5
  const [matcapTexture2] = useMatcapTexture(
    "2E763A_78A0B7_B3D1CF_14F209",
    1024
  );

  return (
    <Float
      position={[-3, 0, 0]}
      rotation={[Math.PI / 3.5, 0, 0]}
      rotationIntensity={12}
      floatIntensity={6}
      speed={1.5}
    >
      <group dispose={null} scale={[0.8, 0.8, 0.8]}>
        <mesh geometry={nodes["solana-base001"].geometry}>
          <meshMatcapMaterial matcap={matcapTexture} />
          <mesh geometry={nodes["tether-logo"].geometry}>
            <meshMatcapMaterial matcap={matcapTexture2} />
          </mesh>
        </mesh>
      </group>
    </Float>
  );
};

const Binance: FC = () => {
  const { nodes } = useGLTF("/tokens-mini-transformed.glb") as any;
  const [matcapTexture] = useMatcapTexture("855D08_DAC31B_BF9B0C_AF860C", 1024);
  const [matcapTexture2] = useMatcapTexture(
    "85B9D3_C9EAF9_417277_528789",
    1024
  );

  return (
    <Float
      position={[4, 1, -1]}
      rotation={[Math.PI / 3.5, 0, 0]}
      rotationIntensity={14}
      floatIntensity={4}
      speed={1.5}
    >
      <group dispose={null} scale={[0.8, 0.8, 0.8]}>
        <mesh geometry={nodes["solana-base001"].geometry}>
          <meshMatcapMaterial matcap={matcapTexture} />
          <mesh geometry={nodes["busd-logo"].geometry}>
            <meshMatcapMaterial matcap={matcapTexture2} />
          </mesh>
        </mesh>
      </group>
    </Float>
  );
};

useGLTF.preload("/tokens-mini-transformed.glb");

export default BacgkroundCanvas;
