import { motion, MotionCanvas } from "framer-motion-3d";
import react, { useState, useEffect, Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { degreesToRadians } from "popmotion";

interface GLTFResult extends GLTF {
  nodes: {
    Object001__0: THREE.Mesh;
  };
  materials: {
    "Scene_-_Root": THREE.MeshStandardMaterial;
  };
}

function Gear() {
  const gltf = useLoader(GLTFLoader, "/scene.gltf") as GLTFResult;

  const gearVariants = {
    on: {
      rotateZ: 360,
    },
  };

  return (
    <motion.group dispose={null}>
      <motion.mesh
        receiveShadow
        castShadow
        rotation={[-Math.PI / 2, 0, degreesToRadians(0)]}
        geometry={gltf.nodes["Object001__0"].geometry}
        animate="off"
        variants={gearVariants}
        transition={{
          type: "tween",
          duration: 100,
          repeat: Infinity,
        }}
      >
        <motion.primitive
          object={gltf.materials["Scene_-_Root"]}
          attach="material"
        />
      </motion.mesh>
    </motion.group>
  );
}

function Scene() {
  return (
    <MotionCanvas
      // orthographic
      shadows
      dpr={[1, 1]}
      camera={{ position: [5, 100, 100], fov: 60 }}
    >
      <motion.group>
        <ambientLight intensity={0.1} />
        <directionalLight position={[-20, 20, 20]} intensity={1} />
        <motion.directionalLight position={[-20, -20, -20]} intensity={0.5} />
        <motion.pointLight position={[0, 0, 5]} distance={5} intensity={5} />
        <motion.spotLight
          position={[10, 300, 300]}
          angle={0.1}
          intensity={2}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00001}
          castShadow
        />
        <Suspense fallback={null}>
          <Gear />
        </Suspense>
        <mesh
          receiveShadow
          renderOrder={1000}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1000, 1000]} />
        </mesh>
      </motion.group>
    </MotionCanvas>
  );
}

export default Scene;
