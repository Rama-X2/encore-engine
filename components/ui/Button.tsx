'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  glow?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  glow = false,
  className = '',
  disabled,
  ...props
}, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl'
      case 'secondary':
        return 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-500 hover:to-gray-600'
      case 'outline':
        return 'border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent'
      case 'ghost':
        return 'bg-transparent text-gray-300 hover:bg-white/10 hover:text-white'
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
      default:
        return 'bg-gradient-to-r from-primary to-secondary text-white'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm'
      case 'md':
        return 'px-4 py-2.5 text-sm'
      case 'lg':
        return 'px-6 py-3 text-base'
      case 'xl':
        return 'px-8 py-4 text-lg'
      default:
        return 'px-4 py-2.5 text-sm'
    }
  }

  const getGlowStyles = () => {
    if (!glow) return ''
    
    switch (variant) {
      case 'primary':
        return 'shadow-glow hover:shadow-glow-lg'
      case 'danger':
        return 'shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]'
      case 'success':
        return 'shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]'
      default:
        return 'shadow-glow hover:shadow-glow-lg'
    }
  }

  const isDisabled = disabled || loading

  return (
    <motion.button
      ref={ref}
      className={`
        relative font-medium rounded-lg transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-primary/20
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center space-x-2
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${getGlowStyles()}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <div className={`flex items-center space-x-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </div>
      
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white/20 opacity-0"
        whileTap={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
})

Button.displayName = 'Button'

// Icon button variant
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon: React.ReactNode
  tooltip?: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  variant = 'ghost',
  size = 'md',
  loading = false,
  icon,
  tooltip,
  className = '',
  disabled,
  ...props
}, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90'
      case 'secondary':
        return 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
      case 'ghost':
        return 'bg-transparent text-gray-400 hover:bg-white/10 hover:text-white'
      case 'danger':
        return 'bg-red-500 text-white hover:bg-red-600'
      default:
        return 'bg-transparent text-gray-400 hover:bg-white/10 hover:text-white'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 p-1.5'
      case 'md':
        return 'w-10 h-10 p-2'
      case 'lg':
        return 'w-12 h-12 p-2.5'
      default:
        return 'w-10 h-10 p-2'
    }
  }

  const isDisabled = disabled || loading

  return (
    <motion.button
      ref={ref}
      className={`
        relative rounded-lg transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-primary/20
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
      `}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.1 } : {}}
      whileTap={!isDisabled ? { scale: 0.9 } : {}}
      title={tooltip}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}
    </motion.button>
  )
})

IconButton.displayName = 'IconButton'

// Floating Action Button
interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  size?: 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

export const FloatingActionButton = forwardRef<HTMLButtonElement, FABProps>(({
  icon,
  position = 'bottom-right',
  size = 'md',
  variant = 'primary',
  className = '',
  ...props
}, ref) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-right':
        return 'fixed bottom-6 right-6'
      case 'bottom-left':
        return 'fixed bottom-6 left-6'
      case 'top-right':
        return 'fixed top-6 right-6'
      case 'top-left':
        return 'fixed top-6 left-6'
      default:
        return 'fixed bottom-6 right-6'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'md':
        return 'w-14 h-14'
      case 'lg':
        return 'w-16 h-16'
      default:
        return 'w-14 h-14'
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
      case 'secondary':
        return 'bg-gray-700 text-white shadow-lg'
      default:
        return 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
    }
  }

  return (
    <motion.button
      ref={ref}
      className={`
        z-50 rounded-full transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-primary/20
        flex items-center justify-center
        ${getPositionStyles()}
        ${getSizeStyles()}
        ${getVariantStyles()}
        ${className}
      `}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {icon}
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20 opacity-0"
        whileTap={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  )
})

FloatingActionButton.displayName = 'FloatingActionButton'

export default Button
