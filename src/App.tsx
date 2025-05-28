import { useState, useEffect } from 'react'
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mode-toggle'
import LinkConverter from './components/LinkConverterNew'
import HowToSection from './components/HowToSectionNew'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import { ErrorBoundary } from './components/ErrorBoundary'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  useEffect(() => {
    // Initial loading animation sequence
    const loadingTimer = setTimeout(() => setIsLoaded(true), 300)
    const loadingScreenTimer = setTimeout(() => setShowLoadingScreen(false), 1200)
    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(loadingScreenTimer)
    }
  }, [])

  // Spring variants for smoother animations
  const springTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 15,
    mass: 1
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background text-foreground p-4 md:p-8 animated-gradient-bg theme-transition-target relative overflow-hidden">
          {/* Background Particles */}
          <AnimatedBackground />

          {/* Loading Screen Animation */}
          <AnimatePresence>
            {showLoadingScreen && (
              <motion.div 
                className="fixed inset-0 bg-background z-50 flex items-center justify-center"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <motion.div
                  className="text-4xl font-bold gradient-text flex items-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    G
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    o
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    o
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                  >
                    g
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    l
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                  >
                    e
                  </motion.span>
                  <motion.span className="mx-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    D
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.3 }}
                  >
                    r
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    i
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.55, duration: 0.3 }}
                  >
                    v
                  </motion.span>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    e
                  </motion.span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="container mx-auto max-w-4xl relative z-10">
            <AnimatePresence>
              {isLoaded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.header 
                    className="flex justify-between items-center mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.7, 
                      ...springTransition
                    }}
                  >
                    <motion.h1 
                      className="text-2xl md:text-3xl font-bold gradient-text shine-effect"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      Google Drive Link Converter
                    </motion.h1>
                    <ModeToggle />
                  </motion.header>
                  
                  <main className="staggered-fade-in">
                    <motion.div
                      className="stagger-item" 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.1,
                        ...springTransition
                      }}
                    >
                      <LinkConverter />
                    </motion.div>
                    
                    <motion.div 
                      className="stagger-item"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.3,
                        ...springTransition
                      }}
                    >
                      <HowToSection />
                    </motion.div>
                  </main>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.5,
                      ...springTransition
                    }}
                  >
                    <Footer />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
