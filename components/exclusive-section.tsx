"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Heart, Coffee, Gift, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const contributionOptions = [
  {
    title: "CAFÉ",
    amount: 5,
    icon: Coffee,
    description: "Me pague um café",
    emoji: "☕",
  },
  {
    title: "CARINHO",
    amount: 15,
    icon: Heart,
    description: "Mostre seu apoio",
    emoji: "💖",
  },
  {
    title: "PRESENTE",
    amount: 30,
    icon: Gift,
    description: "Um presente especial",
    emoji: "🎁",
  },
  {
    title: "SUPER FÃ",
    amount: 50,
    icon: Star,
    description: "Apoio de super fã",
    emoji: "⭐",
  },
]

export default function ExclusiveSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const handleContribution = (amount: number) => {
    console.log(`Contributing $${amount}`)
    alert(
      `Obrigado pelo seu carinho de $${amount}! Em uma implementação real, isso redirecionaria para o sistema de pagamento.`,
    )
  }

  return (
    <section id="exclusive" className="py-20 lg:py-32 bg-black text-white">
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
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl lg:text-6xl font-serif font-bold mb-6 tracking-tight"
          >
            APOIE MEU TRABALHO
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <div className="w-24 h-0.5 bg-white mx-auto mb-6" />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto tracking-wide">
              SUA CONTRIBUIÇÃO VOLUNTÁRIA AJUDA A IMPULSIONAR MINHA CARREIRA
            </p>
          </motion.div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contribution Options */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contributionOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer hover:bg-white/10 ${
                    selectedAmount === option.amount ? "border-white/50 bg-white/10" : ""
                  }`}
                  onClick={() => setSelectedAmount(selectedAmount === option.amount ? null : option.amount)}
                >
                  {/* Content */}
                  <div className="p-6 text-center">
                    {/* Emoji */}
                    <div className="text-4xl mb-4">{option.emoji}</div>

                    {/* Amount */}
                    <div className="text-3xl font-serif font-bold mb-2">
                      ${option.amount}
                      <span className="text-sm font-normal text-gray-400 ml-1">USD</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold mb-2 tracking-widest">{option.title}</h3>

                    {/* Description */}
                    <p className="text-xs text-gray-400">{option.description}</p>
                  </div>

                  {/* Selection Indicator */}
                  {selectedAmount === option.amount && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-4 h-4 bg-white rounded-full flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-black rounded-full" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Amount */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 mb-8"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2 tracking-wide">VALOR PERSONALIZADO</h3>
              <p className="text-gray-300 text-sm">Escolha o valor que desejar contribuir</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <div className="relative flex-1 w-full sm:w-auto">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">$</span>
                <Input
                  type="number"
                  placeholder="0"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="pl-8 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-white/50 text-center"
                />
              </div>
              <span className="text-gray-400 text-sm">USD</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center space-y-4"
          >
            {selectedAmount && (
              <Button
                onClick={() => handleContribution(selectedAmount)}
                className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300"
              >
                💖 CONTRIBUIR ${selectedAmount}
              </Button>
            )}

            {customAmount && Number(customAmount) > 0 && (
              <Button
                onClick={() => handleContribution(Number(customAmount))}
                className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300"
              >
                ✨ CONTRIBUIR ${customAmount}
              </Button>
            )}

            <p className="text-sm text-gray-400 max-w-md mx-auto mt-8">
              Sua contribuição voluntária é muito apreciada e me ajuda a continuar criando conteúdo de qualidade.
              Obrigado pelo seu apoio! 🙏
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 pt-12 border-t border-white/10 text-center"
        >
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            © 2024 Douglas Myth • Todos os direitos reservados
          </p>
        </motion.div>
      </div>
    </section>
  )
}
