"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Instagram, Youtube, Music, Camera, Briefcase, Globe } from "lucide-react"

const mediaLinks = [
  {
    title: "Instagram",
    handle: "@douglasmyth",
    followers: "100K+",
    description: "Conteúdo diário de moda e lifestyle",
    icon: Instagram,
    href: "#",
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    stats: "Engajamento: 8.5%",
  },
  {
    title: "YouTube",
    handle: "Douglas Myth",
    followers: "50K+",
    description: "Tutoriais de cuidados capilares e lifestyle",
    icon: Youtube,
    href: "#",
    gradient: "from-red-500 via-pink-500 to-orange-500",
    stats: "Visualizações: 2M+",
  },
  {
    title: "TikTok",
    handle: "@douglasmyth",
    followers: "200K+",
    description: "Conteúdo viral de moda e entretenimento",
    icon: Music,
    href: "#",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    stats: "Likes: 5M+",
  },
  {
    title: "Move Model",
    handle: "Portfólio Profissional",
    followers: "Elite",
    description: "Trabalhos profissionais de modelagem",
    icon: Camera,
    href: "#",
    gradient: "from-gray-600 via-gray-500 to-black",
    stats: "Campanhas: 50+",
  },
  {
    title: "Colaborações",
    handle: "Parcerias Premium",
    followers: "Brands",
    description: "Trabalhos com marcas internacionais",
    icon: Briefcase,
    href: "#",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    stats: "Marcas: 25+",
  },
  {
    title: "Internacional",
    handle: "Presença Global",
    followers: "Worldwide",
    description: "Reconhecimento internacional",
    icon: Globe,
    href: "#",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    stats: "Países: 15+",
  },
]

export default function MediaKitSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section id="media-kit" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-indigo-900/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
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
            className="text-4xl lg:text-6xl font-serif font-bold mb-6 dark:text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Presença Digital
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Conectando com audiências globais através de múltiplas plataformas
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mediaLinks.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <platform.icon size={28} className="text-white" />
                  </div>

                  {/* Platform Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold dark:text-white mb-1">{platform.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{platform.handle}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {platform.followers}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Seguidores
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{platform.stats}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{platform.description}</p>

                    {/* Action Button */}
                    <motion.a
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-gradient-to-r ${platform.gradient} text-white font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Visitar Perfil
                    </motion.a>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-lg" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "350K+", label: "Total de Seguidores" },
              { number: "7M+", label: "Impressões Mensais" },
              { number: "8.5%", label: "Taxa de Engajamento" },
              { number: "25+", label: "Marcas Parceiras" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
