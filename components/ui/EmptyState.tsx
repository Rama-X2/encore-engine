'use client'

import { motion } from 'framer-motion'
import { Search, GameController2, ShoppingBag } from 'lucide-react'

interface EmptyStateProps {
  type?: 'search' | 'games' | 'transactions' | 'general'
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export default function EmptyState({
  type = 'general',
  title,
  message,
  actionLabel,
  onAction,
  icon
}: EmptyStateProps) {
  const getDefaultProps = () => {
    switch (type) {
      case 'search':
        return {
          icon: <Search className="w-16 h-16 text-gray-400" />,
          title: 'Tidak Ada Hasil',
          message: 'Coba kata kunci yang berbeda atau jelajahi kategori lain.',
          actionLabel: 'Reset Pencarian'
        }
      case 'games':
        return {
          icon: <GameController2 className="w-16 h-16 text-gray-400" />,
          title: 'Belum Ada Game',
          message: 'Game akan segera tersedia di kategori ini.',
          actionLabel: 'Lihat Kategori Lain'
        }
      case 'transactions':
        return {
          icon: <ShoppingBag className="w-16 h-16 text-gray-400" />,
          title: 'Belum Ada Transaksi',
          message: 'Mulai berbelanja untuk melihat riwayat transaksi Anda.',
          actionLabel: 'Mulai Belanja'
        }
      default:
        return {
          icon: <div className="text-6xl">📭</div>,
          title: 'Tidak Ada Data',
          message: 'Data belum tersedia saat ini.',
          actionLabel: 'Refresh'
        }
    }
  }

  const defaults = getDefaultProps()
  const finalIcon = icon || defaults.icon
  const finalTitle = title || defaults.title
  const finalMessage = message || defaults.message
  const finalActionLabel = actionLabel || defaults.actionLabel

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-6"
      >
        {finalIcon}
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold text-white mb-3"
      >
        {finalTitle}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 mb-8 max-w-md mx-auto"
      >
        {finalMessage}
      </motion.p>
      
      {onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onAction}
          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg 
                   font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {finalActionLabel}
        </motion.button>
      )}
    </motion.div>
  )
}

export function SearchEmptyState({ query, onReset }: { query: string, onReset: () => void }) {
  return (
    <EmptyState
      type="search"
      title="Game Tidak Ditemukan"
      message={`Tidak ada hasil untuk "${query}". Coba kata kunci lain atau jelajahi kategori game.`}
      actionLabel="Hapus Pencarian"
      onAction={onReset}
    />
  )
}

export function CategoryEmptyState({ category, onChangeCategory }: { 
  category: string, 
  onChangeCategory: () => void 
}) {
  return (
    <EmptyState
      type="games"
      title={`Belum Ada Game di ${category}`}
      message="Game akan segera ditambahkan ke kategori ini. Coba kategori lain sementara waktu."
      actionLabel="Lihat Kategori Lain"
      onAction={onChangeCategory}
    />
  )
}
