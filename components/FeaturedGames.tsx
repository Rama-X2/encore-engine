'use client'

import { motion } from 'framer-motion'
import { Game } from '../types/game'
import { Star, Zap } from 'lucide-react'

interface FeaturedGamesProps {
  games: Game[]
  onGameClick: (game: Game) => void
}

export default function FeaturedGames({ games, onGameClick }: FeaturedGamesProps) {
  // Get only popular games for featured section, prioritize from new-release category
  const featuredGames = games
    .filter(game => game.isPopular)
    .sort((a, b) => {
      // Prioritize new-release games in featured section
      if (a.category === 'new-release' && b.category !== 'new-release') return -1
      if (b.category === 'new-release' && a.category !== 'new-release') return 1
      return 0
    })
    .slice(0, 6)

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full 
                        flex items-center justify-center">
            <Star className="w-6 h-6 text-black" fill="currentColor" />
          </div>
          <div>
            <h2 className="text-2xl font-bold glow-text">Game Populer</h2>
            <p className="text-gray-400 text-sm">Pilihan terfavorit para gamers</p>
          </div>
        </div>
        <motion.div 
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 
                   rounded-full border border-primary/30"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(99, 102, 241, 0.3)',
              '0 0 40px rgba(99, 102, 241, 0.5)',
              '0 0 20px rgba(99, 102, 241, 0.3)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-white">Trending Now</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {featuredGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.6,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.08, 
              y: -8,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="featured-game-card group cursor-pointer relative"
            onClick={() => onGameClick(game)}
          >
            <div className="relative overflow-hidden rounded-xl aspect-square bg-gradient-to-br from-primary/10 to-secondary/10">
              {/* Popular Badge */}
              <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-gradient-to-r 
                            from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-black" fill="currentColor" />
              </div>
              
              {/* Game Icon */}
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white/80
                            group-hover:scale-110 transition-transform duration-300 relative">
                {/* Fallback icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {game.name.charAt(0)}
                </div>
                {/* Actual game icon */}
                <img 
                  src={game.icon} 
                  alt={game.name}
                  className="w-full h-full object-cover opacity-0 transition-opacity duration-300"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.opacity = '1';
                    if (img.parentElement) {
                      const fallback = img.parentElement.querySelector('div');
                      if (fallback) fallback.style.opacity = '0';
                    }
                  }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                  }}
                />
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                            opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-xs text-white/90 line-clamp-2">{game.description}</p>
                </div>
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 
                            group-hover:opacity-100 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full 
                              flex items-center justify-center transform scale-75 
                              group-hover:scale-100 transition-transform duration-300">
                  <div className="w-0 h-0 border-l-[8px] border-l-white 
                                border-t-[6px] border-t-transparent 
                                border-b-[6px] border-b-transparent ml-1"></div>
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-700 
                            transform skew-x-12"></div>
            </div>

            <div className="mt-3 text-center">
              <h3 className="font-semibold text-sm text-white group-hover:text-primary 
                           transition-colors duration-300 line-clamp-2">
                {game.name}
              </h3>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 pointer-events-none
                          shadow-[0_0_30px_rgba(255,193,7,0.4)]"></div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}