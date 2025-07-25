'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Smartphone, Wifi, CreditCard, Zap } from 'lucide-react'

interface Provider {
  id: number
  name: string
  icon: string
  color: string
  gradient: string
}

const providerData: Provider[] = [
  {
    id: 1,
    name: 'Telkomsel',
    icon: '/images/providers/telkomsel-icon.jpg',
    color: 'text-red-500',
    gradient: 'from-red-500/20 to-red-600/20'
  },
  {
    id: 2,
    name: 'Indosat',
    icon: '/images/providers/indosat-icon.jpg',
    color: 'text-yellow-500',
    gradient: 'from-yellow-500/20 to-yellow-600/20'
  },
  {
    id: 3,
    name: 'XL',
    icon: '/images/providers/xl-icon.jpg',
    color: 'text-blue-500',
    gradient: 'from-blue-500/20 to-blue-600/20'
  },
  {
    id: 4,
    name: 'Tri',
    icon: '/images/providers/tri-icon.jpg',
    color: 'text-gray-300',
    gradient: 'from-gray-500/20 to-gray-600/20'
  },
  {
    id: 5,
    name: 'Smartfren',
    icon: '/images/providers/smartfren-icon.jpg',
    color: 'text-green-500',
    gradient: 'from-green-500/20 to-green-600/20'
  },
  {
    id: 6,
    name: 'By U',
    icon: '/images/providers/byu-icon.jpg',
    color: 'text-purple-500',
    gradient: 'from-purple-500/20 to-purple-600/20'
  },
  {
    id: 7,
    name: 'AXIS',
    icon: '/images/providers/axis-icon.jpg',
    color: 'text-orange-500',
    gradient: 'from-orange-500/20 to-orange-600/20'
  }
]

export default function Credit() {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedNominal, setSelectedNominal] = useState<number | null>(null)

  const nominalPulsa = [
    { id: 1, amount: 5000, price: 6000 },
    { id: 2, amount: 10000, price: 11000 },
    { id: 3, amount: 20000, price: 21000 },
    { id: 4, amount: 25000, price: 26000 },
    { id: 5, amount: 50000, price: 51000 },
    { id: 6, amount: 100000, price: 101000 },
  ]

  const paketData = [
    { id: 1, name: '1GB/7 Hari', price: 15000 },
    { id: 2, name: '2GB/14 Hari', price: 25000 },
    { id: 3, name: '5GB/30 Hari', price: 50000 },
    { id: 4, name: '10GB/30 Hari', price: 85000 },
    { id: 5, name: '20GB/30 Hari', price: 135000 },
    { id: 6, name: '50GB/30 Hari', price: 200000 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center space-x-3 mb-4"
        >
          <Smartphone className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold glow-text">Pulsa & Paket Data</h2>
          <Wifi className="w-8 h-8 text-secondary" />
        </motion.div>
        <motion.p 
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Isi pulsa dan beli paket data untuk semua operator dengan harga terbaik dan proses instan
        </motion.p>
      </div>

      {/* Provider Selection */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
          <CreditCard className="w-6 h-6 text-primary" />
          <span>Pilih Provider</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {providerData.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedProvider?.id === provider.id
                  ? 'border-primary bg-primary/10 shadow-glow'
                  : 'border-gray-700 bg-gradient-to-br from-dark-light to-dark hover:border-gray-600'
              }`}
              onClick={() => setSelectedProvider(provider)}
            >
              {/* Provider icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${provider.gradient} 
                            flex items-center justify-center text-3xl relative overflow-hidden group`}>
                {/* Fallback text */}
                <span className="relative z-10 text-2xl font-bold text-white">
                  {provider.name.charAt(0)}
                </span>
                {/* Provider icon image */}
                <img 
                  src={provider.icon} 
                  alt={provider.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.opacity = '1';
                    const fallback = img.parentElement?.querySelector('span');
                    if (fallback) (fallback as HTMLElement).style.opacity = '0';
                  }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                  }}
                  style={{ opacity: 0 }}
                />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                              -translate-x-full group-hover:translate-x-full transition-transform duration-700 
                              transform skew-x-12"></div>
              </div>

              {/* Provider name */}
              <h4 className={`font-semibold text-center transition-colors duration-300 ${
                selectedProvider?.id === provider.id ? 'text-primary' : 'text-white'
              }`}>
                {provider.name}
              </h4>

              {/* Selection indicator */}
              {selectedProvider?.id === provider.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full 
                           flex items-center justify-center text-white text-sm"
                >
                  ✓
                </motion.div>
              )}

              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 
                            pointer-events-none ${
                selectedProvider?.id === provider.id ? 'opacity-100' : 'hover:opacity-100'
              } shadow-[0_0_30px_rgba(99,102,241,0.3)]`}></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Phone Number Input */}
      {selectedProvider && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Nomor Telepon</h3>
          <div className="max-w-md">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Masukkan nomor telepon"
              className="w-full px-4 py-3 bg-dark-light rounded-lg border border-gray-600 
                       text-white placeholder-gray-400 focus:border-primary 
                       focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <p className="text-sm text-gray-400 mt-2">
              Format: 08xxxxxxxxxx atau +628xxxxxxxxxx
            </p>
          </div>
        </motion.div>
      )}

      {/* Nominal Selection */}
      {selectedProvider && phoneNumber && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Pulsa */}
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span>Pulsa</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {nominalPulsa.map((nominal) => (
                <motion.div
                  key={nominal.id}
                  onClick={() => setSelectedNominal(nominal.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedNominal === nominal.id
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'border-gray-700 bg-dark-light hover:border-gray-600'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-1">
                      Rp {nominal.amount.toLocaleString()}
                    </h4>
                    <p className="text-primary text-sm font-bold">
                      Rp {nominal.price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Paket Data */}
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <Wifi className="w-6 h-6 text-green-400" />
              <span>Paket Data</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {paketData.map((paket) => (
                <motion.div
                  key={paket.id}
                  onClick={() => setSelectedNominal(paket.id + 100)} // Different ID range
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedNominal === paket.id + 100
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'border-gray-700 bg-dark-light hover:border-gray-600'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-1">
                      {paket.name}
                    </h4>
                    <p className="text-primary text-sm font-bold">
                      Rp {paket.price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Purchase Button */}
      {selectedProvider && phoneNumber && selectedNominal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl 
                     font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300
                     flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert('Redirecting to payment...')}
          >
            <CreditCard className="w-6 h-6" />
            <span>Beli Sekarang</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
