import { useState, useEffect, useRef } from 'react'
import { Copy, X, RefreshCw, Check, Link as LinkIcon, AlertCircle, ArrowRight, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Typing effect custom hook
const useTypewriter = (text: string, speed: number = 25) => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const index = useRef(0)
  
  const startTyping = () => {
    setIsTyping(true)
    setDisplayText('')
    index.current = 0
  }
  
  useEffect(() => {
    if (!isTyping) return
    
    if (index.current < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index.current])
        index.current += 1
      }, speed)
      
      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [displayText, isTyping, speed, text])
  
  return { displayText, isTyping, startTyping }
}

const LinkConverterNew = () => {
  const [inputLink, setInputLink] = useState('')
  const [outputLink, setOutputLink] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const [conversionStarted, setConversionStarted] = useState(false)
  const [conversionSuccess, setConversionSuccess] = useState(false)
  const [conversionAnimation, setConversionAnimation] = useState(false)
  
  // Use the typewriter effect for the output link
  const { displayText, isTyping, startTyping } = useTypewriter(outputLink, 15)

  // Function to parse Google Drive link and extract file ID
  const extractFileId = (url: string): string | null => {
    // Remove any whitespace
    url = url.trim()

    // Regular expression patterns to match different Google Drive link formats
    const patterns = [
      // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
      /https:\/\/drive\.google\.com\/file\/d\/([^\/\s]+)(?:\/view)?(?:\?[^\s]*)?$/,
      // Format: https://drive.google.com/open?id=FILE_ID
      /https:\/\/drive\.google\.com\/open\?id=([^\s&]+)/,
      // Format: https://docs.google.com/document/d/FILE_ID/edit
      /https:\/\/docs\.google\.com\/\w+\/d\/([^\/\s]+)(?:\/\w+)?(?:\?[^\s]*)?$/,
      // Format: https://drive.google.com/uc?export=view&id=FILE_ID
      /https:\/\/drive\.google\.com\/uc\?(?:.*&)?id=([^&\s]+)/
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  }

  // Function to handle link conversion
  const convertLink = () => {
    setError('')
    setOutputLink('')
    setCopied(false)
    setConversionStarted(true)
    setConversionSuccess(false)
    setConversionAnimation(true)
    
    if (!inputLink) {
      setError('Please enter a Google Drive link')
      setConversionStarted(false)
      setConversionAnimation(false)
      return
    }

    setIsConverting(true)

    setTimeout(() => {
      try {
        const fileId = extractFileId(inputLink)
        
        if (!fileId) {
          setError('Invalid Google Drive link format. Please check your link and try again.')
          setIsConverting(false)
          setConversionStarted(false)
          setConversionAnimation(false)
          return
        }
        
        const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`
        setOutputLink(directLink)
        startTyping()
        setConversionSuccess(true)
        setTimeout(() => {
          setConversionAnimation(false)
        }, 500)
      } catch (err) {
        setError('An error occurred while processing the link. Please try again.')
        setConversionSuccess(false)
        setConversionAnimation(false)
      } finally {
        setIsConverting(false)
      }
    }, 1800) // Longer processing time for better animation effect
  }

  // Function to copy the output link to clipboard
  const copyToClipboard = () => {
    if (!outputLink) return
    
    navigator.clipboard.writeText(outputLink)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      })
      .catch(() => {
        setError('Failed to copy to clipboard')
      })
  }

  // Function to clear the form
  const clearForm = () => {
    setInputLink('')
    setOutputLink('')
    setError('')
    setCopied(false)
    setConversionStarted(false)
    setConversionSuccess(false)
  }

  // Reset error state when input changes
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [inputLink])

  // Example links for demonstration
  const exampleLinks = [
    'https://drive.google.com/file/d/1EXAMPLE_FILE_ID123456/view?usp=sharing',
    'https://drive.google.com/open?id=1EXAMPLE_FILE_ID789012'
  ]

  const tryExampleLink = (link: string) => {
    setInputLink(link)
    setConversionStarted(false)
    setOutputLink('')
    setCopied(false)
  }

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 1,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  const errorVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  }

  const resultVariants = {
    hidden: { opacity: 0, height: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      height: 'auto', 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  }
  
  // Floating animation for buttons
  const floatingAnimation = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      y: -3,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  }

  return (
    <motion.div 
      className="card-enhanced bg-card rounded-lg shadow-soft hover:shadow-medium p-6 mb-8 transition-all relative overflow-hidden card-with-shine"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Particle effects during conversion */}
      <AnimatePresence>
        {conversionAnimation && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {Array.from({ length: 15 }).map((_, index) => {
              const size = Math.random() * 6 + 2
              const x = Math.random() * 100
              const delay = Math.random() * 0.5
              const duration = Math.random() * 1.5 + 1.5
              
              return (
                <motion.div
                  key={index}
                  className="absolute bg-primary/30 rounded-full"
                  style={{ width: size, height: size, left: `${x}%` }}
                  initial={{ top: '100%', opacity: 0.8 }}
                  animate={{ top: '-5%', opacity: 0 }}
                  transition={{ 
                    duration, 
                    delay,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2
                  }}
                />
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Card glow effect */}
      <div className="absolute inset-0 card-shine-effect"></div>
      
      <motion.div className="mb-6" variants={itemVariants}>
        <motion.label 
          htmlFor="driveLink" 
          className="block text-lg font-medium mb-2"
          whileHover={{ x: 2 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <motion.span 
            className="flex items-center gap-2 text-gradient-animated"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <LinkIcon className="h-5 w-5 text-primary icon-float" />
            Enter Google Drive Shareable Link
          </motion.span>
        </motion.label>
        <div className="relative">
          <motion.input
            id="driveLink"
            type="text"
            value={inputLink}
            onChange={(e) => setInputLink(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="https://drive.google.com/file/d/..." 
            className={`w-full p-3 rounded-lg border transition-all pr-10 input-focus-effect ${inputFocused ? 'input-focused border-primary/50' : 'border-input'}`}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            whileTap={{ scale: 0.995 }}
          />
          <AnimatePresence>
            {inputLink && (
              <motion.button 
                onClick={() => setInputLink('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:bg-accent/30 p-1 rounded-full transition-colors"
                aria-label="Clear input"
                initial={{ scale: 0, opacity: 0, rotate: -90 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 90 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
          
          {/* Focus effect overlay */}
          <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-primary transform origin-left transition-transform duration-300 ${inputFocused ? 'scale-x-100' : 'scale-x-0'}`}></div>
        </div>
      </motion.div>

      <motion.div className="flex flex-wrap gap-2 mb-4" variants={itemVariants}>
        <motion.button
          onClick={convertLink}
          disabled={isConverting || !inputLink}
          className={`px-4 py-2 rounded-lg text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 button-with-shine ${isConverting ? 'bg-primary/80' : 'bg-gradient-primary'}`}
          variants={floatingAnimation}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          {isConverting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.div>
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Converting...
              </motion.span>
            </>
          ) : (
            <>
              {conversionSuccess ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                  <span>Converted</span>
                </>
              ) : (
                <>
                  <span>Convert Link</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </>
              )}
            </>
          )}
        </motion.button>

        <motion.button
          onClick={clearForm}
          className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-soft transition-all"
          variants={floatingAnimation}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          Clear
        </motion.button>
      </motion.div>

      <motion.div className="mb-4" variants={itemVariants}>
        <motion.p 
          className="text-sm text-muted-foreground mb-2 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FileText className="h-3.5 w-3.5" /> Try with examples:
        </motion.p>
        <div className="flex flex-wrap gap-2">
          {exampleLinks.map((link, index) => (
            <motion.button
              key={index}
              onClick={() => tryExampleLink(link)}
              className="text-sm px-3 py-1 rounded-md bg-accent text-accent-foreground hover:bg-accent/80 transition-all truncate max-w-full example-link-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3 + (index * 0.1),
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                y: -4, 
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {link.length > 40 ? `${link.substring(0, 37)}...` : link}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 flex items-start gap-2 error-wiggle"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="error"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            </motion.div>
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {outputLink && (
          <motion.div 
            className="mt-6 result-box"
            variants={resultVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="result"
          >
            <motion.div 
              className="rounded-t-lg p-2 bg-gradient-primary text-white font-medium flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="flex items-center gap-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 15, 0] }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <Check className="h-5 w-5" />
                </motion.div>
                <span>Direct Download Link</span>
              </span>
              <motion.div 
                className="rounded-full h-2 w-2 bg-green-300"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <motion.div 
              className="flex items-center border border-t-0 rounded-b-lg overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.input
                id="outputLink"
                type="text"
                readOnly
                value={isTyping ? displayText : outputLink}
                className="flex-1 p-3 bg-background focus:outline-none transition-all border-r-0"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
              <motion.button
                onClick={copyToClipboard}
                className={`p-3 glow-on-hover ${copied ? 'bg-green-500 text-white' : 'bg-accent hover:bg-accent/80'} transition-all`}
                aria-label="Copy to clipboard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <Check className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Copy className="h-5 w-5" />
                  </motion.div>
                )}
                <span className="sr-only">{copied ? 'Copied!' : 'Copy to clipboard'}</span>
              </motion.button>
            </motion.div>
            <AnimatePresence>
              {copied && (
                <motion.div 
                  className="success-message mt-3 p-2 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center gap-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Copied to clipboard!
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Progress Indicator Animation when converting */}
      <AnimatePresence>
        {isConverting && (
          <motion.div 
            className="mt-4 relative h-2 bg-muted rounded-full overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default LinkConverterNew