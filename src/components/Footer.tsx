import React, { useState } from 'react'
import { Github, Twitter, Linkedin, Heart, Star, Code, Coffee, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 15,
        mass: 1,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  }
  
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: [0, -5, 5, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 0.5,
          ease: 'easeInOut',
          repeatDelay: 0.5
        },
        scale: {
          type: 'spring',
          stiffness: 400,
          damping: 10
        }
      }
    },
    tap: { scale: 0.9, rotate: 0 }
  }

  const easterEggVariants = {
    hidden: { opacity: 0, y: 20, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: { duration: 0.2 }
    }
  }
  
  const toggleEasterEgg = () => {
    setShowEasterEgg(!showEasterEgg)
  }

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Star, label: "Star", href: "#" }
  ]

  const heartBeatAnimation = {
    scale: [1, 1.2, 1, 1.2, 1],
    transition: { 
      repeat: Infinity, 
      repeatDelay: 3, 
      duration: 0.8,
      ease: "easeInOut" 
    }
  }
  
  return (
    <motion.footer 
      className="mt-12 py-6 border-t border-border theme-transition-target relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute -right-16 -top-16 w-32 h-32 bg-primary/5 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: 'mirror'
        }}
      />

      <motion.div 
        className="absolute -left-16 -bottom-16 w-32 h-32 bg-primary/5 rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: 'mirror',
          delay: 1
        }}
      />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <motion.div 
          className="text-sm text-muted-foreground group"
          variants={itemVariants}
          whileHover={{ x: 2 }}
        >
          <span className="flex items-center gap-2">
            <motion.span
              onClick={toggleEasterEgg}
              className="cursor-pointer"
              whileHover={{ color: 'hsl(var(--primary))' }}
            >
              © {currentYear} Google Drive Link Converter
            </motion.span>
            <motion.span
              className="inline-flex"
              animate={heartBeatAnimation}
              onClick={toggleEasterEgg}
              whileTap={{ scale: 1.5 }}
              whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="h-4 w-4 text-red-500 cursor-pointer" />
            </motion.span>
          </span>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-1 md:space-x-3"
          variants={itemVariants}
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.a 
                key={link.label}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent/30 rounded-full relative"
                aria-label={link.label}
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredIcon(link.label)}
                onHoverEnd={() => setHoveredIcon(null)}
                custom={index}
              >
                <Icon className="h-5 w-5" />
                
                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredIcon === link.label && (
                    <motion.span
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border border-border shadow-md px-2 py-1 rounded text-xs whitespace-nowrap z-50"
                      initial={{ opacity: 0, y: 5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {/* Background pulse on hover */}
                <AnimatePresence>
                  {hoveredIcon === link.label && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-primary/10"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
      
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div 
            className="mt-6 mb-2 py-3 px-4 rounded-lg bg-accent/20 border border-accent/30 text-center"
            variants={easterEggVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              <motion.span 
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/50 hover:bg-background/80 hover:scale-105 transition-all"
                variants={{
                  hidden: { y: 10, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <Code className="h-3.5 w-3.5" />
                <span>Built with React + TypeScript</span>
              </motion.span>

              <motion.span 
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/50 hover:bg-background/80 hover:scale-105 transition-all"
                variants={{
                  hidden: { y: 10, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <Coffee className="h-3.5 w-3.5" />
                <span>Styled with TailwindCSS</span>
              </motion.span>

              <motion.span 
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/50 hover:bg-background/80 hover:scale-105 transition-all"
                variants={{
                  hidden: { y: 10, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Animations by Framer Motion</span>
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="mt-4 text-xs text-center text-muted-foreground/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span 
          className="hover:text-primary cursor-default transition-colors inline-block"
          whileHover={{ 
            scale: 1.05, 
            color: 'hsl(var(--primary))', 
            y: -1 
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          Made with modern animation techniques for a delightful user experience
        </motion.span>
      </motion.div>
    </motion.footer>
  )
}

export default Footer