'use client'

import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useState, forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  variant?: 'default' | 'filled' | 'outlined'
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  icon,
  variant = 'default',
  className = '',
  type = 'text',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return 'bg-gray-800 border-transparent focus:bg-dark-light'
      case 'outlined':
        return 'bg-transparent border-gray-600 focus:border-primary'
      default:
        return 'bg-dark-light border-gray-600 focus:border-primary'
    }
  }

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className="space-y-2">
      {label && (
        <motion.label
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="block text-sm font-medium text-gray-300"
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <motion.input
          ref={ref}
          type={inputType}
          className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-300
            text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20
            ${getVariantStyles()}
            ${icon ? 'pl-11' : ''}
            ${isPassword ? 'pr-11' : ''}
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}
            ${className}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ scale: 1.02 }}
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        
        {/* Focused border animation */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-primary pointer-events-none"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: isFocused ? 0.3 : 0,
            scale: isFocused ? 1.02 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
      
      {(error || helperText) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs ${error ? 'text-red-400' : 'text-gray-400'}`}
        >
          {error || helperText}
        </motion.div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

// Textarea component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'filled' | 'outlined'
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return 'bg-gray-800 border-transparent focus:bg-dark-light'
      case 'outlined':
        return 'bg-transparent border-gray-600 focus:border-primary'
      default:
        return 'bg-dark-light border-gray-600 focus:border-primary'
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <motion.label
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="block text-sm font-medium text-gray-300"
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <motion.textarea
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-300
            text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20
            resize-none min-h-[100px]
            ${getVariantStyles()}
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}
            ${className}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        
        {/* Focused border animation */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-primary pointer-events-none"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: isFocused ? 0.3 : 0,
            scale: isFocused ? 1.01 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
      
      {(error || helperText) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs ${error ? 'text-red-400' : 'text-gray-400'}`}
        >
          {error || helperText}
        </motion.div>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

// Select component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  helperText,
  options,
  placeholder,
  className = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-2">
      {label && (
        <motion.label
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="block text-sm font-medium text-gray-300"
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <motion.select
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-300
            text-white bg-dark-light border-gray-600 focus:border-primary
            focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}
            ${className}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ scale: 1.02 }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-dark">
              {option.label}
            </option>
          ))}
        </motion.select>
        
        {/* Dropdown arrow */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Focused border animation */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-primary pointer-events-none"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: isFocused ? 0.3 : 0,
            scale: isFocused ? 1.02 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
      
      {(error || helperText) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs ${error ? 'text-red-400' : 'text-gray-400'}`}
        >
          {error || helperText}
        </motion.div>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Input
