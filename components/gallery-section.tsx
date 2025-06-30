"use client"

import type React from "react"
import type { HTMLTimeout } from "some-module" // Declare or import HTMLTimeout here

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSwipe } from "@/hooks/use-swipe"
import { useDoubleTap } from "@/hooks/use-double-tap"
import HeartAnimation from "@/components/heart-animation"
import LikeCounter from "@/components/like-counter"

const storyItems = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=400",
    title: "Bastidores",
    description: "Momentos exclusivos dos bastidores do meu último ensaio fotográfico",
    likes: 0,
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=400",
    title: "Fashion Week",
    description: "Destaques da Semana de Moda de Paris 2024",
    likes: 0,
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=400",
    title: "Sessão de Estúdio",
    description: "Processo criativo no meu estúdio de fotografia favorito",
    likes: 0,
  },
  {
    id: 4,
    image: "/placeholder.svg?height=600&width=400",
    title: "Colaboração de Marca",
    description: "Trabalhando com marcas premium de moda",
    likes: 0,
  },
  {
    id: 5,
    image: "/placeholder.svg?height=600&width=400",
    title: "Diário de Viagem",
    description: "Aventuras ao redor do mundo",
    likes: 0,
  },
  {
    id: 6,
    image: "/placeholder.svg?height=600&width=400",
    title: "Momentos Lifestyle",
    description: "Momentos espontâneos do meu dia a dia",
    likes: 0,
  },
  {
    id: 7,
    image: "/placeholder.svg?height=600&width=400",
    title: "Ensaio Editorial",
    description: "Fotografia editorial de alta moda",
    likes: 0,
  },
  {
    id: 8,
    image: "/placeholder.svg?height=600&width=400",
    title: "Street Style",
    description: "Moda urbana e fotografia de rua",
    likes: 0,
  },
]

interface Heart {
  id: string
  x: number
  y: number
}

export default function GallerySection() {
  const [currentStory, setCurrentStory] = useState(0)
  const [isStoryPlaying, setIsStoryPlaying] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [storyLikes, setStoryLikes] = useState<number[]>(storyItems.map((item) => item.likes))
  const [hearts, setHearts] = useState<Heart[]>([])
  const [isLiked, setIsLiked] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const storyIntervalRef = useRef<HTMLTimeout | null>(null)
  const storyContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isStoryPlaying && !isTransitioning) {
      storyIntervalRef.current = setInterval(() => {
        nextStory()
      }, 4000)
    } else {
      if (storyIntervalRef.current) {
        clearInterval(storyIntervalRef.current)
      }
    }

    return () => {
      if (storyIntervalRef.current) {
        clearInterval(storyIntervalRef.current)
      }
    }
  }, [isStoryPlaying, isTransitioning])

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
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handleDoubleTap = (event: React.TouchEvent | React.MouseEvent) => {
    if (!storyContainerRef.current) return

    const rect = storyContainerRef.current.getBoundingClientRect()
    const x = ("touches" in event ? event.changedTouches[0].clientX : event.clientX) - rect.left
    const y = ("touches" in event ? event.changedTouches[0].clientY : event.clientY) - rect.top

    // Add heart animation
    const newHeart: Heart = {
      id: Date.now().toString() + Math.random(),
      x,
      y,
    }

    setHearts((prev) => [...prev, newHeart])

    // Increment like count
    setStoryLikes((prev) => {
      const newLikes = [...prev]
      newLikes[currentStory] += 1
      return newLikes
    })

    setIsLiked(true)

    // Reset liked state after animation
    setTimeout(() => setIsLiked(false), 1000)
  }

  const handleHeartComplete = (heartId: string) => {
    setHearts((prev) => prev.filter((heart) => heart.id !== heartId))
  }

  // Swipe handlers
  const swipeHandlers = useSwipe({
    onSwipedLeft: nextStory,
    onSwipedRight: prevStory,
    onDoubleTap: handleDoubleTap,
  })

  // Double-tap handler for desktop
  const doubleTapHandler = useDoubleTap({
    onDoubleTap: handleDoubleTap,
  })

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 dark:text-white">Galeria Stories</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore minha jornada visual através de fotos exclusivas e momentos dos bastidores
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 md:hidden">
            👆 Deslize para esquerda/direita para navegar • Toque duplo para curtir ❤️
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 hidden md:block">
            Clique duplo para curtir ❤️ • Use as setas ou clique para navegar
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Story Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-8"
          >
            {/* Story Progress Bars */}
            <div className="flex space-x-1 mb-6">
              {storyItems.map((_, index) => (
                <div key={index} className="flex-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{
                      width: index === currentStory ? "100%" : index < currentStory ? "100%" : "0%",
                    }}
                    transition={{
                      duration: index === currentStory && isStoryPlaying && !isTransitioning ? 4 : 0.3,
                      ease: "linear",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Story Controls */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold dark:text-white">{storyItems[currentStory].title}</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevStory}
                  disabled={isTransitioning}
                  className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20 disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsStoryPlaying(!isStoryPlaying)}
                  className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                >
                  {isStoryPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span className="ml-2 hidden sm:inline">{isStoryPlaying ? "Pausar" : "Reproduzir"}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextStory}
                  disabled={isTransitioning}
                  className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20 disabled:opacity-50"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            {/* Current Story Image */}
            <div
              ref={storyContainerRef}
              className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto shadow-2xl select-none touch-pan-y cursor-pointer"
              {...swipeHandlers}
              onClick={doubleTapHandler}
            >
              <motion.img
                key={currentStory}
                src={storyItems[currentStory].image || "/placeholder.svg"}
                alt={storyItems[currentStory].title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Heart Animations */}
              <HeartAnimation hearts={hearts} onHeartComplete={handleHeartComplete} />

              {/* Like Counter */}
              <div className="absolute top-4 right-4">
                <LikeCounter count={storyLikes[currentStory]} isLiked={isLiked} />
              </div>

              {/* Swipe Indicators - Mobile Only */}
              <div className="absolute inset-y-0 left-0 w-1/3 flex items-center justify-start pl-4 md:hidden pointer-events-none">
                <motion.div
                  className="w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ChevronLeft size={16} className="text-white" />
                </motion.div>
              </div>
              <div className="absolute inset-y-0 right-0 w-1/3 flex items-center justify-end pr-4 md:hidden pointer-events-none">
                <motion.div
                  className="w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  <ChevronRight size={16} className="text-white" />
                </motion.div>
              </div>

              {/* Story Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <motion.h4
                  key={`title-${currentStory}`}
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {storyItems[currentStory].title}
                </motion.h4>
                <motion.p
                  key={`desc-${currentStory}`}
                  className="text-sm text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {storyItems[currentStory].description}
                </motion.p>
              </div>

              {/* Desktop Navigation Overlay */}
              <div className="absolute inset-0 hidden md:flex">
                <button
                  onClick={prevStory}
                  disabled={isTransitioning}
                  className="flex-1 opacity-0 hover:opacity-100 transition-opacity duration-300 disabled:cursor-not-allowed"
                  aria-label="Previous story"
                />
                <button
                  onClick={nextStory}
                  disabled={isTransitioning}
                  className="flex-1 opacity-0 hover:opacity-100 transition-opacity duration-300 disabled:cursor-not-allowed"
                  aria-label="Next story"
                />
              </div>
            </div>
          </motion.div>

          {/* Story Thumbnails Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-4 md:grid-cols-8 gap-3 max-w-2xl mx-auto"
          >
            {storyItems.map((story, index) => (
              <button
                key={story.id}
                onClick={() => goToStory(index)}
                disabled={isTransitioning}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  index === currentStory
                    ? "border-purple-500 shadow-lg shadow-purple-500/25"
                    : "border-gray-300 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400"
                }`}
              >
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {index === currentStory && (
                  <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
                  </div>
                )}
                {/* Like indicator on thumbnail */}
                {storyLikes[index] > 0 && (
                  <div className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {storyLikes[index]}
                  </div>
                )}
              </button>
            ))}
          </motion.div>

          {/* Story Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentStory + 1} de {storyItems.length} stories
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
