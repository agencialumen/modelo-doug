"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Heart, Coffee, Gift, Star, Instagram, Youtube, Music, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const supportOptions = [
  { amount: 5, icon: Coffee, label: "Café", color: "from-amber-500 to-orange-500", emoji: "☕" },
  { amount: 15, icon: Heart, label: "Carinho", color: "from-pink-500 to-red-500", emoji: "💖" },
  { amount: 30, icon: Gift, label: "Presente", color: "from-purple-500 to-indigo-500", emoji: "🎁" },
  { amount: 50, icon: Star, label: "Super Fã", color: "from-yellow-500 to-amber-500", emoji: "⭐" },
]

export default function SupportSection() {
  const [customAmount, setCustomAmount] = useState("")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const handleSupport = (amount: number) => {
    console.log(`Supporting with R$${amount}`)
    alert(`Obrigado pelo seu apoio de R$${amount}! Em uma implementação real, isso redirecionaria para o PayPal.`)
  }

  return (
    <section id="support" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20 dark:from-purple-900/40 dark:via-pink-900/40 dark:to-indigo-900/40" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6"
          >
            <Sparkles size={32} className="text-white" />
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 dark:text-white">Me Apoie</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Apoie minha jornada criativa e me ajude a continuar criando conteúdo incrível
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Support Options - Mobile Optimized */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.amount}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedAmount === option.amount ? "scale-105" : ""
                  }`}
                  onClick={() => setSelectedAmount(option.amount)}
                >
                  {/* Card */}
                  <div
                    className={`relative overflow-hidden rounded-2xl lg:rounded-3xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                      selectedAmount === option.amount ? "ring-4 ring-purple-500 shadow-purple-500/25" : ""
                    }`}
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                    />

                    {/* Content */}
                    <div className="relative p-4 lg:p-6 text-center">
                      {/* Emoji */}
                      <div className="text-3xl lg:text-4xl mb-2 lg:mb-3">{option.emoji}</div>

                      {/* Amount */}
                      <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 lg:mb-2">
                        R${option.amount}
                      </div>

                      {/* Label */}
                      <div className="text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300">
                        {option.label}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {selectedAmount === option.amount && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                      >
                        <Heart size={12} className="text-white fill-white" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Amount - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl lg:text-2xl font-semibold dark:text-white mb-2">Valor Personalizado</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">Escolha o valor que desejar</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <div className="relative flex-1 w-full sm:w-auto">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                  R$
                </span>
                <Input
                  type="number"
                  placeholder="0"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="pl-10 text-center text-lg font-semibold h-12 rounded-xl border-2 focus:border-purple-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Action Buttons - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center space-y-4"
          >
            {selectedAmount && (
              <Button
                size="lg"
                onClick={() => handleSupport(selectedAmount)}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                💖 Apoiar com R${selectedAmount}
              </Button>
            )}

            {customAmount && Number(customAmount) > 0 && (
              <Button
                size="lg"
                onClick={() => handleSupport(Number(customAmount))}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                ✨ Apoiar com R${customAmount}
              </Button>
            )}

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mt-6">
              Seu apoio me ajuda a criar conteúdo melhor e continuar minha jornada criativa. Obrigado por ser incrível!
              🙏
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800 text-center"
        >
          <div className="flex justify-center space-x-6 mb-6">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -2 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
            >
              <Instagram size={20} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -2 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
            >
              <Youtube size={20} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -2 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
            >
              <Music size={20} />
            </motion.a>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">© 2024 Douglas Myth. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </section>
  )
}
