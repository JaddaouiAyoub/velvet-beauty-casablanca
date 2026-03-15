"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useTheme } from "@/context/theme-context"
import { cn } from "@/lib/utils"

const navItems = [
  { key: "home", href: "#home" },
  { key: "services", href: "#services" },
  { key: "gallery", href: "#gallery" },
  { key: "team", href: "#team" },
  { key: "testimonials", href: "#testimonials" },
  { key: "contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)
  const { language, setLanguage, t, isRTL } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <span className="font-serif text-2xl font-bold text-primary">
              Beauté
            </span>
            <span className="font-serif text-2xl text-foreground">Élégance</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </motion.button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {language === "fr" ? "FR" : "AR"}
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {langDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "absolute top-full mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-[120px]",
                      isRTL ? "left-0" : "right-0"
                    )}
                  >
                    <button
                      onClick={() => {
                        setLanguage("fr")
                        setLangDropdown(false)
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-sm text-start hover:bg-secondary transition-colors",
                        language === "fr" && "bg-secondary text-primary"
                      )}
                    >
                      Francais
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("ar")
                        setLangDropdown(false)
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-sm text-start hover:bg-secondary transition-colors",
                        language === "ar" && "bg-secondary text-primary"
                      )}
                    >
                      العربية
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-foreground/80" />
              ) : (
                <Sun className="w-5 h-5 text-foreground/80" />
              )}
            </motion.button>

            {/* CTA Button */}
            <motion.a
              href="#booking"
              className="hidden md:block px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.nav.booking}
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-start py-2 text-foreground/80 hover:text-primary transition-colors"
                  whileHover={{ x: isRTL ? -5 : 5 }}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </motion.button>
              ))}
              <motion.a
                href="#booking"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium"
                whileTap={{ scale: 0.98 }}
              >
                {t.nav.booking}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
