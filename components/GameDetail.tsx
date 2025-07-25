'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, ShoppingCart, Star, Clock, Shield } from 'lucide-react'
import { Game } from '../types/game'
import Button from './ui/Button'
import Input from './ui/Input'
import { PurchaseConfirmModal } from './ui/ConfirmModal'
import { useToastContext } from './ui/ToastProvider'

interface GameDetailProps {
  game: Game
  onClose: () => void
}

const topupPackages = [
  { id: 1, amount: '86 Diamonds', price: 'Rp 20.000', popular: false },
  { id: 2, amount: '172 Diamonds', price: 'Rp 40.000', popular: false },
  { id: 3, amount: '257 Diamonds', price: 'Rp 60.000', popular: true },
  { id: 4, amount: '344 Diamonds', price: 'Rp 80.000', popular: false },
  { id: 5, amount: '429 Diamonds', price: 'Rp 100.000', popular: false },
  { id: 6, amount: '514 Diamonds', price: 'Rp 120.000', popular: false },
  { id: 7, amount: '878 Diamonds', price: 'Rp 200.000', popular: false },
  { id: 8, amount: '1159 Diamonds', price: 'Rp 250.000', popular: false },
  { id: 9, amount: '2195 Diamonds', price: 'Rp 500.000', popular: false },
  { id: 10, amount: '4830 Diamonds', price: 'Rp 1.000.000', popular: false },
]

export default function GameDetail({ game, onClose }: GameDetailProps) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [userId, setUserId] = useState('')
  const [serverId, setServerId] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { showSuccess, showError } = useToastContext()

  const handlePurchase = () => {
    if (!selectedPackage || !userId || !serverId) {
      showError('Data Tidak Lengkap', 'Mohon lengkapi User ID dan Server ID terlebih dahulu.')
      return
    }
    setShowConfirmModal(true)
  }

  const handleConfirmPurchase = async () => {
    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showSuccess('Pembelian Berhasil!', 'Item akan segera dikirim ke akun game Anda.')
      setShowConfirmModal(false)
      onClose()
    } catch (error) {
      showError('Pembelian Gagal', 'Terjadi kesalahan saat memproses pembayaran.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-dark border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header dengan banner game yang lebih besar dan menarik */}
        <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
          {/* Parallax background */}
          <motion.div 
            className="absolute inset-0 scale-110"
            animate={{
              scale: [1.1, 1.15, 1.1],
              rotate: [0, 1, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src={game.banner} 
              alt={`${game.name} banner`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
              }}
            />
          </motion.div>
          
          {/* Enhanced gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: '110%',
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  y: '-10%',
                  opacity: [0, 1, 0],
                  scale: [0, Math.random() * 0.8 + 0.5, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
              />
            ))}
          </div>
          
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full 
                     flex items-center justify-center text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>
          
          {/* Game info dengan desain yang lebih menarik */}
          <div className="absolute bottom-8 left-8 flex items-center space-x-6 z-10">
            {/* Game icon dengan efek glow */}
            <motion.div 
              className="relative"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl 
                            flex items-center justify-center text-4xl font-bold backdrop-blur-sm
                            border border-white/20 shadow-2xl relative overflow-hidden">
                {/* Fallback character */}
                <div className="absolute inset-0 flex items-center justify-center z-10 text-white">
                  {game.name.charAt(0)}
                </div>
                {/* Game icon */}
                <img 
                  src={game.icon} 
                  alt={game.name}
                  className="w-full h-full object-cover rounded-2xl opacity-0 transition-opacity duration-300"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.opacity = '1';
                    const fallback = img.parentElement?.querySelector('div');
                    if (fallback) (fallback as HTMLElement).style.opacity = '0';
                  }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                  }}
                />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              {/* Pulsing ring */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-2xl border-2 border-white/40"
              />
            </motion.div>
            
            {/* Game details */}
            <div className="flex-1">
              <motion.h1 
                className="text-3xl font-bold text-white mb-2 drop-shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {game.name}
              </motion.h1>
              <motion.p 
                className="text-white/90 mb-4 text-lg drop-shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {game.description}
              </motion.p>
              <motion.div 
                className="flex items-center space-x-6 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center space-x-2 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
                  <Star size={18} className="text-yellow-400" fill="currentColor" />
                  <span className="text-white font-medium">4.8</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
                  <Clock size={18} className="text-green-400" />
                  <span className="text-white font-medium">Instant</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
                  <Shield size={18} className="text-blue-400" />
                  <span className="text-white font-medium">100% Aman</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="custom-scrollbar max-h-[calc(90vh-12rem)] overflow-y-auto">
          {/* Game Info Section - No 12 */}
          <div className="p-6 border-b border-gray-700">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left side - User Input */}
              <div className="lg:col-span-1 space-y-6">
                <div className="glass-effect rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">Data Akun</h3>
                  <div className="space-y-4">
                    <Input
                      label="User ID"
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Masukkan User ID"
                      helperText="ID pengguna akun game Anda"
                    />
                    <Input
                      label="Server ID"
                      type="text"
                      value={serverId}
                      onChange={(e) => setServerId(e.target.value)}
                      placeholder="Masukkan Server ID"
                      helperText="ID server tempat Anda bermain"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="glass-effect rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">Metode Pembayaran</h3>
                  <div className="space-y-3">
                    {['E-Wallet', 'Bank Transfer', 'Minimarket', 'Pulsa'].map((method) => (
                      <motion.label
                        key={method}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-dark-light/50 
                                 hover:bg-dark-light cursor-pointer transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <input type="radio" name="payment" className="text-primary" />
                        <span className="text-white">{method}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Game Detail Info */}
              <div className="lg:col-span-2">
                <div className="glass-effect rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">Informasi Game</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Developer:</span>
                      <p className="text-white font-medium">Game Studio</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Rating:</span>
                      <p className="text-white font-medium flex items-center">
                        <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                        4.8/5
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Proses:</span>
                      <p className="text-white font-medium flex items-center">
                        <Clock size={16} className="text-green-400 mr-1" />
                        Instant
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Keamanan:</span>
                      <p className="text-white font-medium flex items-center">
                        <Shield size={16} className="text-green-400 mr-1" />
                        100% Aman
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Packages Section - No 13 */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <ShoppingCart className="w-6 h-6 text-primary mr-2" />
              Pilih Nominal Top Up
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {topupPackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedPackage === pkg.id
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'border-gray-700 bg-dark-light hover:border-gray-600 hover:bg-gray-800/50'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 left-4 px-3 py-1 bg-gradient-to-r 
                                  from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black">
                      POPULER
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">{pkg.amount}</h4>
                      <p className="text-2xl font-bold text-primary">{pkg.price}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 transition-colors ${
                      selectedPackage === pkg.id
                        ? 'border-primary bg-primary'
                        : 'border-gray-500'
                    }`}>
                      {selectedPackage === pkg.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-full h-full rounded-full bg-white/20"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Purchase Section - No 14 */}
          <div className="p-6 border-t border-gray-700 bg-dark-light/30">
            {/* Order Summary */}
            {selectedPackage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect rounded-xl p-6 mb-6"
              >
                <h3 className="text-lg font-semibold mb-4 text-white">Ringkasan Pesanan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Game:</span>
                    <span className="text-white font-medium">{game.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Item:</span>
                    <span className="text-white font-medium">
                      {topupPackages.find(p => p.id === selectedPackage)?.amount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User ID:</span>
                    <span className="text-white font-medium">{userId || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Server:</span>
                    <span className="text-white font-medium">{serverId || '-'}</span>
                  </div>
                  <div className="border-t border-gray-600 pt-3 flex justify-between text-lg">
                    <span className="text-white font-semibold">Total:</span>
                    <span className="text-primary font-bold">
                      {topupPackages.find(p => p.id === selectedPackage)?.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Purchase Button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={handlePurchase}
                disabled={!selectedPackage || !userId || !serverId}
                size="lg"
                glow
                icon={<ShoppingCart size={20} />}
                className="px-8 py-4"
              >
                Beli Sekarang
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 grid grid-cols-3 gap-4 text-center"
            >
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 text-green-400 mb-2" />
                <span className="text-sm text-gray-400">100% Aman</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-sm text-gray-400">Proses Instan</span>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-8 h-8 text-yellow-400 mb-2" fill="currentColor" />
                <span className="text-sm text-gray-400">Rating 4.8</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Purchase Confirmation Modal */}
      <PurchaseConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmPurchase}
        game={game.name}
        package={topupPackages.find(p => p.id === selectedPackage)?.amount || ''}
        price={topupPackages.find(p => p.id === selectedPackage)?.price || ''}
        loading={isProcessing}
      />
    </motion.div>
  )
}