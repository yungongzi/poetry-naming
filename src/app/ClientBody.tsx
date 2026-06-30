"use client";

import { useCallback } from "react";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DrawingHall from "@/components/DrawingHall";
import SmartMatch from "@/components/SmartMatch";
import Library from "@/components/Library";
import Favorites from "@/components/Favorites";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="antialiased">
      <Background />
      <Navbar onNav={scrollTo} />
      <main>
        <Hero
          onDraw={() => scrollTo("drawing")}
          onBrowse={() => scrollTo("library")}
        />
        <DrawingHall />
        <SmartMatch />
        <Library />
        <Favorites />
      </main>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "hsl(166 28% 11%)",
            border: "1px solid hsl(0 0% 100% / 0.16)",
            color: "hsl(40 44% 92%)",
          },
        }}
      />
      {children}
    </div>
  );
}
