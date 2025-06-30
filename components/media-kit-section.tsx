"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Instagram, Youtube, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const mediaLinks = [
  {
    title: "Perfil Instagram",
    description: "Acompanhe meu conteúdo diário de moda e lifestyle",
    icon: Instagram,
    href: "#",
    color: "from-pink-500 to-purple-600",
    textColor: "text-pink-600 dark:text-pink-400",
  },
  {
    title: "Move Model",
    description: "Portfólio profissional de modelagem",
    icon: Briefcase,
    href: "#",
    color: "from-blue-500 to-cyan-600",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "YouTube Cuidados Capilares",
    description: "Dicas e tutoriais de cuidados com o cabelo",
    icon: Youtube,
    href: "#",
    color: "from-red-500 to-pink-600",
    textColor: "text-red-600 dark:text-red-400",
  },
  {
    title: "Promoção Gocase",
    description: "Colaboração com acessórios tech",
    icon: ExternalLink,
    href: "#",
    color: "from-green-500 to-teal-600",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Colaboração Joy Bag",
    description: "Parceria com acessórios de moda",
    icon: ExternalLink,
    href: "#",
    color: "from-purple-500 to-indigo-600",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Promoção Beetools English",
    description: "Plataforma de aprendizado de idiomas",
    icon: ExternalLink,
    href: "#",
    color: "from-orange-500 to-red-600",
    textColor: "text-orange-600 dark:text-orange-400",
  },
]

export default function MediaKitSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section id="media-kit" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 dark:text-white">Kit de Mídia</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore minhas colaborações profissionais e conteúdo em várias plataformas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${link.color} text-white`}>
                      <link.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg mb-2 ${link.textColor}`}>{link.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{link.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300 bg-transparent"
                        asChild
                      >
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          Visitar <ExternalLink size={14} className="ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
