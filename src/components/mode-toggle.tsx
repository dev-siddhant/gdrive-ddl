import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { motion, AnimatePresence } from "framer-motion"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="rounded-full p-2 hover:bg-accent hover:shadow-glow transition-all focus:outline-none focus:ring-2 focus:ring-primary relative overflow-hidden"
      aria-label="Toggle theme"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme === "light" ? "moon" : "sun"}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Background glow effect */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 bg-gradient-primary opacity-0 hover:opacity-20 transition-opacity"></span>
      </span>
    </motion.button>
  )
}