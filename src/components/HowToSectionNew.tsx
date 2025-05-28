import React, { useState, useEffect } from 'react'
import { ChevronDown, FileDown, Link2, Info, AlertTriangle, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const HowToSectionNew: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [highlightedStep, setHighlightedStep] = useState<number | null>(null)

  // Auto-expand the first section when component mounts for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setExpandedSection('instructions')
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const isExpanded = (section: string) => expandedSection === section || expandedSection === 'all'

  // Animation variants with enhanced properties
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const expandVariants = {
    hidden: { height: 0, opacity: 0, scale: 0.95 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 20,
        mass: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      height: 0, 
      opacity: 0,
      scale: 0.95,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.3
      }
    }
  }

  const chevronVariants = {
    collapsed: { rotate: 0 },
    expanded: { 
      rotate: 180,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -10, filter: 'blur(2px)' },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.1 + (custom * 0.1),
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    })
  }

  const stepHighlightVariants = {
    normal: { scale: 1, x: 0 },
    highlighted: { 
      scale: 1.03, 
      x: 5,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    }
  }

  // Function to highlight a step
  const highlightStep = (stepIndex: number) => {
    setHighlightedStep(stepIndex)
    setTimeout(() => setHighlightedStep(null), 2000)
  }

  return (
    <motion.div 
      className="card-enhanced bg-card rounded-lg shadow-soft hover:shadow-medium p-6 mb-8 relative overflow-hidden card-with-shine"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}
    >
      {/* Card accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary transform origin-left transition-transform duration-500"></div>
      
      {/* Animated icon */}
      <motion.div 
        className="absolute top-6 right-6 text-primary/20 hidden md:block"
        initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      >
        <HelpCircle className="h-24 w-24" />
      </motion.div>
      
      <motion.h2 
        className="text-xl md:text-2xl font-bold mb-6 gradient-text shine-effect inline-block"
        variants={sectionVariants}
        whileHover={{ scale: 1.01, x: 4 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        How to Use This Converter
      </motion.h2>
      
      <motion.div className="space-y-6">
        <motion.div 
          variants={sectionVariants}
          className="bg-accent/30 p-4 rounded-lg border border-accent/20"
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.h3 
            className="text-lg font-medium mb-2 flex items-center gap-2 text-gradient-animated"
            whileHover={{ x: 2 }}
          >
            <Info className="h-5 w-5 text-primary icon-pulse" />
            What This Tool Does
          </motion.h3>
          <motion.p 
            className="text-muted-foreground pl-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            This tool converts Google Drive shareable links into direct download links. 
            Direct download links allow users to download files directly without navigating through the Google Drive interface.
          </motion.p>
        </motion.div>
        
        <motion.div className="space-y-3" variants={sectionVariants}>
          <motion.button
            className="text-lg font-medium mb-2 flex items-center justify-between w-full text-left hover:text-primary transition-colors p-3 rounded-lg hover:bg-accent/20"
            onClick={() => toggleSection('instructions')}
            whileHover={{ x: 2, backgroundColor: 'hsla(var(--accent), 0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span 
              className="flex items-center gap-2"
              animate={{
                color: isExpanded('instructions') ? 'hsl(var(--primary))' : 'currentColor'
              }}
            >
              <motion.div
                className="text-primary"
                animate={{ 
                  y: isExpanded('instructions') ? [0, -3, 0] : 0
                }}
                transition={{ 
                  repeat: isExpanded('instructions') ? 0 : Infinity, 
                  repeatDelay: 1.5,
                  duration: 0.5 
                }}
              >
                <FileDown className="h-5 w-5" />
              </motion.div>
              Step-by-Step Instructions
            </motion.span>
            <motion.div
              variants={chevronVariants}
              initial="collapsed"
              animate={isExpanded('instructions') ? 'expanded' : 'collapsed'}
              className={`p-1 rounded-full ${isExpanded('instructions') ? 'bg-primary/10' : ''}`}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.button>
          
          <AnimatePresence mode="wait">
            {isExpanded('instructions') && (
              <motion.div 
                className="space-y-4 rounded-lg bg-background/50 p-4 border border-border/50"
                variants={expandVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div 
                  className="pl-5 border-l-2 border-primary/50 hover:border-primary transition-all rounded-r-md overflow-hidden"
                  whileHover={{ x: 2, backgroundColor: 'hsla(var(--accent), 0.1)' }}
                  variants={stepHighlightVariants}
                  animate={highlightedStep === 1 ? 'highlighted' : 'normal'}
                  onClick={() => highlightStep(1)}
                >
                  <h4 className="font-medium flex items-center gap-2">
                    <motion.span 
                      className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      1
                    </motion.span>
                    <span>Get the Shareable Link from Google Drive</span>
                  </h4>
                  <ol className="list-decimal list-inside ml-4 text-muted-foreground mt-2">
                    {[
                      'Open Google Drive and locate your file',
                      'Right-click on the file and select "Get link" or "Share"',
                      'Make sure the file is accessible ("Anyone with the link can view")',
                      'Click "Copy link"'
                    ].map((item, index) => (
                      <motion.li 
                        key={index} 
                        custom={index}
                        variants={listItemVariants}
                        className="mb-1 hover:text-foreground transition-colors flex items-start gap-1 group"
                      >
                        <span className="opacity-50 group-hover:opacity-100">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ol>
                </motion.div>
                
                <motion.div 
                  className="pl-5 border-l-2 border-primary/50 hover:border-primary transition-all rounded-r-md overflow-hidden"
                  whileHover={{ x: 2, backgroundColor: 'hsla(var(--accent), 0.1)' }}
                  variants={stepHighlightVariants}
                  animate={highlightedStep === 2 ? 'highlighted' : 'normal'}
                  onClick={() => highlightStep(2)}
                >
                  <h4 className="font-medium flex items-center gap-2">
                    <motion.span 
                      className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      2
                    </motion.span>
                    <span>Convert the Link</span>
                  </h4>
                  <ol className="list-decimal list-inside ml-4 text-muted-foreground mt-2">
                    {[
                      'Paste the shareable link into the input field above',
                      'Click the "Convert Link" button',
                      'Wait for the direct download link to be generated'
                    ].map((item, index) => (
                      <motion.li 
                        key={index} 
                        custom={index}
                        variants={listItemVariants}
                        className="mb-1 hover:text-foreground transition-colors flex items-start gap-1 group"
                      >
                        <span className="opacity-50 group-hover:opacity-100">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ol>
                </motion.div>
                
                <motion.div 
                  className="pl-5 border-l-2 border-primary/50 hover:border-primary transition-all rounded-r-md overflow-hidden"
                  whileHover={{ x: 2, backgroundColor: 'hsla(var(--accent), 0.1)' }}
                  variants={stepHighlightVariants}
                  animate={highlightedStep === 3 ? 'highlighted' : 'normal'}
                  onClick={() => highlightStep(3)}
                >
                  <h4 className="font-medium flex items-center gap-2">
                    <motion.span 
                      className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      3
                    </motion.span>
                    <span>Use the Direct Download Link</span>
                  </h4>
                  <ol className="list-decimal list-inside ml-4 text-muted-foreground mt-2">
                    {[
                      'Copy the generated direct download link',
                      'Share it with others or use it in your applications',
                      'When someone accesses this link, the file will start downloading automatically'
                    ].map((item, index) => (
                      <motion.li 
                        key={index} 
                        custom={index}
                        variants={listItemVariants}
                        className="mb-1 hover:text-foreground transition-colors flex items-start gap-1 group"
                      >
                        <span className="opacity-50 group-hover:opacity-100">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ol>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <motion.button
            className="text-lg font-medium mb-2 flex items-center justify-between w-full text-left hover:text-primary transition-colors p-3 rounded-lg hover:bg-accent/20"
            onClick={() => toggleSection('formats')}
            whileHover={{ x: 2, backgroundColor: 'hsla(var(--accent), 0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span 
              className="flex items-center gap-2"
              animate={{
                color: isExpanded('formats') ? 'hsl(var(--primary))' : 'currentColor'
              }}
            >
              <motion.div
                className="text-primary"
                animate={{ 
                  rotate: isExpanded('formats') ? [0, 15, -15, 0] : 0
                }}
                transition={{ 
                  repeat: isExpanded('formats') ? 0 : Infinity, 
                  repeatDelay: 2,
                  duration: 0.5 
                }}
              >
                <Link2 className="h-5 w-5" />
              </motion.div>
              Supported Link Formats
            </motion.span>
            <motion.div
              variants={chevronVariants}
              initial="collapsed"
              animate={isExpanded('formats') ? 'expanded' : 'collapsed'}
              className={`p-1 rounded-full ${isExpanded('formats') ? 'bg-primary/10' : ''}`}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.button>
          
          <AnimatePresence mode="wait">
            {isExpanded('formats') && (
              <motion.div 
                variants={expandVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="rounded-lg bg-background/50 p-4 border border-border/50"
              >
                <motion.p 
                  className="text-muted-foreground mb-3 pl-2 border-l-2 border-primary/30"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  This converter works with the following Google Drive link formats:
                </motion.p>
                <motion.div 
                  className="space-y-2 mt-4"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { staggerChildren: 0.15 }
                    }
                  }}
                >
                  {[
                    'https://drive.google.com/file/d/FILE_ID/view?usp=sharing',
                    'https://drive.google.com/open?id=FILE_ID',
                    'https://docs.google.com/document/d/FILE_ID/edit',
                    'https://drive.google.com/uc?export=view&id=FILE_ID'
                  ].map((format, index) => (
                    <motion.div 
                      key={index} 
                      className="rounded-md p-2 bg-accent/20 hover:bg-accent/40 transition-colors"
                      custom={index}
                      variants={{
                        hidden: { opacity: 0, y: 10, scale: 0.95 },
                        visible: {
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                          transition: {
                            type: 'spring',
                            stiffness: 200,
                            damping: 20,
                            delay: index * 0.1
                          }
                        }
                      }}
                      whileHover={{ 
                        x: 5, 
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        backgroundColor: 'hsla(var(--accent), 0.4)'
                      }}
                    >
                      <code className="font-mono text-sm">                        
                        {format}
                      </code>
                      <motion.div 
                        className="h-0.5 bg-primary/30 mt-1 w-0"
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <motion.button
            className="text-lg font-medium mb-2 flex items-center justify-between w-full text-left hover:text-primary transition-colors p-3 rounded-lg hover:bg-accent/20"
            onClick={() => toggleSection('notes')}
            whileHover={{ x: 2, backgroundColor: 'hsla(var(--accent), 0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span 
              className="flex items-center gap-2"
              animate={{
                color: isExpanded('notes') ? 'hsl(var(--primary))' : 'currentColor'
              }}
            >
              <motion.div
                className="text-primary"
                animate={{ 
                  scale: isExpanded('notes') ? [1, 1.2, 1] : [1, 1.1, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatDelay: isExpanded('notes') ? 3 : 5,
                  duration: 0.5 
                }}
              >
                <AlertTriangle className="h-5 w-5" />
              </motion.div>
              Important Notes
            </motion.span>
            <motion.div
              variants={chevronVariants}
              initial="collapsed"
              animate={isExpanded('notes') ? 'expanded' : 'collapsed'}
              className={`p-1 rounded-full ${isExpanded('notes') ? 'bg-primary/10' : ''}`}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.button>
          
          <AnimatePresence mode="wait">
            {isExpanded('notes') && (
              <motion.div
                variants={expandVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="rounded-lg bg-background/50 p-4 border border-border/50"
              >
                <motion.div 
                  className="space-y-3 mt-2"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                >
                  {[
                    'The file must be shared with appropriate permissions (at least "Anyone with the link can view")',
                    'Large files may not download automatically and might redirect to a preview page',
                    'For very large files, Google may require a confirmation step before downloading'
                  ].map((note, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-3 p-2 rounded-md hover:bg-accent/20 transition-colors"
                      custom={index}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: {
                          opacity: 1, 
                          x: 0,
                          transition: {
                            type: 'spring',
                            stiffness: 100,
                            damping: 10,
                            delay: index * 0.1
                          }
                        }
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-primary mt-0.5"><AlertTriangle className="h-4 w-4" /></span>
                      <span className="text-muted-foreground">{note}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-6 pt-4 border-t border-border flex items-center justify-center"
        variants={sectionVariants}
      >
        <motion.button
          className="px-4 py-2 rounded-full bg-accent/50 text-accent-foreground hover:bg-accent/80 transition-colors flex items-center gap-2 text-sm"
          onClick={() => setExpandedSection(expandedSection === 'all' ? null : 'all')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <span>{expandedSection === 'all' ? 'Collapse All' : 'Expand All'}</span>
          <motion.div
            animate={{ rotate: expandedSection === 'all' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default HowToSectionNew