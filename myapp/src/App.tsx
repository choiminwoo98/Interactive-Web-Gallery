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
import UserState from "./userState";
import { BrowserRouter } from "react-router-dom";
const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
`;

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <div id="panel"></div>
        <div id="state">
          <Dnd />
        </div>
        <div id="userState">
          <UserState />
        </div>
        <MotionConfig transition={{ type: "tween" }}>
          <Container>
            <Scene />
          </Container>
        </MotionConfig>
      </div>
    </BrowserRouter>
  );
}
