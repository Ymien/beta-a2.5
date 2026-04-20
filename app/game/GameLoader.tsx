"use client";

import dynamic from "next/dynamic";
import CyberLoader from "../components/CyberLoader";

const Game = dynamic(() => import("./Game"), {
  ssr: false,
  loading: () => <CyberLoader accent="purple" label="Loading Cyber Match..." />,
});

export default Game;
