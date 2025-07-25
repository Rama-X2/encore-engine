'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Transaction {
  id: string
  game: string
  amount: string
  price: string
  status: 'pending' | 'success' | 'failed'
  date: string
  paymentMethod: string
}

const mockTransactions: Transaction[] = [
  {
    id: 'TRX001234567',
    game: 'Mobile Legends',
    amount: '257 Diamonds',
    price: 'Rp 60.000',
    status: 'success',
    date: '24 Jul 2025, 14:30',
    paymentMethod: 'E-Wallet'
  },
  {
    id: 'TRX001234566',
    game: 'Free Fire',
    amount: '100 Diamonds',
    price: 'Rp 25.000',
    status: 'pending',
    date: '24 Jul 2025, 13:15',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'TRX001234565',
    game: 'Genshin Impact',
    amount: '60 Genesis Crystal',
    price: 'Rp 16.000',
    status: 'failed',
    date: '23 Jul 2025, 20:45',
    paymentMethod: 'Pulsa'
  }
]

export default function CheckTransaction() {
  const [invoiceId, setInvoiceId] = useState('')
  const [searchResult, setSearchResult] = useState<Transaction | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const handleSearch = async () => {
    if (!invoiceId.trim()) return
    
    setIsSearching(true)
    
    // Simulate API call
    setTimeout(() => {
      const found = mockTransactions.find(tx => tx.id === invoiceId.toUpperCase())
      setSearchResult(found || null)
      setIsSearching(false)
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Berhasil'
      case 'pending':
        return 'Diproses'
      case 'failed':
        return 'Gagal'
      default:
        return 'Unknown'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400 bg-green-400/10'
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'failed':
        return 'text-red-400 bg-red-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <motion.h2 
          className="text-3xl font-bold glow-text mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Cek Status Transaksi
        </motion.h2>
        <motion.p 
          className="text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Masukkan nomor invoice untuk melihat status transaksi Anda
        </motion.p>
      </div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="glass-effect rounded-2xl p-8"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Nomor Invoice
            </label>
            <input
              type="text"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              placeholder="Contoh: TRX001234567"
              className="w-full px-4 py-3 bg-dark-light rounded-lg border border-gray-600 
                       text-white placeholder-gray-400 focus:border-primary 
                       focus:ring-2 focus:ring-primary/20 transition-all
                       uppercase"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex items-end">
            <motion.button
              onClick={handleSearch}
              disabled={!invoiceId.trim() || isSearching}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg 
                       font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              whileHover={{ scale: invoiceId.trim() && !isSearching ? 1.02 : 1 }}
              whileTap={{ scale: invoiceId.trim() && !isSearching ? 0.98 : 1 }}
            >
              {isSearching ? (
                <div className="loading-spinner"></div>
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span>{isSearching ? 'Mencari...' : 'Cari'}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Search Result */}
      {searchResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Detail Transaksi</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(searchResult.status)}`}>
              {getStatusIcon(searchResult.status)}
              <span>{getStatusText(searchResult.status)}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Invoice ID</label>
                <p className="font-mono text-white">{searchResult.id}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Game</label>
                <p className="text-white">{searchResult.game}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Item</label>
                <p className="text-white">{searchResult.amount}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Total Harga</label>
                <p className="text-xl font-bold text-primary">{searchResult.price}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tanggal</label>
                <p className="text-white">{searchResult.date}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Metode Pembayaran</label>
                <p className="text-white">{searchResult.paymentMethod}</p>
              </div>
            </div>
          </div>
          
          {searchResult.status === 'pending' && (
            <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
              <p className="text-yellow-400 text-sm">
                ⏱️ Transaksi sedang diproses. Mohon tunggu beberapa menit atau hubungi customer service jika sudah lebih dari 15 menit.
              </p>
            </div>
          )}
          
          {searchResult.status === 'failed' && (
            <div className="mt-6 p-4 bg-red-400/10 border border-red-400/30 rounded-lg">
              <p className="text-red-400 text-sm">
                ❌ Transaksi gagal. Silakan hubungi customer service atau coba lagi dengan metode pembayaran lain.
              </p>
            </div>
          )}
          
          {searchResult.status === 'success' && (
            <div className="mt-6 p-4 bg-green-400/10 border border-green-400/30 rounded-lg">
              <p className="text-green-400 text-sm">
                ✅ Transaksi berhasil! Item telah dikirim ke akun game Anda.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* No Result */}
      {invoiceId && !isSearching && !searchResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-2xl p-8 text-center"
        >
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Transaksi Tidak Ditemukan</h3>
          <p className="text-gray-400 mb-6">
            Invoice dengan nomor <span className="font-mono text-white">{invoiceId}</span> tidak ditemukan.
            Pastikan nomor invoice sudah benar.
          </p>
          <motion.button
            onClick={() => setShowHistory(!showHistory)}
            className="text-primary hover:text-secondary transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Lihat Riwayat Transaksi
          </motion.button>
        </motion.div>
      )}

      {/* Transaction History */}
      {showHistory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Riwayat Transaksi Terbaru</h3>
          <div className="space-y-4">
            {mockTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-dark-light rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                onClick={() => setSearchResult(transaction)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-mono text-sm text-gray-400">{transaction.id}</span>
                      <div className={`px-2 py-1 rounded text-xs font-medium flex items-center space-x-1 ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        <span>{getStatusText(transaction.status)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-white">{transaction.game}</span>
                      <span className="text-gray-400">{transaction.amount}</span>
                      <span className="text-primary font-bold">{transaction.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{transaction.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
