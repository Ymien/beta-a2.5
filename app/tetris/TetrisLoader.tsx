"use client";

import dynamic from "next/dynamic";
import CyberLoader from "../components/CyberLoader";

const Tetris = dynamic(() => import("./Tetris"), {
  ssr: false,
  loading: () => <CyberLoader accent="cyan" label="Loading Neon Tetris..." />,
});

export default Tetris;
