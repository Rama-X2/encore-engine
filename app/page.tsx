'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import GameGrid from '../components/GameGrid'
import GameDetail from '../components/GameDetail'
import SplashAnimation from '../components/SplashAnimation'
import FeaturedGames from '../components/FeaturedGames'
import Statistics from '../components/Statistics'
import CheckTransaction from '../components/pages/CheckTransaction'
import Leaderboard from '../components/pages/Leaderboard'
import Credit from '../components/pages/Credit'
import { Game } from '../types/game'

// Data game dengan kategori lengkap sesuai requirement
const gameData: Game[] = [
  // New Release Games (8 games)
  { 
    id: 1, 
    name: 'Mobile Legends', 
    icon: '/images/games/ml-icon.jpg', 
    banner: '/images/games/ml-icon.jpg',
    category: 'new-release',
    description: 'Top up Diamond Mobile Legends dengan harga terbaik!',
    isPopular: true
  },
  { 
    id: 2, 
    name: 'Genshin Impact', 
    icon: '/images/games/genshin-icon.jpg', 
    banner: '/images/games/genshin-icon.jpg',
    category: 'new-release',
    description: 'Beli Genesis Crystal Genshin Impact!',
    isPopular: true
  },
  { 
    id: 3, 
    name: 'Honkai Star Rail', 
    icon: '/images/games/hsr-icon.jpg', 
    banner: '/images/games/hsr-icon.jpg',
    category: 'new-release',
    description: 'Top up Oneiric Shard Honkai Star Rail!',
    isPopular: true
  },
  { 
    id: 4, 
    name: 'Tower of Fantasy', 
    icon: '/images/games/tof-icon.jpg', 
    banner: '/images/games/tof-icon.jpg',
    category: 'new-release',
    description: 'Beli Tanium Tower of Fantasy!',
    isPopular: false
  },
  { 
    id: 5, 
    name: 'Wuthering Waves', 
    icon: '/images/games/ww-icon.jpg', 
    banner: '/images/games/ww-icon.jpg',
    category: 'new-release',
    description: 'Top up Lunite Wuthering Waves!',
    isPopular: true
  },
  { 
    id: 6, 
    name: 'Zenless Zone Zero', 
    icon: '/images/games/zzz-icon.jpg', 
    banner: '/images/games/zzz-icon.jpg',
    category: 'new-release',
    description: 'Beli Polychrome Zenless Zone Zero!',
    isPopular: true
  },
  { 
    id: 7, 
    name: 'Girls Connect Idle', 
    icon: '/images/games/girls_connect_tile.png', 
    banner: '/images/games/girls_connect_tile.png',
    category: 'new-release',
    description: 'Top up Girls Connect Idle Game Currency!',
    isPopular: false
  },
  { 
    id: 8, 
    name: 'Honkai Impact', 
    icon: '/images/games/honkai_new_tile.png', 
    banner: '/images/games/honkai_new_tile.png',
    category: 'new-release',
    description: 'Top up B-Chips Honkai Impact!',
    isPopular: false
  },
  
  // Tambahan untuk New Release (lebih dari 8 untuk load more)
  { 
    id: 9, 
    name: 'Valorant', 
    icon: '/images/games/valorant-icon.jpg', 
    banner: '/images/games/valorant-icon.jpg',
    category: 'new-release',
    description: 'Top up VP Valorant Points!',
    isPopular: false
  },
  { 
    id: 10, 
    name: 'League of Legends', 
    icon: '/images/games/lol-icon.jpg', 
    banner: '/images/games/lol-icon.jpg',
    category: 'new-release',
    description: 'Beli RP League of Legends!',
    isPopular: false
  },
  { 
    id: 11, 
    name: 'Wild Rift', 
    icon: '/images/games/wr-icon.jpg', 
    banner: '/images/games/wr-icon.jpg',
    category: 'new-release',
    description: 'Top up Wild Cores Wild Rift!',
    isPopular: false
  },
  { 
    id: 12, 
    name: 'Free Fire', 
    icon: '/images/games/ff-icon.jpg', 
    banner: '/images/games/ff-icon.jpg',
    category: 'new-release',
    description: 'Beli Diamond Free Fire murah!',
    isPopular: false
  },
  
  // Direct Topup Games (16+ games for load more functionality)
  { 
    id: 20, 
    name: 'Free Fire', 
    icon: '/images/games/ff-icon.jpg', 
    banner: '/images/games/ff-icon.jpg',
    category: 'direct-topup',
    description: 'Beli Diamond Free Fire murah dan cepat!',
    isPopular: true
  },
  { 
    id: 21, 
    name: 'PUBG Mobile', 
    icon: '/images/games/pubg-icon.jpg', 
    banner: '/images/games/pubg-icon.jpg',
    category: 'direct-topup',
    description: 'Top up UC PUBG Mobile dengan mudah!',
    isPopular: true
  },
  { 
    id: 22, 
    name: 'Call of Duty Mobile', 
    icon: '/images/games/cod-icon.jpg', 
    banner: '/images/games/cod-icon.jpg',
    category: 'direct-topup',
    description: 'Beli CP Call of Duty Mobile murah!',
    isPopular: true
  },
  { 
    id: 23, 
    name: 'Clash Royale', 
    icon: '/images/games/cr-icon.jpg', 
    banner: '/images/games/cr-icon.jpg',
    category: 'direct-topup',
    description: 'Beli Gems Clash Royale!',
    isPopular: false
  },
  { 
    id: 24, 
    name: 'Clash of Clans', 
    icon: '/images/games/coc-icon.jpg', 
    banner: '/images/games/coc-icon.jpg',
    category: 'direct-topup',
    description: 'Top up Gems Clash of Clans!',
    isPopular: true
  },
  { 
    id: 25, 
    name: 'Mobile Legends', 
    icon: '/images/games/ml-icon.jpg', 
    banner: '/images/games/ml-icon.jpg',
    category: 'direct-topup',
    description: 'Top up Diamond Mobile Legends instant!',
    isPopular: true
  },
  { 
    id: 26, 
    name: 'Arena of Valor', 
    icon: '/images/games/aov-icon.jpg', 
    banner: '/images/games/aov-icon.jpg',
    category: 'direct-topup',
    description: 'Top up Voucher Arena of Valor!',
    isPopular: false
  },
  { 
    id: 27, 
    name: 'Genshin Impact', 
    icon: '/images/games/genshin-icon.jpg', 
    banner: '/images/games/genshin-icon.jpg',
    category: 'direct-topup',
    description: 'Beli Genesis Crystal instant!',
    isPopular: true
  },
  // Tambahan Direct Topup untuk load more
  { 
    id: 28, 
    name: 'Lords Mobile', 
    icon: '/images/games/lm-icon.jpg', 
    banner: '/images/games/lm-icon.jpg',
    category: 'direct-topup',
    description: 'Beli Gems Lords Mobile!',
    isPopular: false
  },
  { 
    id: 29, 
    name: 'Rise of Kingdoms', 
    icon: '/images/games/rok-icon.jpg', 
    banner: '/images/games/rok-icon.jpg',
    category: 'direct-topup',
    description: 'Top up Gems Rise of Kingdoms!',
    isPopular: false
  },
  { 
    id: 30, 
    name: 'State of Survival', 
    icon: '/images/games/sos-icon.jpg', 
    banner: '/images/games/sos-icon.jpg',
    category: 'direct-topup',
    description: 'Beli Biocaps State of Survival!',
    isPopular: false
  },
  { 
    id: 31, 
    name: 'Honkai Star Rail', 
    icon: '/images/games/hsr-icon.jpg', 
    banner: '/images/games/hsr-icon.jpg',
    category: 'direct-topup',
    description: 'Top up Oneiric Shard direct!',
    isPopular: false
  },
  
  // Via Login Games (16+ games untuk load more)
  { 
    id: 40, 
    name: 'Arena of Valor', 
    icon: '/images/games/aov-icon.jpg', 
    banner: '/images/games/aov-icon.jpg',
    category: 'via-login',
    description: 'Top up Voucher Arena of Valor dengan login!',
    isPopular: true
  },
  { 
    id: 41, 
    name: 'Lords Mobile', 
    icon: '/images/games/lm-icon.jpg', 
    banner: '/images/games/lm-icon.jpg',
    category: 'via-login',
    description: 'Beli Gems Lords Mobile via login!',
    isPopular: false
  },
  { 
    id: 42, 
    name: 'Rise of Kingdoms', 
    icon: '/images/games/rok-icon.jpg', 
    banner: '/images/games/rok-icon.jpg',
    category: 'via-login',
    description: 'Top up Gems Rise of Kingdoms!',
    isPopular: true
  },
  { 
    id: 43, 
    name: 'State of Survival', 
    icon: '/images/games/sos-icon.jpg', 
    banner: '/images/games/sos-icon.jpg',
    category: 'via-login',
    description: 'Beli Biocaps State of Survival!',
    isPopular: false
  },
  { 
    id: 44, 
    name: 'Mobile Legends', 
    icon: '/images/games/ml-icon.jpg', 
    banner: '/images/games/ml-icon.jpg',
    category: 'via-login',
    description: 'Top up Diamond ML via Moonton account!',
    isPopular: true
  },
  { 
    id: 45, 
    name: 'Free Fire', 
    icon: '/images/games/ff-icon.jpg', 
    banner: '/images/games/ff-icon.jpg',
    category: 'via-login',
    description: 'Beli Diamond FF via Facebook/Google login!',
    isPopular: true
  },
  { 
    id: 46, 
    name: 'PUBG Mobile', 
    icon: '/images/games/pubg-icon.jpg', 
    banner: '/images/games/pubg-icon.jpg',
    category: 'via-login',
    description: 'Top up UC PUBG via login account!',
    isPopular: false
  },
  { 
    id: 47, 
    name: 'Genshin Impact', 
    icon: '/images/games/genshin-icon.jpg', 
    banner: '/images/games/genshin-icon.jpg',
    category: 'via-login',
    description: 'Beli Genesis Crystal via HoYoverse login!',
    isPopular: true
  },
  // Tambahan Via Login untuk load more
  { 
    id: 48, 
    name: 'Honkai Star Rail', 
    icon: '/images/games/hsr-icon.jpg', 
    banner: '/images/games/hsr-icon.jpg',
    category: 'via-login',
    description: 'Top up Oneiric Shard via HoYoverse!',
    isPopular: false
  },
  { 
    id: 49, 
    name: 'Clash of Clans', 
    icon: '/images/games/coc-icon.jpg', 
    banner: '/images/games/coc-icon.jpg',
    category: 'via-login',
    description: 'Beli Gems CoC via Supercell ID!',
    isPopular: false
  },
  { 
    id: 50, 
    name: 'Clash Royale', 
    icon: '/images/games/cr-icon.jpg', 
    banner: '/images/games/cr-icon.jpg',
    category: 'via-login',
    description: 'Top up Gems CR via Supercell ID!',
    isPopular: false
  },
  { 
    id: 51, 
    name: 'Call of Duty Mobile', 
    icon: '/images/games/cod-icon.jpg', 
    banner: '/images/games/cod-icon.jpg',
    category: 'via-login',
    description: 'Beli CP COD via Activision account!',
    isPopular: false
  },
  
  // Entertainment Games
  { 
    id: 60, 
    name: 'Netflix', 
    icon: '/images/games/netflix-icon.jpg', 
    banner: '/images/games/netflix-icon.jpg',
    category: 'entertainment',
    description: 'Langganan Netflix Premium!',
    isPopular: true
  },
  { 
    id: 61, 
    name: 'Spotify', 
    icon: '/images/games/spotify-icon.jpg', 
    banner: '/images/games/spotify-icon.jpg',
    category: 'entertainment',
    description: 'Upgrade Spotify Premium!',
    isPopular: true
  },
  { 
    id: 62, 
    name: 'YouTube Premium', 
    icon: '/images/games/youtube-icon.jpg', 
    banner: '/images/games/youtube-icon.jpg',
    category: 'entertainment',
    description: 'Berlangganan YouTube Premium!',
    isPopular: true
  },
  { 
    id: 63, 
    name: 'Disney+ Hotstar', 
    icon: '/images/games/disney-icon.jpg', 
    banner: '/images/games/disney-icon.jpg',
    category: 'entertainment',
    description: 'Akses Disney+ Hotstar Premium!',
    isPopular: false
  },
  { 
    id: 64, 
    name: 'Vidio Premier', 
    icon: '/images/games/vidio-icon.jpg', 
    banner: '/images/games/vidio-icon.jpg',
    category: 'entertainment',
    description: 'Berlangganan Vidio Premier!',
    isPopular: false
  },
  { 
        id: 65, 
    name: 'Viu Premium', 
    icon: '/images/games/viu-icon.jpg', 
    banner: '/images/games/viu-icon.jpg',
    category: 'entertainment',
    description: 'Upgrade ke Viu Premium untuk drama Korea!',
    isPopular: false
  },
  { 
    id: 66, 
    name: 'Amazon Prime Video', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'entertainment',
    description: 'Berlangganan Amazon Prime Video!',
    isPopular: false
  },
  { 
    id: 67, 
    name: 'Apple Music', 
    icon: '/images/games/itunes-icon.jpg', 
    banner: '/images/games/itunes-icon.jpg',
    category: 'entertainment',
    description: 'Upgrade Apple Music unlimited streaming!',
    isPopular: false
  },
  // Tambahan Entertainment untuk load more
  { 
    id: 68, 
    name: 'iQiyi Premium', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'entertainment',
    description: 'Berlangganan iQiyi VIP untuk drama Asia!',
    isPopular: false
  },
  { 
    id: 69, 
    name: 'WeTV Premium', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'entertainment',
    description: 'Upgrade WeTV VIP unlimited!',
    isPopular: false
  },
  { 
    id: 70, 
    name: 'JOOX VIP', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'entertainment',
    description: 'Berlangganan JOOX VIP music streaming!',
    isPopular: false
  },
  { 
    id: 71, 
    name: 'Canva Pro', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'entertainment',
    description: 'Upgrade Canva Pro untuk design unlimited!',
    isPopular: false
  },
  { 
    id: 72, 
    name: 'Zoom Pro', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'entertainment',
    description: 'Berlangganan Zoom Pro meeting unlimited!',
    isPopular: false
  },
  
  // Voucher Games (16+ games untuk load more)
  { 
    id: 80, 
    name: 'Steam Wallet', 
    icon: '/images/games/steam-icon.jpg', 
    banner: '/images/games/steam-icon.jpg',
    category: 'voucher',
    description: 'Top up Steam Wallet untuk beli game PC!',
    isPopular: true
  },
  { 
    id: 81, 
    name: 'Google Play', 
    icon: '/images/games/gplay-icon.jpg', 
    banner: '/images/games/gplay-icon.jpg',
    category: 'voucher',
    description: 'Voucher Google Play untuk app dan game Android!',
    isPopular: true
  },
  { 
    id: 82, 
    name: 'Apple iTunes', 
    icon: '/images/games/itunes-icon.jpg', 
    banner: '/images/games/itunes-icon.jpg',
    category: 'voucher',
    description: 'iTunes Gift Card untuk App Store dan Apple Music!',
    isPopular: true
  },
  { 
    id: 83, 
    name: 'PlayStation', 
    icon: '/images/games/psn-icon.jpg', 
    banner: '/images/games/psn-icon.jpg',
    category: 'voucher',
    description: 'PlayStation Network Card untuk game PS!',
    isPopular: true
  },
  { 
    id: 84, 
    name: 'Xbox Live', 
    icon: '/images/games/xbox-icon.jpg', 
    banner: '/images/games/xbox-icon.jpg',
    category: 'voucher',
    description: 'Xbox Live Gold & Game Pass Ultimate!',
    isPopular: false
  },
  { 
    id: 85, 
    name: 'Nintendo eShop', 
    icon: '/images/games/nintendo-icon.jpg', 
    banner: '/images/games/nintendo-icon.jpg',
    category: 'voucher',
    description: 'Nintendo eShop Card untuk Switch games!',
    isPopular: false
  },
  { 
    id: 86, 
    name: 'Garena Shells', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'voucher',
    description: 'Garena Shells untuk berbagai game Garena!',
    isPopular: true
  },
  { 
    id: 87, 
    name: 'Razer Gold', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'voucher',
    description: 'Razer Gold universal gaming currency!',
    isPopular: false
  },
  // Tambahan Voucher untuk load more
  { 
    id: 88, 
    name: 'Battle.net Balance', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'voucher',
    description: 'Battle.net Balance untuk game Blizzard!',
    isPopular: false
  },
  { 
    id: 89, 
    name: 'Epic Games', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'voucher',
    description: 'Epic Games Store Wallet untuk Fortnite & games!',
    isPopular: false
  },
  { 
    id: 90, 
    name: 'Roblox', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'voucher',
    description: 'Robux Roblox currency untuk avatar & games!',
    isPopular: true
  },
  { 
    id: 91, 
    name: 'Minecraft Minecoins', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'voucher',
    description: 'Minecoins untuk Minecraft Marketplace!',
    isPopular: false
  },
  { 
    id: 92, 
    name: 'V-Bucks Fortnite', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'voucher',
    description: 'V-Bucks untuk skin dan item Fortnite!',
    isPopular: true
  },
  { 
    id: 93, 
    name: 'Riot Points', 
    icon: '/images/games/lol-icon.jpg', 
    banner: '/images/games/lol-icon.jpg',
    category: 'voucher',
    description: 'RP untuk League of Legends dan Valorant!',
    isPopular: false
  },
  { 
    id: 94, 
    name: 'EA Sports FC Points', 
    icon: '/images/games/contoh.jpg', 
    banner: '/images/games/contoh.jpg',
    category: 'voucher',
    description: 'FC Points untuk EA Sports FC Ultimate Team!',
    isPopular: false
  },
  { 
    id: 95, 
    name: 'Call of Duty Points', 
    icon: '/images/games/cod-icon.jpg', 
    banner: '/images/games/cod-icon.jpg',
    category: 'voucher',
    description: 'COD Points untuk Warzone dan Modern Warfare!',
    isPopular: false
  }
]



export default function Home() {
  const [activeTab, setActiveTab] = useState('topup')
  const [activeCategory, setActiveCategory] = useState('new-release')
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [showSplash, setShowSplash] = useState(false)
  const [visibleItems, setVisibleItems] = useState(8)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const handleGameClick = (game: Game) => {
    setSelectedGame(game)
    setShowSplash(true)
  }

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  const loadMore = () => {
    setVisibleItems(prev => prev + 8)
  }

  const filteredGames = gameData.filter(game => {
    const matchesCategory = game.category === activeCategory
    const matchesSearch = !searchQuery || 
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().replace('-', ' ').includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = [
    { id: 'new-release', name: 'New Release' },
    { id: 'direct-topup', name: 'Direct Topup' },
    { id: 'via-login', name: 'Via Login' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'voucher', name: 'Voucher' },
  ]

  return (
    <div className="min-h-screen gradient-bg">
      <AnimatePresence>
        {showSplash && selectedGame && (
          <SplashAnimation 
            game={selectedGame} 
            onComplete={handleSplashComplete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedGame && !showSplash && (
          <GameDetail 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-40 glass-effect"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              className="text-2xl font-bold glow-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              TopUp Game
            </motion.h1>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-6 relative">
              <AnimatePresence>
                {showSearch ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari game favorit..."
                      className="w-full px-4 py-2 pl-10 pr-10 bg-dark-light/80 rounded-full border border-gray-600 
                               text-white placeholder-gray-400 focus:border-primary 
                               focus:ring-2 focus:ring-primary/20 transition-all backdrop-blur-sm"
                      autoFocus
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <button
                      onClick={() => {
                        setShowSearch(false)
                        setSearchQuery('')
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={() => setShowSearch(true)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            
            <nav className="flex space-x-1 bg-dark-light/50 rounded-full p-1 backdrop-blur-sm">
              {[
                { id: 'topup', name: 'Top Up' },
                { id: 'transaction', name: 'Check Transaction' },
                { id: 'leaderboard', name: 'Leaderboard' },
                { id: 'credit', name: 'Credit' },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    if (tab.id === 'topup') setActiveCategory('new-release')
                    setSearchQuery('')
                    setShowSearch(false)
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-glow'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.name}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Top Up Tab */}
        {activeTab === 'topup' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Featured Games - only show on new-release tab */}
            {activeCategory === 'new-release' && (
              <FeaturedGames 
                games={gameData} 
                onGameClick={handleGameClick}
              />
            )}
            
            {/* Category Tabs */}
            <div className="flex space-x-2 mb-8 overflow-x-auto custom-scrollbar">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id)
                    setVisibleItems(8)
                    setSearchQuery('')
                  }}
                  className={`px-6 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                      : 'bg-dark-light text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-dark-light/50 rounded-lg border border-gray-700"
              >
                <p className="text-gray-300">
                  Hasil pencarian untuk: <span className="text-primary font-semibold">"{searchQuery}"</span>
                  {filteredGames.length > 0 ? (
                    <span className="ml-2 text-green-400">({filteredGames.length} game ditemukan)</span>
                  ) : (
                    <span className="ml-2 text-red-400">(Tidak ada hasil)</span>
                  )}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Hapus pencarian
                </button>
              </motion.div>
            )}

            {/* Game Grid */}
            {filteredGames.length > 0 ? (
              <GameGrid 
                games={filteredGames.slice(0, visibleItems)} 
                onGameClick={handleGameClick}
              />
            ) : searchQuery ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Game Tidak Ditemukan</h3>
                <p className="text-gray-400 mb-6">Coba kata kunci lain atau jelajahi kategori game</p>
                <motion.button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg 
                           font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hapus Pencarian
                </motion.button>
              </motion.div>
            ) : (
              <GameGrid 
                games={filteredGames.slice(0, visibleItems)} 
                onGameClick={handleGameClick}
              />
            )}

            {/* Load More Button */}
            {!searchQuery && visibleItems < filteredGames.length && (
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={loadMore}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-full 
                           font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More ({filteredGames.length - visibleItems} tersisa)
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Credit Tab */}
        {activeTab === 'credit' && (
          <Credit />
        )}

        {/* Transaction Tab */}
        {activeTab === 'transaction' && (
          <CheckTransaction />
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <Leaderboard />
        )}
      </main>

      {/* Statistics Section */}
      <Statistics />

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-20 py-12 border-t border-gray-800"
      >
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4 glow-text">TopUp Game</h3>
          <p className="text-gray-400 mb-6">Platform topup game terpercaya dengan harga terbaik!</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-primary transition-colors">Hubungi Kami</a>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}