'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Trophy, Medal, Crown, Star, TrendingUp, Award, Users, Target } from 'lucide-react'

interface LeaderboardUser {
  id: string
  username: string
  avatar: string
  totalSpent: number
  rank: number
  transactions: number
  favoriteGame: string
  level: string
  badge: string
  growth: number
}

const leaderboardData: LeaderboardUser[] = [
  {
    id: '1',
    username: 'GamerKing777',
    avatar: '👑',
    totalSpent: 15750000,
    rank: 1,
    transactions: 342,
    favoriteGame: 'Mobile Legends',
    level: 'Diamond',
    badge: 'Top Spender',
    growth: 25.5
  },
  {
    id: '2',
    username: 'ProPlayer88',
    avatar: '🎮',
    totalSpent: 12800000,
    rank: 2,
    transactions: 287,
    favoriteGame: 'Free Fire',
    level: 'Platinum',
    badge: 'Loyal Customer',
    growth: 18.2
  },
  {
    id: '3',
    username: 'EliteGamer',
    avatar: '⚡',
    totalSpent: 11200000,
    rank: 3,
    transactions: 245,
    favoriteGame: 'PUBG Mobile',
    level: 'Platinum',
    badge: 'Rising Star',
    growth: 32.1
  },
  {
    id: '4',
    username: 'MasterGuild',
    avatar: '🔥',
    totalSpent: 9850000,
    rank: 4,
    transactions: 198,
    favoriteGame: 'Genshin Impact',
    level: 'Gold',
    badge: 'Consistent',
    growth: 12.7
  },
  {
    id: '5',
    username: 'GameMaster',
    avatar: '⭐',
    totalSpent: 8600000,
    rank: 5,
    transactions: 176,
    favoriteGame: 'Valorant',
    level: 'Gold',
    badge: 'Achiever',
    growth: 22.4
  },
  {
    id: '6',
    username: 'CyberNinja',
    avatar: '🥷',
    totalSpent: 7420000,
    rank: 6,
    transactions: 154,
    favoriteGame: 'Call of Duty',
    level: 'Silver',
    badge: 'Dedicated',
    growth: 8.9
  },
  {
    id: '7',
    username: 'PixelHunter',
    avatar: '🎯',
    totalSpent: 6890000,
    rank: 7,
    transactions: 142,
    favoriteGame: 'Clash Royale',
    level: 'Silver',
    badge: 'Explorer',
    growth: 15.3
  },
  {
    id: '8',
    username: 'DragonSlayer',
    avatar: '🐉',
    totalSpent: 6120000,
    rank: 8,
    transactions: 128,
    favoriteGame: 'Honkai Star Rail',
    level: 'Silver',
    badge: 'Adventurer',
    growth: 19.8
  },
  {
    id: '9',
    username: 'ShadowPlay',
    avatar: '🌙',
    totalSpent: 5650000,
    rank: 9,
    transactions: 115,
    favoriteGame: 'Arena of Valor',
    level: 'Bronze',
    badge: 'Newcomer',
    growth: 28.6
  },
  {
    id: '10',
    username: 'ThunderStorm',
    avatar: '⚡',
    totalSpent: 5200000,
    rank: 10,
    transactions: 103,
    favoriteGame: 'Wild Rift',
    level: 'Bronze',
    badge: 'Rising',
    growth: 41.2
  }
]

const tabs = [
  { id: 'all-time', name: 'All Time', icon: Trophy },
  { id: 'monthly', name: 'This Month', icon: Medal },
  { id: 'weekly', name: 'This Week', icon: Star },
]

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('all-time')
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-sm font-bold">{rank}</div>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/20 to-yellow-600/20 border-yellow-400/30'
      case 2:
        return 'from-gray-400/20 to-gray-500/20 border-gray-400/30'
      case 3:
        return 'from-amber-500/20 to-amber-600/20 border-amber-500/30'
      default:
        return 'from-primary/10 to-secondary/10 border-gray-600/30'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Diamond':
        return 'text-cyan-400 bg-cyan-400/10'
      case 'Platinum':
        return 'text-purple-400 bg-purple-400/10'
      case 'Gold':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'Silver':
        return 'text-gray-300 bg-gray-400/10'
      case 'Bronze':
        return 'text-amber-600 bg-amber-600/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

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
          className="inline-flex items-center space-x-3 mb-4"
        >
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold glow-text">Top Spenders</h2>
          <Trophy className="w-8 h-8 text-yellow-400" />
        </motion.div>
        <motion.p 
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Kompetisi para pemain top! Lihat siapa yang mendominasi dalam berbagai kategori waktu
        </motion.p>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex justify-center"
      >
        <div className="flex space-x-2 bg-dark-light/50 rounded-full p-2 backdrop-blur-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="order-1 md:order-1"
        >
          <div className={`leaderboard-podium podium-animation rounded-2xl p-6 text-center bg-gradient-to-br ${getRankColor(2)} border particle-bg`}>
            <div className="text-6xl mb-4">{leaderboardData[1].avatar}</div>
            <div className="flex justify-center mb-3">
              {getRankIcon(2)}
            </div>
            <h3 className="font-bold text-lg mb-2">{leaderboardData[1].username}</h3>
            <p className="text-2xl font-bold text-primary mb-2">
              Rp {leaderboardData[1].totalSpent.toLocaleString()}
            </p>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(leaderboardData[1].level)}`}>
              {leaderboardData[1].level}
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Transactions:</span>
                <span className="text-white">{leaderboardData[1].transactions}</span>
              </div>
              <div className="flex justify-between">
                <span>Growth:</span>
                <span className="text-green-400">+{leaderboardData[1].growth}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="order-2 md:order-2 md:scale-110 md:-mt-8"
        >
          <div className={`leaderboard-podium podium-animation rounded-2xl p-8 text-center bg-gradient-to-br ${getRankColor(1)} border relative overflow-hidden particle-bg`}>
            {/* Crown Animation */}
            <div className="absolute top-4 right-4 crown-float">
              <Crown className="w-8 h-8 text-yellow-400" />
            </div>
            
            <div className="text-8xl mb-4">{leaderboardData[0].avatar}</div>
            <div className="flex justify-center mb-4">
              {getRankIcon(1)}
            </div>
            <h3 className="font-bold text-xl mb-3">{leaderboardData[0].username}</h3>
            <p className="text-3xl font-bold text-yellow-400 mb-3">
              Rp {leaderboardData[0].totalSpent.toLocaleString()}
            </p>
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getLevelColor(leaderboardData[0].level)}`}>
              {leaderboardData[0].level} Champion
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Transactions:</span>
                <span className="text-white font-bold">{leaderboardData[0].transactions}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Growth:</span>
                <span className="text-green-400 font-bold">+{leaderboardData[0].growth}%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Badge:</span>
                <span className="text-yellow-400 font-bold">{leaderboardData[0].badge}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="order-3 md:order-3"
        >
          <div className={`leaderboard-podium podium-animation rounded-2xl p-6 text-center bg-gradient-to-br ${getRankColor(3)} border particle-bg`}>
            <div className="text-6xl mb-4">{leaderboardData[2].avatar}</div>
            <div className="flex justify-center mb-3">
              {getRankIcon(3)}
            </div>
            <h3 className="font-bold text-lg mb-2">{leaderboardData[2].username}</h3>
            <p className="text-2xl font-bold text-primary mb-2">
              Rp {leaderboardData[2].totalSpent.toLocaleString()}
            </p>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(leaderboardData[2].level)}`}>
              {leaderboardData[2].level}
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Transactions:</span>
                <span className="text-white">{leaderboardData[2].transactions}</span>
              </div>
              <div className="flex justify-between">
                <span>Growth:</span>
                <span className="text-green-400">+{leaderboardData[2].growth}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="glass-effect rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Users className="w-6 h-6 text-primary" />
            <span>Complete Rankings</span>
          </h3>
          <div className="text-sm text-gray-400">
            Updated every hour
          </div>
        </div>

        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.05 }}
              className={`leaderboard-card p-4 bg-gradient-to-r ${getRankColor(user.rank)} border`}
              onClick={() => setSelectedUser(user)}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className="flex-shrink-0">
                  {getRankIcon(user.rank)}
                </div>

                {/* Avatar */}
                <div className="text-3xl">{user.avatar}</div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-semibold text-lg text-white truncate">{user.username}</h4>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(user.level)}`}>
                      {user.level}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{user.favoriteGame}</span>
                    <span>•</span>
                    <span>{user.transactions} transactions</span>
                    <span>•</span>
                    <span className="text-green-400 flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>+{user.growth}%</span>
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">
                    Rp {user.totalSpent.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">{user.badge}</div>
                </div>
              </div>
              
              {/* Shine effect */}
              <div className="leaderboard-shine"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="glass-effect rounded-xl p-6 text-center">
          <Target className="w-8 h-8 text-primary mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">Rp 125.8M</div>
          <div className="text-sm text-gray-400">Total Volume</div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center">
          <Users className="w-8 h-8 text-secondary mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">2,847</div>
          <div className="text-sm text-gray-400">Active Players</div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center">
          <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">+24.5%</div>
          <div className="text-sm text-gray-400">Growth This Month</div>
        </div>
      </motion.div>

      {/* User Detail Modal */}
      {selectedUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedUser(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-effect rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedUser.avatar}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedUser.username}</h3>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getLevelColor(selectedUser.level)}`}>
                {selectedUser.level} Player
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-dark-light/50 rounded-lg">
                <span className="text-gray-400">Rank</span>
                <span className="text-white font-bold">#{selectedUser.rank}</span>
              </div>
              <div className="flex justify-between p-3 bg-dark-light/50 rounded-lg">
                <span className="text-gray-400">Total Spent</span>
                <span className="text-primary font-bold">Rp {selectedUser.totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between p-3 bg-dark-light/50 rounded-lg">
                <span className="text-gray-400">Transactions</span>
                <span className="text-white font-bold">{selectedUser.transactions}</span>
              </div>
              <div className="flex justify-between p-3 bg-dark-light/50 rounded-lg">
                <span className="text-gray-400">Favorite Game</span>
                <span className="text-white font-bold">{selectedUser.favoriteGame}</span>
              </div>
              <div className="flex justify-between p-3 bg-dark-light/50 rounded-lg">
                <span className="text-gray-400">Growth</span>
                <span className="text-green-400 font-bold">+{selectedUser.growth}%</span>
              </div>
              <div className="flex justify-between p-3 bg-dark-light/50 rounded-lg">
                <span className="text-gray-400">Badge</span>
                <span className="text-yellow-400 font-bold">{selectedUser.badge}</span>
              </div>
            </div>

            <motion.button
              onClick={() => setSelectedUser(null)}
              className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
