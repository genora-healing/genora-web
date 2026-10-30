import ProblemNarrativeSection from "../components/ProblemNarrativeSection";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";

export default function HealingPage() {
  return (
    <div className="w-full bg-[#020617] text-[#F8FAFF] min-h-screen">
      {/* ── 1. Hero Cinemático Flanqueado ── */}
      <HeroSection />
      <ProblemNarrativeSection />
    </div>
  );
}