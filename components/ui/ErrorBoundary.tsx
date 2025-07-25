'use client'

import { Component, ReactNode, ErrorInfo } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: ReactNode
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  handleGoHome = () => {
    this.setState({ hasError: false, error: undefined })
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-md w-full bg-dark-light/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 text-center"
          >
            {/* Error Icon */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ 
                duration: 0.6, 
                repeat: 2,
                delay: 0.5 
              }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/20">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            {/* Error Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-bold text-white mb-4"
            >
              Oops! Terjadi Kesalahan
            </motion.h1>

            {/* Error Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-400 mb-8 leading-relaxed"
            >
              Maaf, terjadi kesalahan yang tidak terduga. Tim kami sudah mendapat laporan dan sedang menangani masalah ini.
            </motion.p>

            {/* Error Details (in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left"
              >
                <p className="text-red-400 text-sm font-mono break-all">
                  {this.state.error.message}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-4"
            >
              {/* Retry Button */}
              <motion.button
                onClick={this.handleRetry}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-white shadow-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className="w-5 h-5" />
                <span>Coba Lagi</span>
              </motion.button>

              {/* Home Button */}
              <motion.button
                onClick={this.handleGoHome}
                className="w-full px-6 py-3 bg-dark border border-gray-600 rounded-xl font-semibold text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="w-5 h-5" />
                <span>Kembali ke Beranda</span>
              </motion.button>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 pt-6 border-t border-gray-700"
            >
              <p className="text-sm text-gray-500">
                Masih mengalami masalah? 
                <a 
                  href="mailto:support@topupgame.com" 
                  className="text-primary hover:text-secondary transition-colors ml-1"
                >
                  Hubungi Support
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}
