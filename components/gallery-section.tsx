"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, Heart, Play, Pause, Grid3X3, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSwipe } from "@/hooks/use-swipe"
import { useDoubleTap } from "@/hooks/use-double-tap"
import HeartAnimation from "@/components/heart-animation"

const storyItems = [
  {
    id: 1,
    image: "/placeholder.svg?height=800&width=450",
    title: "Editorial Fashion",
    location: "Milano, Italy",
    likes: 0,
    category: "Editorial",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=800&width=450",
    title: "Behind the Scenes",
    location: "Paris, France",
    likes: 0,
    category: "Backstage",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=800&width=450",
    title: "Studio Session",
    location: "New York, USA",
    likes: 0,
    category: "Studio",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=800&width=450",
    title: "Street Style",
    location: "London, UK",
    likes: 0,
    category: "Street",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=800&width=450",
    title: "Campaign Shoot",
    location: "Tokyo, Japan",
    likes: 0,
    category: "Campaign",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=800&width=450",
    title: "Runway Backstage",
    location: "São Paulo, Brazil",
    likes: 0,
    category: "Runway",
  },
]

interface StoryHeart {
  id: string
  x: number
  y: number
}

export default function GallerySection() {
  const [currentStory, setCurrentStory] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [storyLikes, setStoryLikes] = useState<number[]>(storyItems.map((item) => item.likes))
  const [hearts, setHearts] = useState<StoryHeart[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [viewMode, setViewMode] = useState<"story" | "grid">("story")
  const [selectedGridImage, setSelectedGridImage] = useState<number | null>(null)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const storyContainerRef = useRef<HTMLDivElement>(null)

  const nextStory = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentStory((prev) => (prev + 1) % storyItems.length)
    setIsLiked(false)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevStory = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentStory((prev) => (prev - 1 + storyItems.length) % storyItems.length)
    setIsLiked(false)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToStory = (index: number) => {
    if (isTransitioning || index === currentStory) return
    setIsTransitioning(true)
    setCurrentStory(index)
    setIsLiked(false)
    setViewMode("story")
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handleDoubleTap = (event: React.TouchEvent | React.MouseEvent) => {
    if (!storyContainerRef.current) return

    const rect = storyContainerRef.current.getBoundingClientRect()
    const x = ("touches" in event ? event.changedTouches[0].clientX : event.clientX) - rect.left
    const y = ("touches" in event ? event.changedTouches[0].clientY : event.clientY) - rect.top

    const newHeart: StoryHeart = {
      id: Date.now().toString() + Math.random(),
      x,
      y,
    }

    setHearts((prev) => [...prev, newHeart])
    setStoryLikes((prev) => {
      const newLikes = [...prev]
      newLikes[currentStory] += 1
      return newLikes
    })
    setIsLiked(true)
    setTimeout(() => setIsLiked(false), 1000)
  }

  const handleHeartComplete = (heartId: string) => {
    setHearts((prev) => prev.filter((heart) => heart.id !== heartId))
  }

  const swipeHandlers = useSwipe({
    onSwipedLeft: nextStory,
    onSwipedRight: prevStory,
    onDoubleTap: handleDoubleTap,
  })

  const doubleTapHandler = useDoubleTap({
    onDoubleTap: handleDoubleTap,
  })

  // Auto-advance stories
  useEffect(() => {
    if (!isPlaying || viewMode === "grid") return

    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextStory()
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [isTransitioning, isPlaying, viewMode])

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl lg:text-6xl font-serif font-bold mb-6 dark:text-white tracking-tight"
          >
            GALERIA
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <div className="w-24 h-0.5 bg-black dark:bg-white mx-auto mb-6" />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto tracking-wide">
              MOMENTOS EXCLUSIVOS • BASTIDORES • EDITORIAL
            </p>
          </motion.div>

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-4 mb-8"
          >
            <Button
              variant={viewMode === "story" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("story")}
              className={`rounded-full px-6 ${
                viewMode === "story"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border-gray-300 dark:border-gray-600 bg-transparent"
              }`}
            >
              <Maximize2 size={16} className="mr-2" />
              STORIES
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`rounded-full px-6 ${
                viewMode === "grid"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border-gray-300 dark:border-gray-600 bg-transparent"
              }`}
            >
              <Grid3X3 size={16} className="mr-2" />
              GRID
            </Button>
          </motion.div>
        </motion.div>

        {/* Story Mode */}
        {viewMode === "story" && (
          <div className="max-w-md mx-auto">
            {/* Story Progress Bars */}
            <div className="flex space-x-1 mb-8">
              {storyItems.map((_, index) => (
                <div key={index} className="flex-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-black dark:bg-white"
                    initial={{ width: "0%" }}
                    animate={{
                      width: index === currentStory ? "100%" : index < currentStory ? "100%" : "0%",
                    }}
                    transition={{
                      duration: index === currentStory && isPlaying && !isTransitioning ? 4 : 0.3,
                      ease: "linear",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Story Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                <span className="text-sm text-gray-500 dark:text-gray-400 tracking-widest uppercase">
                  {isPlaying ? "PAUSAR" : "REPRODUZIR"}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 tracking-widest uppercase">
                {String(currentStory + 1).padStart(2, "0")} / {String(storyItems.length).padStart(2, "0")}
              </div>
            </div>

            {/* Story Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div
                ref={storyContainerRef}
                className="relative bg-black rounded-3xl overflow-hidden aspect-[9/16] shadow-2xl select-none cursor-pointer"
                {...swipeHandlers}
                onClick={doubleTapHandler}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentStory}
                    src={storyItems[currentStory].image || "/placeholder.svg"}
                    alt={storyItems[currentStory].title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Heart Animations */}
                <HeartAnimation hearts={hearts} onHeartComplete={handleHeartComplete} />

                {/* Story Info */}
                <div className="absolute bottom-8 left-6 right-6 text-white">
                  <motion.div
                    key={`info-${currentStory}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-widest">
                        {storyItems[currentStory].category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-2 tracking-wide">
                      {storyItems[currentStory].title}
                    </h3>
                    <p className="text-sm text-white/80 uppercase tracking-widest">
                      {storyItems[currentStory].location}
                    </p>
                  </motion.div>
                </div>

                {/* Like Counter */}
                <div className="absolute top-6 right-6">
                  <motion.div
                    className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2"
                    initial={{ scale: 1 }}
                    animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart
                      size={16}
                      className={`transition-colors duration-300 ${isLiked ? "text-red-500 fill-red-500" : "text-white"}`}
                    />
                    {storyLikes[currentStory] > 0 && (
                      <span className="text-white text-sm font-medium">{storyLikes[currentStory]}</span>
                    )}
                  </motion.div>
                </div>

                {/* Navigation Arrows - Desktop */}
                <div className="absolute inset-y-0 left-0 right-0 hidden md:flex">
                  <button
                    onClick={prevStory}
                    disabled={isTransitioning}
                    className="flex-1 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-start pl-4"
                    aria-label="Previous story"
                  >
                    <div className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ChevronLeft size={20} className="text-white" />
                    </div>
                  </button>
                  <button
                    onClick={nextStory}
                    disabled={isTransitioning}
                    className="flex-1 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-end pr-4"
                    aria-label="Next story"
                  >
                    <div className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ChevronRight size={20} className="text-white" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex justify-center space-x-4 mt-6 md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStory}
                  disabled={isTransitioning}
                  className="rounded-full border-gray-300 dark:border-gray-600 bg-transparent"
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextStory}
                  disabled={isTransitioning}
                  className="rounded-full border-gray-300 dark:border-gray-600 bg-transparent"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Grid Mode */}
        {viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {storyItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => goToStory(index)}
                >
                  <div className="relative aspect-[4/5] bg-black rounded-lg overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay Info */}
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                        {item.category}
                      </div>
                      <h4 className="font-serif font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-white/80 uppercase tracking-wide">{item.location}</p>
                    </div>

                    {/* Like indicator */}
                    {storyLikes[index] > 0 && (
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <Heart size={12} className="text-red-500 fill-red-500" />
                        <span className="text-white text-xs">{storyLikes[index]}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Grid Footer */}
            <div className="text-center mt-12">
              <p className="text-sm text-gray-500 dark:text-gray-400 tracking-widest uppercase">
                {storyItems.length} IMAGENS • CLIQUE PARA VER EM STORY
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
