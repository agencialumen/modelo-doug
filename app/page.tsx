"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import MediaKitSection from "@/components/media-kit-section"
import ProjectsSection from "@/components/projects-section"
import GallerySection from "@/components/gallery-section"
import SupportSection from "@/components/support-section"
import Navigation from "@/components/navigation"
import CustomCursor from "@/components/custom-cursor"
import ChatBot from "@/components/chat-bot"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden">
        <CustomCursor />
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <MediaKitSection />
          <ProjectsSection />
          <GallerySection />
          <SupportSection />
        </main>
        <ChatBot />
      </div>
    </ThemeProvider>
  )
}
