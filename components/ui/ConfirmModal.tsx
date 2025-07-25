'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'success' | 'info'
  loading?: boolean
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  type = 'info',
  loading = false
}: ConfirmModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="w-16 h-16 text-red-400" />
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-400" />
      case 'info':
        return <Info className="w-16 h-16 text-blue-400" />
    }
  }

  const getConfirmButtonStyle = () => {
    switch (type) {
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
      case 'info':
        return 'bg-gradient-to-r from-primary to-secondary'
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
                 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="glass-effect rounded-2xl p-8 max-w-md w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {getIcon()}
            </motion.div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-semibold text-white mb-3"
            >
              {title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 leading-relaxed"
            >
              {message}
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex space-x-3"
          >
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 
                       text-white rounded-lg font-medium transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 px-4 py-3 text-white rounded-lg font-medium 
                        transition-all duration-300 shadow-lg hover:shadow-xl
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${getConfirmButtonStyle()}`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Memproses...</span>
                </div>
              ) : (
                confirmText
              )}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Pre-configured modals
export function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName,
  loading 
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName: string
  loading?: boolean
}) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      type="danger"
      title="Hapus Item"
      message={`Apakah Anda yakin ingin menghapus "${itemName}"? Tindakan ini tidak dapat dibatalkan.`}
      confirmText="Hapus"
      loading={loading}
    />
  )
}

export function PurchaseConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  game,
  package: pkg,
  price,
  loading
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  game: string
  package: string
  price: string
  loading?: boolean
}) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      type="success"
      title="Konfirmasi Pembelian"
      message={`Anda akan membeli ${pkg} untuk ${game} dengan harga ${price}. Lanjutkan ke pembayaran?`}
      confirmText="Beli Sekarang"
      loading={loading}
    />
  )
}