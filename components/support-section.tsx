"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Heart, Coffee, Gift, Star, Instagram, Youtube, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const supportOptions = [
  { amount: 5, icon: Coffee, label: "Me pague um café", color: "from-amber-500 to-orange-500" },
  { amount: 10, icon: Heart, label: "Mostre seu carinho", color: "from-pink-500 to-red-500" },
  { amount: 25, icon: Gift, label: "Apoie meu trabalho", color: "from-purple-500 to-indigo-500" },
  { amount: 50, icon: Star, label: "Seja um super fã", color: "from-yellow-500 to-amber-500" },
]

export default function SupportSection() {
  const [customAmount, setCustomAmount] = useState("")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const handleSupport = (amount: number) => {
    // In a real implementation, this would integrate with PayPal or another payment processor
    console.log(`Supporting with $${amount}`)
    alert(`Thank you for your support of $${amount}! This would redirect to PayPal in a real implementation.`)
  }

  return (
    <section id="support" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 dark:text-white">Me Apoie</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Apoie minha jornada criativa e me ajude a continuar criando conteúdo incrível
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.amount}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                    selectedAmount === option.amount
                      ? "border-purple-500 shadow-lg"
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedAmount(option.amount)}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center`}
                    >
                      <option.icon size={24} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 dark:text-white">${option.amount}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{option.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="flex items-center justify-center space-x-4 max-w-md mx-auto">
              <Input
                type="number"
                placeholder="Valor personalizado"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="text-center"
              />
              <span className="text-gray-500 dark:text-gray-400">USD</span>
            </div>

            <div className="space-y-4">
              {selectedAmount && (
                <Button
                  size="lg"
                  onClick={() => handleSupport(selectedAmount)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold"
                >
                  Apoiar com R${selectedAmount}
                </Button>
              )}

              {customAmount && (
                <Button
                  size="lg"
                  onClick={() => handleSupport(Number.parseInt(customAmount))}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold"
                >
                  Apoiar com R${customAmount}
                </Button>
              )}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Seu apoio me ajuda a criar conteúdo melhor e continuar minha jornada criativa. Obrigado por ser incrível!
            </p>
          </motion.div>
        </div>

        {/* Simple Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800 text-center"
        >
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <Youtube size={24} />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Music size={24} />
            </a>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">© 2024 Douglas Myth. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  )
}
