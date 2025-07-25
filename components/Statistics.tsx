'use client'

import { motion } from 'framer-motion'
import { Users, ShoppingBag, Star, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

interface StatItem {
  icon: React.ComponentType<any>
  value: number
  label: string
  suffix?: string
  color: string
}

const statsData: StatItem[] = [
  {
    icon: Users,
    value: 250000,
    label: 'Total Users',
    suffix: '+',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: ShoppingBag,
    value: 150000,
    label: 'Successful Orders',
    suffix: '+',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: Star,
    value: 4.9,
    label: 'Rating Score',
    suffix: '/5',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    icon: Clock,
    value: 24,
    label: 'Hours Support',
    suffix: '/7',
    color: 'from-purple-400 to-purple-600'
  }
]

function AnimatedCounter({ targetValue, suffix = '', duration = 2000 }: {
  targetValue: number
  suffix?: string
  duration?: number
}) {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const value = easeOutQuart * targetValue
      
      setCurrentValue(value)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [targetValue, duration])

  const formatValue = (value: number) => {
    if (targetValue >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M'
    } else if (targetValue >= 1000) {
      return (value / 1000).toFixed(0) + 'K'
    } else if (targetValue < 10) {
      return value.toFixed(1)
    } else {
      return Math.floor(value).toLocaleString()
    }
  }

  return (
    <span className="font-bold text-2xl">
      {formatValue(currentValue)}{suffix}
    </span>
  )
}

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('statistics-section')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <motion.section 
      id="statistics-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-gradient-to-r from-dark-light/50 to-dark/50 backdrop-blur-sm 
                 border-t border-gray-800/50 mt-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold glow-text mb-4">
            Dipercaya Oleh Ribuan Gamers
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Bergabunglah dengan komunitas besar kami dan rasakan pengalaman topup terbaik
            dengan layanan 24/7 dan proses instan.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <div className="glass-effect rounded-2xl p-6 text-center relative overflow-hidden
                            hover:shadow-glow transition-all duration-300">
                
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 
                               group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Animated particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                      }}
                      animate={{
                        y: [-10, -20, -10],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} 
                            flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Value */}
                <div className="mb-2 text-white">
                  {isVisible ? (
                    <AnimatedCounter 
                      targetValue={stat.value} 
                      suffix={stat.suffix}
                      duration={2000 + index * 300}
                    />
                  ) : (
                    <span className="font-bold text-2xl">0{stat.suffix}</span>
                  )}
                </div>

                {/* Label */}
                <p className="text-gray-400 text-sm font-medium group-hover:text-gray-300 
                             transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                              -translate-x-full group-hover:translate-x-full transition-transform duration-700 
                              transform skew-x-12"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { icon: '🔒', text: 'Secure Payment', desc: 'SSL Protected' },
            { icon: '⚡', text: 'Instant Delivery', desc: 'Process in Seconds' },
            { icon: '🎮', text: 'All Games', desc: '100+ Supported' },
            { icon: '💰', text: 'Best Price', desc: 'Guaranteed Lowest' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
              className="text-center group cursor-default"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h4 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                {item.text}
              </h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
