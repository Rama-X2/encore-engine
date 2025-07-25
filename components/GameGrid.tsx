'use client'

import { motion } from 'framer-motion'
import { Game } from '../types/game'

interface GameGridProps {
  games: Game[]
  onGameClick: (game: Game) => void
}

export default function GameGrid({ games, onGameClick }: GameGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {games.map((game, index) => (
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
            scale: 1.05, 
            y: -10,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          className="game-card group cursor-pointer"
          onClick={() => onGameClick(game)}
        >
          <div className="relative overflow-hidden rounded-t-xl aspect-square">
            {/* Popular Badge */}
            {game.isPopular && (
              <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-gradient-to-r 
                            from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black">
                HOT
              </div>
            )}
            
            {/* Game Icon */}
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 
                          flex items-center justify-center text-4xl font-bold text-white/80
                          group-hover:scale-110 transition-transform duration-300 relative">
              {/* Fallback icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {game.name.charAt(0)}
              </div>
              {/* Actual game icon - will show when image is available */}
              <img 
                src={game.icon} 
                alt={game.name}
                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full 
                            flex items-center justify-center transform scale-75 
                            group-hover:scale-100 transition-transform duration-300">
                <div className="w-0 h-0 border-l-[12px] border-l-white 
                              border-t-[8px] border-t-transparent 
                              border-b-[8px] border-b-transparent ml-1"></div>
              </div>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          -translate-x-full group-hover:translate-x-full transition-transform duration-700 
                          transform skew-x-12"></div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-sm text-center group-hover:text-primary 
                         transition-colors duration-300 line-clamp-2">
              {game.name}
            </h3>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 pointer-events-none
                        shadow-[0_0_30px_rgba(99,102,241,0.3)]"></div>
        </motion.div>
      ))}
    </div>
  )
}