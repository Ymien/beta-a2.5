"use client";

import dynamic from "next/dynamic";
import CyberLoader from "../components/CyberLoader";

const ChatInterface = dynamic(() => import("./ChatInterface"), {
  ssr: false,
  loading: () => <CyberLoader accent="cyan" label="Initializing Synapse AI..." />,
});

export default ChatInterface;
