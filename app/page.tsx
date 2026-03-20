"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { LandingAccordionItem } from "@/components/ui/interactive-image-accordion";

export default function Home() {
  return (
    <AuroraBackground>
      <div className="relative z-10 w-full">
        <LandingAccordionItem />
      </div>
    </AuroraBackground>
  );
}
