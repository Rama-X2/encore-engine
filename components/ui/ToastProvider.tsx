'use client'

import React, { createContext, useContext, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Toast from './Toast'

interface ToastData {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

interface ToastContextType {
  showSuccess: (title: string, message: string) => void
  showError: (title: string, message: string) => void
  showInfo: (title: string, message: string) => void
  showWarning: (title: string, message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToastContext() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = (title: string, message: string, type: ToastData['type']) => {
    const id = Date.now().toString()
    const newToast: ToastData = { id, title, message, type }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const showSuccess = (title: string, message: string) => addToast(title, message, 'success')
  const showError = (title: string, message: string) => addToast(title, message, 'error')
  const showInfo = (title: string, message: string) => addToast(title, message, 'info')
  const showWarning = (title: string, message: string) => addToast(title, message, 'warning')

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, showWarning }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-4">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              title={toast.title}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
