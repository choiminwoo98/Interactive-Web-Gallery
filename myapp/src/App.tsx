import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { motion, MotionConfig } from "framer-motion";
import * as THREE from "three";
import Scene from "./Canvas";
import styled from "styled-components";
import Dnd from "./dnd";
import State from "./state";

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export default function App() {
  return (
    <div>
      <div id="panel">
        <Dnd />
      </div>
      <div id="state">
        <State />
      </div>
      <MotionConfig transition={{ type: "tween" }}>
        <Container>
          <Scene />
        </Container>
      </MotionConfig>
    </div>
  );
}
