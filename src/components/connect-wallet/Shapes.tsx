import { FC, useLayoutEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { MotionConfig, MotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { MeshStandardMaterial, PerspectiveCamera } from "three";

import { transition } from "utils/constants";

import { useSmoothTransform } from "./use-smoth-transform";

type ShapesProps = {
  isHover: boolean;
  isPress: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

const Shapes: FC<ShapesProps> = ({ isHover, isPress, mouseX, mouseY }) => {
  const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
  const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);

  return (
    <Canvas shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
      <Camera mouseX={mouseX} mouseY={mouseY} />
      <MotionConfig transition={transition}>
        <motion.group rotation={[lightRotateX, lightRotateY, 0]}>
          <Lights />
        </motion.group>
        <motion.group
          initial={false}
          animate={isHover ? "hover" : "rest"}
          dispose={null}
          variants={{
            hover: { z: isPress ? -0.9 : 0 },
          }}
        >
          <Ledger />
          <Glow />
          <Phantom />
          <Slope />
        </motion.group>
      </MotionConfig>
    </Canvas>
  );
};

const ledgerBaseMaterial = new MeshStandardMaterial({ color: 0xffffff });
const ledgerLogoMaterial = new MeshStandardMaterial({ color: 0x000000 });
const glowBaseMaterial = new MeshStandardMaterial({ color: 0xa348d5 });
const glowLogoMaterial = new MeshStandardMaterial({ color: 0xffffff });
const phantomBaseMaterial = new MeshStandardMaterial({ color: 0x534bb1 });
const slopeBaseMaterial = new MeshStandardMaterial({ color: 0x594af0 });
const slopeLogoMediumMaterial = new MeshStandardMaterial({ color: 0xd5d2fb });
const slopeLogoDarkMaterial = new MeshStandardMaterial({ color: 0x9b92f6 });

const Ledger: FC = () => {
  const { nodes } = useGLTF("/wallets-transformed.glb") as any;

  return (
    <motion.mesh
      geometry={nodes["ledger-base"].geometry}
      material={ledgerBaseMaterial}
      position={[1.1, 0, 0]}
      rotation-z={0.5}
      variants={{
        hover: {
          x: 4.2,
          z: 0.6,
          y: -1.2,
          rotateY: -0.25,
          rotateZ: -0.5,
        },
      }}
    >
      <mesh
        geometry={nodes["ledger-logo"].geometry}
        material={ledgerLogoMaterial}
      />
    </motion.mesh>
  );
};

const Phantom: FC = () => {
  const { nodes } = useGLTF("/wallets-transformed.glb") as any;

  return (
    <motion.mesh
      geometry={nodes["phantom-base"].geometry}
      material={phantomBaseMaterial}
      position={[-0.5, -1, 0]}
      scale={[0.65, 0.65, 0.65]}
      variants={{ hover: { z: 2, rotateX: 0.25 } }}
    >
      <mesh
        geometry={nodes["phantom-logo"].geometry}
        material={glowLogoMaterial}
      />
    </motion.mesh>
  );
};

const Glow: FC = () => {
  const { nodes } = useGLTF("/wallets-transformed.glb") as any;

  return (
    <motion.mesh
      geometry={nodes["glow-base"].geometry}
      material={glowBaseMaterial}
      position={[-0.8, 0.4, 0]}
      rotation={[-0.5, 0, -0.3]}
      scale={[0.85, 0.85, 0.85]}
      variants={{
        hover: {
          z: 1.1,
          y: 0.8,
          x: -3.5,
          rotateX: -0.1,
          rotateZ: 0.4,
        },
      }}
    >
      <mesh
        geometry={nodes["glow-logo"].geometry}
        material={glowLogoMaterial}
      />
    </motion.mesh>
  );
};

const Slope: FC = () => {
  const { nodes } = useGLTF("/wallets-transformed.glb") as any;

  return (
    <motion.mesh
      geometry={nodes["slope-base"].geometry}
      material={slopeBaseMaterial}
      position={[0.1, 0.4, 0]}
      rotation={[-0.5, 0.5, 0]}
      scale={[0.75, 0.75, 0.75]}
      variants={{
        hover: {
          x: 0.5,
          y: 1,
          z: 2,
          rotateY: -0.2,
        },
      }}
    >
      <mesh
        geometry={nodes["slope-logo-blue"].geometry}
        material={slopeLogoDarkMaterial}
      />
      <mesh
        geometry={nodes["slope-logo-medium"].geometry}
        material={slopeLogoMediumMaterial}
      />
      <mesh
        geometry={nodes["slope-logo-white"].geometry}
        material={glowLogoMaterial}
      />
    </motion.mesh>
  );
};

const Lights: FC = () => {
  return (
    <>
      <spotLight color="#61dafb" position={[-20, -20, -20]} intensity={0.1} />
      <spotLight color="#61dafb" position={[-20, 0, 30]} intensity={0.4} />
      <spotLight color="#61dafb" position={[-10, 40, 4]} intensity={0.25} />
      <spotLight color="#f2056f" position={[30, 20, -4]} intensity={1} />
      <spotLight color="#f2056f" position={[30, 20, 10]} intensity={0.5} />
      <spotLight color="#b107db" position={[10, -20, 10]} intensity={0.4} />
    </>
  );
};

type CameraProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

const Camera: FC<CameraProps> = ({ mouseX, mouseY, ...props }) => {
  const cameraX = useSmoothTransform(mouseX, spring, (x) => x / 350);
  const cameraY = useSmoothTransform(mouseY, spring, (y) => (-1 * y) / 350);

  const set = useThree(({ set }) => set);
  const camera = useThree(({ camera }) => camera);
  const size = useThree(({ size }) => size);
  const scene = useThree(({ scene }) => scene);
  const cameraRef = useRef<PerspectiveCamera>(null);

  useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.aspect = (size.width * 1) / (size.height * 1);
      cam.updateProjectionMatrix();
    }
  }, [size, props]);

  useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      const oldCam = camera;
      set(() => ({ camera: cam }));
      return () => set(() => ({ camera: oldCam }));
    }
  }, [camera, cameraRef, set]);

  useLayoutEffect(() => {
    return cameraX.onChange(() => camera.lookAt(scene.position));
  }, [cameraX]);

  return (
    <motion.perspectiveCamera
      ref={cameraRef as any}
      fov={90}
      position={[cameraX, cameraY, 3.8]}
    />
  );
};

const spring = { stiffness: 600, damping: 30 };

const mouseToLightRotation = (v: number) => (-1 * v) / 140;

useGLTF.preload("/wallets-transformed.glb");

export default Shapes;
