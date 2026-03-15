"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { Instagram, Facebook, Twitter, Heart } from "lucide-react"

export function Footer() {
  const { t, isRTL } = useLanguage()

  const quickLinks = [
    { key: "home", href: "#home" },
    { key: "services", href: "#services" },
    { key: "gallery", href: "#gallery" },
    { key: "team", href: "#team" },
    { key: "contact", href: "#contact" },
  ]

  const services = [
    { key: "cut", label: t.booking.services_list.cut },
    { key: "brushing", label: t.booking.services_list.brushing },
    { key: "coloring", label: t.booking.services_list.coloring },
    { key: "cleansing", label: t.booking.services_list.cleansing },
    { key: "hydration", label: t.booking.services_list.hydration },
  ]

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="#home" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold text-primary">
                Beauté
              </span>
              <span className="font-serif text-2xl text-foreground">
                Élégance
              </span>
            </a>
            <p className="text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold text-foreground mb-4">
              {t.footer.quick_links}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.nav[link.key as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold text-foreground mb-4">
              {t.footer.services}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.key}>
                  <a
                    href="#services"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-semibold text-foreground mb-4">
              {t.footer.follow_us}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 bg-secondary rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Beauté Élégance. {t.footer.rights}.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in Morocco
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
